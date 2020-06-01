# nodejs基础

## 相关概念及用途

回顾浏览器端javascript BOM DOM

Nodejs 操作文件 网络编程

- 说出Node.js是什么：Node 是一种建立在Ghrome V8引擎之上的基于事件驱动和非阻塞I/O模型的JavaScript运行环境或平台。
- 说出Node.js可以做什么：平台提供了操作系统底层的API，方便做服务器端编程,具体包括：文件操作、进程操作、通信操作等系统模块
  + 具有复杂逻辑的网站
  + WebSocket服务器
  + 命令行工具
  + 带有图形界面的本地应用程序
- 说出Node.js的特性是什么：事件驱动，非阻塞I/O模型
- Nodejs的应用场景？
  + 开发服务器功能
  + 开发前端工具
  + 适合I/O密集型，不适合cup密集型

## 开发环境配置

- 普通安装方式：nodejs官网：https://nodejs.org/en/
  + LTS稳定版
  + Current当前版
- 多版本安装方式
  + nvm官网：https://github.com/coreybutler/nvm-windows/
  + 下载地址：https://github.com/coreybutler/nvm-windows/releases

### 安装配置nvm

安装步骤如下：
1. 在C盘新建一个文件夹 dev（此路径中不要含有中文）
2. 在dev下新建两个文件夹，一个为nodejs，一个为nvm
3. 将解压文件解压到nvm文件夹下
4. 进去nvm文件夹下，以管理员方式运行 install.cmd，会生成settings.txt（如果当前目录下没有生成这个文件，去c盘根目录下找），内容如下：

```bash
//  如果参数不对需要手动修改
root: C:\dev\nvm    //nvm路径
path: C:\dev\nodejs     //nodejs路径（当前使用的node）
arch: 64 
proxy: none
```

1. 点击settings.txt，更改路径（路径不对时需要手动修改）
2. 配置环境变量（没有的话就新建）
- NVM_HOME - C:\dev\nvm
- NVM_SYMLINK - C:\dev\nodejs
7. 将上面配置好的变量添加到环境变量中的
path里面去，%NVM_HOME%;%NVM_SYMLINK%; **注意";"**
8. 测试是否配置成功 nvm v;

### 配置环境变量，了解原理

配置环境变量的目的就是：在终端可以运行应用程序，但是系统不知道应用程序所在的位置，环境变量就是配置应用程序的路径

### 会使用nvm常用命令

1. nvm install latest 64/32/all --- 安装最新的
版本,后面参数是电脑的位数
2. nvm install 6.9.1 --- 后面参数是安装的版本号
3. nvm use xxx --- 切换node版本号
4. nvm arch --- 查看或者设置平台类型
    + 系统类型（32->32，64->32/64）
    + 当前使用node环境类型
5. nvm install --- 安装node
6. nvm list --- 查看安装了哪几个版本的node
7. nvm version --- 查看nvm版本号

### 了解nvm切换版本的原理

### 了解镜像安装

nodejs是国外的网站，安装时会很慢，也可能被墙了，所以通常去淘宝npm镜像下载，但是在下载时一定要注意nodejs和npm的版本匹配，可以去nodejs官网查看
淘宝npm镜像网址：https://npm.taobao.org/
- nodejs镜像：http://npm.taobao.org/mirrors/node
- npm镜像：https://npm.taobao.org/mirrors/npm/

## 终端以及常用的命令

1. 什么是终端：终端也叫控制台，有人也叫bash(在Linux中)，terminal终端一般就是可以用来输入一些命令，然后把该命令的执行结果输出到终端中，在计算机中，所有通过可视化界面能做到的操作都可以通过命令来完成
2. 如何进入终端：
  + 按住win+r，打开运行->输入cmd敲回车就可以进入到终端环境->控制台默认进入当前用户目录
  + 打开想要使用终端的目录，按住shift键同时点击鼠标右键选择命令行打开方式
  + 用 git bash（右键）
3. 命令行打开应用
  + notepad 打开记事本
  + mspoint 打开画图
  + calc 打开计算机
  + sysdm.cpl 打开环境变量设置窗口
  + write 写字板
4. 常用终端命令
  + d: 切换盘符
  + cd 进入目录
  + dir 查看文件目录
  + ls 查看文件目录（window powershell）
  + rd 删除目录
  + ren 重命名
  + echo> 创建文件（例如echo>a.txt）
  + type 查看文件内容
  + del 删除文件
  + cls 清空控制台
  + ../ 以及 .. 回退上一级

## 常见两种运行方式

- Node.js程序运行方式之一：REPL（read-eval-print-loop）
  + 在命令行窗口中 _表示当前计算的表达式的结果
  + 两次 ctrl+c 可以退出REPL模式，或者执行 .exit 命令
- Node.js程序运行方式之二：运行js文件（ node 文件名称）
- Node.js中不可以进行DOM和BOM操作

## 全局对象和全局变量

global和process的具体信息可取nodejs官网查看->中文网：http://nodejs.cn/api/globals.html
- 全局对象 global：类似浏览器中的window，也可以称为伪全局变量
- process：process对象是Node的一个全局对象，提供
当前Node进程的信息。它可以在脚本的任意位置使用学会使用process.argv获取参数

## 模块化开发

和Seajs不同：回顾require、exports、definde，在nodejs中不需要define
- 模块化设计思想：规范->CommonJS、实现->nodejs
- **模块导入与导出**：require()、exports & module.exports
  + module.exports和exports指向是一样的，都是一个“空对象”（Object的实例对象,类似这样module.exports = exports = {}）,实际导出的成员以module.exports为准
  + 一般模块导出单个成员的时候使用exports
  + 一般模块导出构造函数或者实例对象的时候使用module.exports
  + 通过global也可以公开成员
- 模块加载原理：require引入多次模块实际上不会加载多次，因为第一次已经缓存了
- 可以作为模块的文件格式(文件的优先级：无后缀->.js->.json->.node->文件夹)
  + 无后缀
  + .js
  + .json
  + .node
  + 文件夹
- 核心模块：fs、http、path、querystring、url...

##  node模块加载方式
- 模块加载顺序：
  + 核心模块的加载（优先级最高）
  + 文件模块的加载
  + 文件夹的加载
  + 从node_modules目录下加载
  + 从缓存加载
- 模块加载的时候require的参数要么是路径，要么是特定的字符串
- 文件的加载顺序：文件模块加载的优先级>系统模块-无后缀 -- .js --.json -- .node -- 文件夹