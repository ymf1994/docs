# kkl-spa开课啦单页应用项目-web版教师端
[TOC]
## 项目概述

此项目是开课啦web版教师端的前端工程，登录账号必须是学校管理员或者学校老师，主要功能包含班级管理，学习小组，作业的布置、查看、批改、学生完成情况统计，本校资源库管理、布置，作业记录查看，心理测评布置;改项目服务需要依赖koa-kkl，当本地启动时，必须启动 koa-kkl项目

技术栈： 
  - 前端  

    [vue 2.0](https://cn.vuejs.org/v2/api/)  

    [vue-router](https://router.vuejs.org/zh/)  

    [vuex](https://vuex.vuejs.org/zh/)  

    [element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation)  

    [es6](http://es6.ruanyifeng.com/#README)  

    [stylus](https://www.zhangxinxu.com/jq/stylus/)  

    [less](http://lesscss.cn/)  

  - 服务端  

    [nodejs](http://nodejs.cn/api/) v8.9.4

owner： 张国中  
## 项目如何运行
#### 克隆
```
git clone http://git.mistong.com/fe/kkl-spa.git
```
#### 安装
``` bash
# install global dependencies
npm i -g supervisor # 用于管理进程
npm i -g commitizen # 一个格式化commit message的工具

# install dependencies
npm install
```
#### 启动 mock 本地开发环境
``` bash
# 后端 server mock数据
 1、在kkl-spa/src/utils/ajax.js文件中找到如下代码，打开configUrl的注释并保存
    if (ENV_CONFIG.env === 'dev') {
        // 针对mock数据特殊处理
        // configUrl = `${window.location.protocol}//${window.location.hostname}:3004/`;
    }
 2、cd kkl-spa
 3、npm run mock
# 前端 npm start == npm run dev
 1、配置host: 127.0.0.1 t.teacher.ksit.kaikela.cn
 2、cd kkl-spa
 3、npm start

```
#### 启动 local 本地开发环境
``` bash
# 后端 接口服务根据apiUrl确定 必须先启动 koa-kkl项目
 1、修改koa-kkl/service/conf/server.local.env.js文件中apiUrl对应接口服务地址
 2、cd koa-kkl
 3、npm run dev
# 前端
 1、配置host: 127.0.0.1 t.teacher.ksit.kaikela.cn
 2、cd kkl-spa
 3、npm run dev
```
#### 启动 stable 开发环境
``` bash
# 后端 接口服务默认stable环境
# 前端
 1、配置stable环境host
 2、cd kkl-spa
 3、npm run dev --temp
```

#### 启动 sit 开发环境

``` bash
# 后端 接口服务默认sit环境
# 前端
 1、配置sit环境host
 2、cd kkl-spa
 3、npm run dev --temp -d sit
```

#### 启动 prod 环境
``` bash
# 后端 接口服务默认线上环境
# 前端
 1、cd kkl-spa
 2、待定
```

#### 代码检测
``` bash
npm run lint
```

## 项目如何部署
#### 发布平台部署
``` bash
- stable、sit发布平台地址：
    http://smcoa.ikuko.com/#/dashboard
- 预发、线上发布平台地址：
    http://smcnew.ikuko.com/#/dashboard
```
#### 命令行部署
``` bash
# stable 测试环境或者dev01-dev08测试环境前端代码部署
  1、登录机器：ssh root@10.0.0.50， 密码：vmikuko@123
  2、sh cd/home/kkl-spa/run_node.sh 分支名 dev01-dev08
    ## cd/home/kkl-spa/run_node.sh develop_20180705代表stable环境
    ## cd/home/kkl-spa/run_node.sh develop_20180705 dev05代表接口服务在dev05

# sit环境前端代码部署
  1、登录机器：ssh root@10.0.0.27， 密码：vmikuko@123
  2、sh cd/home/kkl-spa/run_node.sh 分支名

```

## 项目目录说明
```
kkl-spa
    |-build   构建脚本目录
    |-config  配置目录
    |-src 前端代码目录
        |-assets 需要版本控制的静态资源目录
        |-formula 试题库资源文件
        |-components vue项目组件目录
        |-directives vue公用指令目录
        |-fetchs 所有公用接口目录
        |-libs 第三方库
        |-mixins vue混合指令目录
        |-mock mock服务器目录
        |-pages 页面目录
            eg:
            |-homework 布置作业模块
                |-index.vue  布置作业模块入口
                |-children  布置作业模块子页面
                    |-homework_scheme   布置作业之作业方案模块
                        |-index.vue 作业方案模块入口
        |-reg 公用正则目录
        |-router 路由配置目录
        |-store vuex数据仓库目录
        |-utils js工具目录
        |-App.vue 项目框架
        |-bury.js 大数据埋点脚本
        |—kkl.js 项目公用全局变量KKL配置脚本
        |-main.js 项目主入口
        |-not-found.vue 404组件
        |-question.css 第三方题库 css样式
        |-question.less 项目中关于题库的公用样式
        |-stat.js 针对点击埋点的统计脚本
    |-static 静态资源目录  确定且不需要版本控制的资源
        |-font 图标字体目录
        |-images 公用图片目录
    |-theme element-ui 样式目录
    |-dist 打包之后的所有脚本目录
```
## 功能列表
#### 访问地址
  stable：http://teacher.stable.ikuko.com/#/index  

  sit：https://teacher.ksit.kaikela.cn/#/index  

  预发：http://teacher.kaike.la/#/index  

  线上：http://teacher.kaike.la/#/index
#### 功能
  - [x] 首页概览
  - [x] 班级管理
  - [x] 布置作业
  - [x] 本校资源库
  - [x] 作业记录
  - [x] 心理测评

## 其他文档
- [公共方法文档说明.md](http://git.mistong.com/fe/kkl-docs/blob/master/%E6%8A%80%E6%94%B9%E7%A9%BA%E9%97%B4/%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%8F%91%E5%B8%83.md)
- [统计打点文档说明.md](http://git.mistong.com/fe/kkl-docs/blob/master/%E6%8A%80%E6%94%B9%E7%A9%BA%E9%97%B4/%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%8F%91%E5%B8%83.md)


## 浏览器支持
```
ie9及以上
```

## 更新日志
```
2018.07.05 作业记录完成概览改版
2018.06.27 主观题批改
```