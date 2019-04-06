## 开课啦前端私有npm模块化组件文档([全部组件](http://www.mjson.cn:4873/-/uiComponents))

## 一、设置私有npm注册地址 & 注册私有npm账户
``` bash
npm set registry http://10.0.1.100:4873

npm adduser --registry http://10.0.1.100:4873
```

## 了解更多
- 私有npm仓库访问地址：http://10.0.1.100:4873/#/
- 私有npm服务器搭建工具：verdaccio（搭建步骤：https://verdaccio.org/docs/en/server-configuration）
- 跳板机：ssh npmuser@10.0.1.100 （password：vmikuko@123）
- 找到verdaccio所在命令：which verdaccio
- 查看/修改verdaccio配置：cat/vi ~/.config/verdaccio/config.yaml 
```
// 如：修改npm的上层链路
uplinks:
  npmjs:
    url: https://registry.npm.taobao.org
```

## 二、全局安装脚手架kkl-cli
``` bash
npm i -g kkl-cli
```
创建脚手架基本模块：

- commander
- inquirer
- ora
- handlebars
- chalk
...

## 三、生成组件目录
``` bash
kkl init kkl-ui-popup
```

## 四、发布组件模块
``` bash
npm publish
```


## 五、使用组件示例
``` js
import uiPopup from '@kkl/ui-popup'
```
完整示例：http://10.0.1.100:4873/#/detail/@kkl/ui-swipe-gesture

## 六、组件开发规范
- UI组件开发和发布规范地址：https://github.com/yjh30/fe-module-component-construction