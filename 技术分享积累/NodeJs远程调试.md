##nodejs 远程调试
#### Eg: 以koa-kkl-h5  sit环境  10.0.0.27 为例

1. 进入远程服务器项目目录：  
```
cd  /home/app/koa-kkl-h5
```
2.  启动远程服务器服务:  (备注：package.json文件中scrpts 配置 debugProd: NODE_ENV=production node --inspect=0.0.0.0:9229 service/app.js  如果该项目服务已通过pm2启动了, 则先通过: pm2 delete koa-kkl-h5 关掉该服务)
```
npm run debugProd —env=sit
```
效果如图![avatar](http://gz-public.oss-cn-shenzhen.aliyuncs.com/readme/WechatIMG12.jpeg)

3. 进入本地  koa-kkl-h5 项目 以vscode 直接打开该项目    配置 vscode debug配置 参照该图 ![avatar](http://gz-public.oss-cn-shenzhen.aliyuncs.com/readme/WechatIMG14.jpeg)
4. 点击vscode debug图标 选择   刚才的远程配置 Attach to Remote 开始debug 如图![avatar](http://gz-public.oss-cn-shenzhen.aliyuncs.com/readme/WechatIMG17.jpeg)
5. 
#### 远程debug nodejs 测试
   浏览器端 ![avatar](http://gz-public.oss-cn-shenzhen.aliyuncs.com/readme/WechatIMG16.jpeg)
   vscode端 ![avatar](http://gz-public.oss-cn-shenzhen.aliyuncs.com/readme/WechatIMG20.jpeg)