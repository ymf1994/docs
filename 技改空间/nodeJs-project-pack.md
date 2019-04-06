## Node工程打包


### 目前存在的问题

1. 打包和发布一起，发布时间主要在打包这块
2. 多台机器各自打包，机器越多，发布时间随之增长；
3. 各个机器分别打包，线上各个机器代码可能会有不一致的情况，增加线上代码出问题几率，同时也可能造成资源的浪费；
4. 线上一出问题，很难快速回滚；

### 目的

1. 提高发布效率;
2. 降低发布风险；
3. 添加回滚功能；
4. 一台机器打包，多台机器共用；
5. 减少发布时间


### 具体操作

1. 打包和发布分开；
2. 生产环境代码和开发环境代码分开；
3. 每次的项目代码都保留方便回滚；


### 线上发布注意事项

```
 1. 统一编译脚本： npm run build -d  prod （共四个环境 stable/sit/pre/prod 对应功能测试/集成测试/预发环境/生产环境)
 2. 统一启动服务脚本： SERVER_ENV=prod npm run start （共四个环境 stable/sit/pre/prod 对应功能测试/集成测试/预发环境/生产环境）
 3. 由于打包时间很长，为了减少发布时间，在每次发布前，请先执行nodeJs工程打包流程，等到了发布的点，再执行发布流程。
 4. 由于新的发布流程第一次发布时无法执行npm run stop脚本，所有第一次未关掉以前的服务，再次执行以一次下该发布流程中的发布步骤即可。


```

### NodeJs工程要求(参照koa-kkl项目，前端只需要把这块注意事项处理好即可,其他的打包脚本已经写好）
1. package.json 配置区分生产环境和开发环境；(开发环境主要指只有编译，mock,调试才需要的包)
2. 注意事项： 控制好服务端需要的包的数量，服务端依赖的包也尽量使用同类中稳定且小些的， 把代码集中在service、src中再加上package.json和node_modules 即可启动整个node服务；
3. 服务端代码放在service目录内，客户端代码放在src目录内，编译相关脚本放在build目录内；
4. 编译之后的代码，服务端需要的放在service目录内，其他的全部放在dist目录内；
5. 项目的配置文件： 放在service目录内；
6. 工程日志文件统一放在/home/logs/xxx-xx下;(eg: /home/logs/koa-kkl/node_info_20180606.log)
7. 浏览器端使用的静态资源 同步到cdn或者静态资源服务器; dist目录为编译之后的资源目录，dist目录要和被引用时的路径一致 (eg: js文件被引用路径为 https://static.kaike.la/dist/js/a.js  则dist目录中js打包目录为: dist/dist/js/a.js  其中第一个dist为dist目录，第二个dist为文件的引用路径中的文件夹名称。)




### 打包流程
1. 到工程根目录，安装项目所有依赖包；```npm i ```
2. 全量编译工程代码； ```npm run build -d prod ```
3. 将编译好的代码在输出到dist目录中，将编译好之后服务端需要的代码移动到service目录下对应位置；
4. 移除pack包然后新建l生产包目录pack； (pack目录是打包用的临时目录) ```rm -rf pack && mkdir -p pack ```
5. 将生package.json service dist复制一份到pack目录；  ```cp -r package.json service dist pack ```
6. 进入pack目录安装生成依赖 ； ```cd pack && npm i --production ```
7. 将文件夹pack压缩为一个x.x.x.tar.gz包，放在工程根目录下； ```tar -czf koa-kkl.tar.gz * ```


### 发布流程
1. 将工程现有的tar.gz包拷到目标服务器； ``` scp xxx/koa-kkl.tar.gz root@10.0.0.27:/home/app/```
2. 同步koa-kkl.tar.gz 目录中的dist文件到对应静态资源服务器 ```rsync -rlptDv xxx/koa-kkl/dist/* /ikuko/static/```
3. 停止目标服务器上面的nodejs服务； ``` cd /home/app/koa-kkl && npm run stop ```
4. 删除目标机器上的该工程目录，新建该功能目录， 解压压缩包内容到该工程目录； ```cd ../ && rm -rf koa-kkl && mkdir koa-kkl && tar -xzf koa-kkl.tar.gz -C koa-kkl ```
5. 进入该工程目录启动服务；``` cd koa-kkl && SERVER_ENV=prod npm run start ```


### 回滚流程(脚本和发布脚本类似，只是缺少了同步静态资源的流程)
1. 找到现有工程下面的最新的tar.gz压缩包；
2. 停止目标服务器上面的nodejs服务；
3. 删除目标机器上的该工程目录，解压该压缩包为该工程目录；
4. 进入该工程目录启动服务；



### 待优化模块
1. 回滚机制不支持；
2. 编译之后的dist目录被打包到服务端需要的包中，存在一定的资源浪费；
