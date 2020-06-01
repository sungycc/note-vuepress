# npm包管理工具

## 包

什么是包
> 所谓的包就是一个模块

> 包和模块并没有本质的不同，
包是在模块的基础上更深一步的抽象，包将某个独立的功能封装起来，用于发布、更新、依赖管理和进行版本控制
- 模块与包的关系
- 包规范
- package.json主要属性介绍
- 包结构注意事项
  + 必须有package.json文件
  + 通过main属性搜索入口文件
  + 核心模块的优先级最高
  + 同名自定义模块 不会覆盖原生模块

## npm

- node.js package management -> Node.js包管理器
- 管理项目的依赖包
- 可以用来下载我们需要使用的东西
- 安装后可以通过`npm -v` 查看版本

## npm 使用

- 初始化操作
  + `npm init` 会生成一个package.json文件（需要手动输入信息）
  + `npm init -y` 自动生成package.json文件（不需要）
- 下载所需要的包
  + `npm install jquery`  下载jquery
  + 会去 registry.npmjs.org 这个地址下载jquery
  + 会生成一个node_modules目录，下载的内容就放在这个目录
- 下载包时，可以加上 `--save` 参数
  + `npm install jquery --save`, 下载之后会在package.json中添加
    当前下载的包的版本信息（添加到dependencies属性中）。
- npm常用命令：加 - g 表示全局安装，否则就是默认本地安装
  + npm install 包名@版本号   安装对应版本包
  + npm update 包名   更新包
  + npm uninstall 包名    卸载包
  + npm v     查看当前npm版本
  + ......
- dependencies与devDependencies
  + dependencies 程序正常运行需要的包（--save）
  + devDependencies 程序开发测试需要的包（--save--dev）
- npm install 与 npm install --production
  + npm install 安装所有的依赖
  + npm install --production 只安装dependencies的依赖

## package.json注意事项

- name
  + 长度必须小于等于214个字符。
  + 不能以"."(点)或者"_"(下划线)开头。
  + 中不能包含大写字母。
  + 不能含有非URL安全的字符。
- version
  + version和name字段是package.json文件中最重要的字段，都是必须的字段，如果你的包没有指定这两个字段，将无法通过npm被安装。
  + 包内容的更改和包版本的更改是同步的。
  + verion的格式必须正确（符合[semver](https://docs.npmjs.com/misc/semver)规则)
  + 语义化版本
    - 一个标准的版本号必须是X.Y.Z的形式：X是主版本，Y是副版本，Z是补丁版本。.
      * X: 代表发生了不兼容的API改变
      * Y: 代表向后兼容的功能性变化
      * Z: 代表向后兼容bug fixes
    - ~与^符号的区别
      * ~x.y.z: 匹配大于 x.y.z 的 z 的最新版
      * ^x.y.z: 匹配大于 x.y.z 的 y.z 的最新版
    - ~举例
      * ~1.2.3 等价于 >=1.2.3 <1.(2+1).0 等价于="">=1.2.3 <1.3.0
      * ~1.2 等价于 >=1.2.0 <1.(2+1).0 等价于="">=1.2.0 <1.3.0 (Same - as 1.2.x)
      * ~1 等价于 >=1.0.0 <(1+1).0.0 等价于 >=1.0.0 <2.0.0 (Same as 1.- x)
      ---
      * ~0.2.3 等价于 >=0.2.3 <0.(2+1).0 等价于="">=0.2.3 <0.3.0
      * ~0.2 等价于 >=0.2.0 <0.(2+1).0 等价于="">=0.2.0 <0.3.0 (Same - as 0.2.x)
      * ~0 等价于 >=0.0.0 <(0+1).0.0 等价于 >=0.0.0 <1.0.0 (Same as 0.- x)
    - ^举例
      * ^1.2.3 等价于 >=1.2.3 <2.0.0
      * ^0.2.3 等价于 >=0.2.3 <0.3.0
      * ^0.0.3 等价于 >=0.0.3 <0.0.4，即等价于0.0.3
      ---
      * ^1.2.x 等价于 >=1.2.0 <2.0.0
      * ^0.0.x 等价于 >=0.0.0 <0.1.0
      * ^0.0 等价于 >=0.0.0 <0.1.0
- main 
  + 包的入口文件

## 模块的加载

- 模块的加载
  + 核心模块的加载（优先级最高）
  + 文件模块加载
  + 文件夹的加载
  + 从node_modules目录下加载
  + 从缓存加载
- 模块加载的时候require的参数要么是路径，要么是特定的字符串

## npm下载配置

npm的问题：资源都在国外，有时候会被墙，导致无法下载或者很慢，解决方案：
- npm config set registry https://registry.npm.taobao.org
  + npm config get registry 查看默认路径
- cnpm 官网：https://npm.taobao.org/
  + npm install -g cnpm --registry=https://registry.npm.taobao.org
- nrm包 用来切换包下载地址 项目地址：https://www.npmjs.com/package/nrm
  + npm install nrm -g    全局安装nrm包
