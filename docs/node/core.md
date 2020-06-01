# 核心模块

## Buffer

js里面操作的都是字符串，没有提供操作字节型的数据，Buffer就可以操作字节。Buffer的由来：JavaScript对于字符串操作非常友好，咱们前端在工作中一些字符串操作和DOM操作就能基本满足咱们业务的需求，但是由于业务场景的不一样，在Node中，应用需要处理网络协议、操作数据库、处理图片、接收上传文件等等，在网络流和文件操作中，还要处理大量二进制文件，JavaScript自有的字符串操作远远不能满足这些需求，于是Bffer就产生了

- Buffer实例化
  + New Buffer 参数只能传入 四种格式 数字（长度），字符串，数组，字符串
  + 上面这种方法不用了，Buffer的静态方法：Buffer.alloc(数字 长度)官网支持这种方式;Buffer.form()参数可以为数组 字符串 buffer 构造buffer

```js
//十六进制（0x61 --- 97）  十进制
let buf = new Buffer(5);//指5个字节
let buf = new Buffer('abc');//<Buffer 61 62 63>  97 98 99
let buf = new Buffer([1,2,3]);
let buf1 = new Buffer(buf);
console.log(buf1);

//不推荐new的方式产生实例，推荐静态方法生成实例
let buf = Buffer.alloc(5);//<Buffer 00 00 00 00 00>
console.log(buf);

let buf = Buffer.from('abc');
console.log(buf);

let buf = Buffer.from([1,2,3]);
let buf1 = Buffer.from(buf);
console.log(buf1);
```

- Buffer静态方法
  + Buffer.byteLength -- 返回一个字符串的实际字节长度
  + Buffer.isBuffer -- 判断参数中的数据是否是Buffer实例
  + Buffer.isEncoding -- 判断Buffer是否支持该编码

```js
// const str = '\u00bd + \u00bc = \u00be';
// let ret = Buffer.byteLength(str,'ascii');//统计特定编码下字符串对应的字节数
// console.log(ret,str);

// let buf = Buffer.alloc(5);
// console.log(Buffer.isBuffer(buf));//判断参数中的数据是否为Buffer实例
// console.log(Buffer.isBuffer('abc'));

// console.log(Buffer.isEncoding('base64'));//判断Buffer是否支持该编码
```

- Buffer实例方法
  + buf.write -- 向Buffer实例中写入数据
  + buf.equals -- 判断两个Buffer实例是否相等
  + buf.indexOf -- 检索特定字符串在整个字符串中的位置
  + buf.slice -- 截取Buffer实例的一部分，生成一个新的
```js
// buf.write(string[, offset[, length]][, encoding])

// 参数一：要写入buf的字符串
// 参数二：开始写的位置
// 参数三：写入的长度
// 参数四：编码形式
    
let buf = Buffer.alloc(5);
buf.write('abc',2,2,'utf8');//向Buffer实例中写入数据
console.log(buf);

// let buf1 = Buffer.from('abc');
// let buf2 = Buffer.from('abcd');
// console.log(buf1.equals(buf2));//判断两个Buffer实例是否相等

// const buf = Buffer.from('this is a buffer');
// console.log(buf.indexOf('buffer'));//检索特定字符串在整个Buffer中的位置

let buf = Buffer.from('abcde');
console.log(buf.slice(2,5));//截取Buffer实例的一部分，生成一个新的Buffer实例
```

## path模块

- path.basename: 截取路径中的文件名
- path.parse：把字符串形式的路径转化为对象形式
- path.format：把对象形式的路径转化为字符串形式
- path.normalize: 将路径进行标准化
- path.join: 用来拼接路径
- path.relative: 计算相对路径
- path.resolve: 计算绝对路径

```js
const path = require('path');

// 截取路径中的文件名
// let ret = path.basename('/foo/bar/baz/asdf/quux.html');
// let ret = path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// console.log(ret);
// ----------------------------------------------
// parse把字符串形式的路径转化为对象形式
// let obj = path.parse('/home/user/dir/file.txt');
// console.log(obj.base);
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' 
// }

// let obj = { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' 
// };
// format把对象形式的路径转化为字符串形式
// let str = path.format(obj);
// console.log(str);//  /home/user/dir\file.txt
// -----------------------------------------
// normalize标准化路径
// let str = path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// console.log(str);// C:\temp\foo\
// ------------------------------------------
//join用来拼接路径
let str = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
let str = path.join(__dirname,'./README.md');//C:\Users\www\Desktop\Nodejs\代码\nodejs\day03\README.md
console.log(str);// \foo\bar\baz\asdf
// -------------------------------------------
// 计算相对路径
// let str = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// console.log(str);// ..\..\impl\bbb
// -------------------------------------------
// 解析绝对路径
// let str = path.resolve('/foo/bar', '/tmp/file/');
// console.log(str);//C:\tmp\file

console.log(path.win32);
```

## 异步编程模式分析

核心思想：所谓的异步编程，本质上来说，执行到某一个异步任务时不会立即执行，而是以回调函数的形式把它放到事件队列当中，然后接着执行主线程当中剩下的代码，当主线程结束（空闲）后再去事件队列当中把之前的任务取出来再执行

- 浏览器中的异步操作：
  + 定时函数(达到延时事件)
  + 事件函数(特定的事件触发)
  + ajax回调函数(服务器数据相应的时候)
- 异步任务触发条件：
  + 主线程空闲
  + 满足任务的触发条件(请求完成，时间到了，点击)

```js
/*
浏览器中的异步操作：
1、定时函数(达到延时事件)
2、事件函数(特定的事件触发)
3、ajax回调函数(服务器数据相应的时候)

异步任务触发条件：
1、主线程空闲
2、满足任务的触发条件

js的运行是单线程的

单线程+事件队列
*/

// var abc = 123;
// console.log(abc);
// var sum = 0;
// for(var i=0;i<10000;i++){
//     sum += i;
// }
// console.log(sum);
// var flag = 1;
// if(flag > 1){

// }

// 定时任务
// console.log(1);
// setTimeout(function(){
//     console.log(2);
// },100);
// console.log(3);
// for(){};

// 事件函数
// window.onload = function(){
//   var btn = document.getElementById('btn');
//   console.log(11);
//   btn.onclick = function(){
//     console.log(22);
//   }
//   console.log(33);
// }
// ajax回调函数
var xhr = new XMLHttpRequest();
xhr.open('get','http://localhost/data.php');
xhr.send(null);
console.log(111);
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
    if(xhr.status == 200){
      var data = xhr.responseText;
      console.log(data);
    }
  }
}
console.log(333);
```

## File System

### 文件操作-stat（实际上是个对象）

- fs.stat -- 查看文件的状态信息（异步操作）
- fs.statSync -- 查看文件的状态信息（同步操作）
- atime：访问时间
- mtime：内容状态修改时间
- ctime：文件状态修改时间
- btime：创建时间
- isFile()：判断是否为文件
- isDirectory()：判断是否为路劲

```js
const path = require('path');
const fs = require('fs');

console.log(1);
// 查看文件的状态信息（异步操作）
fs.stat(path.join(__dirname,'./abc'),(err,stats)=>{
  console.log(err);
  // console.log(stats);
  // console.log('atime:访问时间' + stats.atime);
  // console.log('mtime:内容修改时间' + stats.mtime);
  // console.log('ctime:文件状态修改时间' + stats.ctime);
  // console.log('btime:创建时间' + stats.birthtime);
  console.log(stats.isFile());//判断是否为文件
  console.log(stats.isDirectory());//判断是否为路径
  console.log(2);
});
console.log(3);
    
// ---------------------------------------------------
// console.log(11);
// // 同步操作
// let ret = fs.statSync(path.join(__dirname,'data.txt'));
// console.log(ret);
// console.log(333);
```

### 文件存在性判断

- fs.exists
- fs.access
- fs.stat

```js
const path = require('path');
const fs = require('fs');

// 不推荐使用
// fs.exists(path.join(__dirname,'data1.txt'),(exists) => {
//   if(exists){
//     console.log('该文件存在');
//   }else{
//     console.log('该文件不存在');
//   }
// });

// 推荐使用下面这两种方法
fs.stat(path.join(__dirname,'data123.txt'),(err,stats) => {
  if(!err && stats.isFile()){
    console.log('该文件存在');
  }else{
    console.log('该文件不存在');
  }
});
// console.log(11);
// fs.access(path.join(__dirname,'data.txt'),(err) => {
//   if(!err){
//     console.log('该文件存在');
//   }else{
//     console.log('该文件不存在');
//   }
//   console.log(22);
// });
// console.log(33);

try {
  fs.accessSync(path.join(__dirname, 'data1.txt'));
}catch(err){
  if(err){
    console.log('该文件不存在');
  }
}
```

### 文件操作

#### 打开文件操作

fs.open(path, flags[,mode], callback);

+ path 文件的路径
+ flags 打开文件的方式
  - r 以读的形式打开文件，文件不存在就抛异常
  - r+ 以读和写的形式打开文件，文件不存在就抛异常
  - rs+ 以同步的读和写形式打开文件，通知操作系统忽略系统缓存(不推荐使用)
  - w 以写的形式打开文件，如果文件不存在就创建，存在就覆盖
  - wx 与w形式类似，只不过文件存在时操作会失败
  - w+ 以读和写的形式打开文件，如果文件不存在就创建，存在就覆盖
  - a 以追加的形式打开文件，如果文件不存在就创建
  - ax 与a类似，如果文件存在操作会失败
  - a+ 以读和写的形式打开文件，如果文件不存在就创建
  - ax+ 与a+类似，如果文件存在操作会失败
+ mode Linux平台有效，可以控制文件的读、写、可执行，参数是可选的
+ callback 回调函数（err,fd）：


```js
let ret = fs.openSync(path.join(__dirname,'./data.txt'),'r');   // 同步方法的返回值表示fd；fd文件描述符
/*
  文件操作
  fs.open(path, flags[, mode], callback)
  path  文件的路径
  flags  打开文件的方式
  mode  Linux平台有效，可以控制文件的读、写、可执行 777，参数是可选的
  callback 回调函数（err,fd）
*/
const path = require('path');
const fs = require('fs');

fs.open(path.join(__dirname,'./data.txt'),'r',(err,fd) => {
  // fd file discriptor 文件描述符，通过fd可以操作文件，默认从3开始，打开多次接着累加
  if(err){
    console.log(err);
    return;
  }
  console.log(err,fd);
});

// 同步方法的返回值表示fd
let ret = fs.openSync(path.join(__dirname,'./data.txt'),'r');
console.log(ret);

fs.open(path.join(__dirname,'./data.txt'),'r',(err,fd) => {
  if(err){
    console.log(err);
    return;
  }
  console.log(err,fd);
});

// var timer = setTimeout(function(){},100);
// var timer = setTimeout(function(){},100);
// clearTimeout(timer);
```

#### 文件的读写操作

fs.read(fd, buffer, offset, length, position,
callback)

+ fd 文件描述符
+ buffer 读取的数据放在buffer中
+ offset 读取数据从buffer的第几个位置开始写入
+ length 读取文件中的数据的字节数量
+ position 从文件的什么位置开始读
+ callback 回调函数(err, bytes, buffer)

```js
let ret = fs.readSync(fd,buf,0,4);
/*
  文件读操作
  fs.read(fd, buffer, offset, length, position, callback)
  fd 文件描述符
  buffer 读取的数据放到buffer中
  offset 读取的数据从buffer的第几个位置开始写
  length 读取文件中数据的字节数量
  position 从文件的什么位置开始读
  callback 回调函数（err,bytes,buffer）
*/

const path = require('path');
const fs = require('fs');

// fs.open(path.join(__dirname,'./data.txt'),'r',(err,fd) => {
//   let buf = Buffer.alloc(5);
//   fs.read(fd,buf,1,3,null,(err,bytes,buffer) => {
//     console.log(err,bytes,buffer);//bytes表示读取的字节数量
//     console.log(buf);//读取的文件内容
//     console.log(buf == buffer);//buffer和read参数中的buf是同一份数据
//   });
// });

//同步操作
let fd = fs.openSync(path.join(__dirname,'./data.txt'),'r'); 
let buf = Buffer.alloc(5);
let ret = fs.readSync(fd,buf,0,4);
console.log(ret,buf);
```

#### Write操作

文件写操作（浏览器中的js和Node.\_js中的js语法都不支持方法重载，但是可以在定义函数时，根据参数的个数，和函数的类型进行判断，从而根据实参形式上的差别来区分实际的调用形式）

方法重载（方法名称相同，但是参数的个数不同，参数的类型不同）

重载的概念，传入参数不同调用不同函数，js没有重载，根据参数调用内部实现

```js
/*
  文件写操作(浏览器中的js和Node.js中的js语法上都不支持方法重载，但是可以在定义函数时，根据参数的个数，和函数的类型进行判断，从而根据实参形式上的差别来区分实际的调用形式)
  fs.write(fd, buffer, offset, length[, position], callback)
  fs.writeSync(fd, buffer, offset, length[, position])

  fs.write(fd, data[, position[, encoding]], callback)
  fs.writeSync(fd, data[, position[, encoding]])
*/

const path = require('path');
const fs = require('fs');
//方法重载（方法名称相同，但是参数的个数不同，参数的类型不同）
// fs.open(path.join(__dirname, './data.txt'), 'w', (err, fd) => {
//   let buf = Buffer.from('中国121321323331');
//   // written指的是字节数量，而不是字符数量
//   fs.write(fd,buf,0,8,(err,written,buffer) => {
//     console.log(err,written,buffer);
//     console.log(buf === buffer);
//   });
// });

fs.open(path.join(__dirname, './data.txt'), 'w', (err, fd) => {
  let buf = Buffer.from('中国');
  fs.write(fd,'程序员',(err,written,str) => {
    console.log(err,written,str);
  });
});

// let fd = fs.openSync(path.join(__dirname, './data.txt'), 'w');
// let buf = Buffer.from('中国');
// // let ret = fs.writeSync(fd,buf,0,6,null);
// let ret = fs.writeSync(fd,'程序员');
// console.log(ret);

// 自定义方法不支持方法重载
// let obj = {
//   hello : function(info){
//     console.log('---',info);
//   },
//   hello : function(info,message){
//     console.log('===',info,message);
//   }
// }
// obj.hello('abc','hi');

// $('div').css('width');
// $('div').css('width','100px');
```

#### 文件操作-readFile

上面的open、read、write是最原始的方法，只是对系统提供的方法做了封装，使用起来比较繁琐，下面是nodejs提供的使用起来比较方便的方法，也就是对底层API做了更深一层封装

fs.readFile(file[,options], callback)
+ file 表示文件名称或者文件描述符
+ options 可以是字符串形式，表示编码；可以是对象形式（encoding,flas）
+ callback 回调函数（err,data)实际读取的数据

第二个参数不指定编码返回就就是buffer；指定编码后返回的就是字符串

```js
fs.readFileSync(file[, options])
/*
  文件读操作
  fs.readFile(file[, options], callback)
  file 表示文件名称或者文件描述符
  options 可以是字符串形式，表示编码；可以是对象形式（encoding,flag）
  callback 回调函数（err,data 实际读取的数据）

  fs.readFileSync(file[, options])
*/

const path = require('path');
const fs = require('fs');

////第二个参数指定编码，回调函数中的data是字符串，不指定的是Buffer
fs.readFile(path.join(__dirname,'./data.txt'),(err,data)=>{
  console.log(data);
  console.log(data.toString());
});

// fs.readFile(path.join(__dirname,'./data.txt'),'utf8',(err,data)=>{
//   console.log(data);
// });

// let content = fs.readFileSync(path.join(__dirname,'./data.txt'),'utf8');
// let content = fs.readFileSync(path.join(__dirname,'./data.txt'));
// console.log(content);
```

#### 文件操作-writeFile
fs.writeFile(file, data[,options], callback)
* file 表示文件的名称或者文件描述符
* data 表示写入的数据
* options 可以是字符串形式，表示编码，也可以是对
象形式
* callback 回调函数（err,data)实际读取的数据

相比readfile多了一个参数

```js
/*
  文件写操作
  fs.writeFile(file, data[, options], callback)
  data 写入的数据
  fs.writeFileSync(file, data[, options])
*/

const path = require('path');
const fs = require('fs');

// fs.writeFile(path.join(__dirname,'./data.txt'),'hi',(err)=>{
//   console.log(err);
// });

fs.writeFileSync(path.join(__dirname,'./data.txt'),'中国'); 
```

#### 文件操作-appendFile

文件内容追加: fs.appendFile(file, data[,options], callback)

```js
/*
  文件内容追加
  fs.appendFile(file, data[, options], callback)
  fs.appendFileSync(file, data[, options])
*/

const path = require('path');
const fs = require('fs');

// fs.appendFile(path.join(__dirname,'./data.txt'),'程序员',(err)=>{
//   console.log(err);
// });

fs.appendFileSync(path.join(__dirname,'./data.txt'),'程序员');
```

#### 文件操作-unlink

删除文件：fs.unlink(path, callback)

只能删除文件不能删除文件夹（目录），但能删除快捷方式

```js
/*
  删除文件
  fs.unlink(path, callback)
*/

const path = require('path');
const fs = require('fs');

// fs.unlink(path.join(__dirname,'./data.txt'),(err) => {
//   console.log(err);
// });

// 不能删除目录
// fs.unlink(path.join(__dirname,'./abc'),(err) => {
//   console.log(err);
// });

// 可以删除快捷方式文件，但是删不掉快捷方式对应的数据文件
fs.unlink(path.join(__dirname,'./deletefile.lnk'),(err) => {
  console.log(err);
});
```

### 目录操作

+ 创建目录：fs.mkdir(path[,mode], callback)
+ 读取文件列表callback第二个参数为一个数组（所有文件和目录）：fs.readdir(path[,mode], callback)
+ 删除目录：fs.rmdir(path,callback)

```js
/*
  目录操作
  fs.mkdir(path[, mode], callback) 创建目录
  fs.mkdirSync(path[, mode])

  fs.readdir(path[, options], callback) 读取目录
  fs.readdirSync(path[, options])

  fs.rmdir(path, callback) 删除目录
  fs.rmdirSync(path)
*/

const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname,'./hello'),(err)=>{
//   console.log(err);
// })

// fs.mkdirSync(path.join(__dirname,'./hi'));

// fs.readdir(__dirname,(err,files) => {
//   files.forEach((e) => {
//     fs.stat(path.join(__dirname,e),(err,stats) => {
//        if(stats.isFile()){
//          console.log(`${e}是文件`);
//        }else if(stats.isDirectory()){
//          console.log(`${e}是目录`);
//        }
//      });
//   });
// });

// let files = fs.readdirSync(__dirname);
// files.forEach((e) => {
//   fs.stat(path.join(__dirname,e),(err,stats) => {
//     if(stats.isFile()){
//       console.log(`${e}是文件`);
//     }else if(stats.isDirectory()){
//       console.log(`${e}是目录`);
//     }
//   });
// });

// fs.rmdir(path.join(__dirname,'hello'),(err) => {
//   console.log(err);
// });

fs.rmdirSync(path.join(__dirname,'hi'));
```

### 项目结构初始化案例

- 项目初始化
  + 初始化包 -- `npm init -y`
  + 新建入口文件 -- index.js
  + 新建核心代码模块 -- init.js
  + 新建配置清单 -- config.json
  + 新建 index.html 与 404.html

```js
// config.json项目的配置参数
{
  "rootName": "mydemo",
  "data": [
    {
      "name": "img",
      "type": "dir"
    },{
      "name": "js",
      "type": "dir"
    },{
      "name": "css",
      "type": "dir"
    },{
      "name": "index.html",
      "type": "file"
    },{
      "name": "404.html",
      "type": "file"
    }
  ]
}
```

- 核心模块
  + 引入模块 -- path、fs
  + 书写核心业务逻辑

```js
//index.js中的代码：
// 入口文件
const obj = require('./init.js');
// 获取命令行参数
console.log(process.argv);
let param = process.argv[2];
switch(param){
  case '-i':
    obj.init();
    break;
  case '-h':
    console.log('帮助信息');
    break;
  case '-v':
    console.log('1.0.0');
    break;
}



//init.js中的代码：
// 实现初始化工作
const cfg = require('./config.json');

const path = require('path');
const fs = require('fs');

let rootName = cfg.rootName;

let init = () => {
  // 创建跟目录
  fs.mkdir(path.join('./',rootName),(err)=>{
    if(err){
      console.log('创建跟路径失败');
      return ;
    }
    cfg.data.forEach((obj)=>{
      if(obj.type == 'dir'){
        // 创建子目录
        fs.mkdir(path.join('./',rootName,obj.name),(err)=>{
          if(err){
            console.log('创建子目录失败');
            return ;
          }
          console.log(`${obj.name}目录创建成功`);
        });
      }else if(obj.type == 'file'){
        // 读取模板文件
        fs.readFile(path.join(__dirname,obj.name),(err,data)=>{
          if(err){
            console.log('读取文件失败');
            return ;
          }
          // 根据模板文件的内容写入新的的文件（直接创建一个新文件）
          fs.writeFile(path.join('./',rootName,obj.name),data,(err)=>{
            if(err){
              console.log('创建子文件失败');
              return ;
            }
            console.log(`${obj.name}文件创建成功`);
          });
        });
      }
    });
  });
}

// init();
exports.init = init;
```

- 暴露接口 -- init.js `module.exports = init;`
- 完善配置（index.js）
- 将项目拷贝在所使用node版本的node_modules里面
- 配置init.cmd -- 更改路径
- 优化，更改根目录

### 监听文件变化

Nodejs-监听文件变化-WatchFile 与unwatchfile、watch方法有缺陷所以推荐使用chokidar包
- chokidar  [chokidar](https://github.com/paulmillr/chokidar)
  + 封装好的watch方法
  + 安装 `npm install chokidar`

类似 :addEventListener和 removeEventListener

```js
/*
  文件监控
  fs.watchFile(filename[, options], listener)
  filename 监控的文件名称
  options(persistent=true,interval=5007 每隔多长时间检测一下文件的状态)
  listener 事件函数(curr表示当前文件的状态，prev之前文件的状态)

  阻止监听特定的文件
  fs.unwatchFile(filename[, listener])

  watchFile与unwatchFile的用法与浏览器中绑定事件与解绑事件
  addEventListener与removeEventListener的用法类似

  fs.watch(filename[, options][, listener])
*/

const path = require('path');
const fs = require('fs');

// let cb = (curr,prev)=>{
//   // console.log(curr);
//   // console.log(prev);
//   console.log(1);
// };

// let cb1 = (curr,prev)=>{
//   // console.log(curr);
//   // console.log(prev);
//   console.log(2);
// };

// fs.watchFile(path.join(__dirname,'./data.json'),{interval:100},cb);
// fs.watchFile(path.join(__dirname,'./data.json'),{interval:100},cb1);

// setTimeout(() => {
//   fs.unwatchFile(path.join(__dirname,'./data.json'));
// },5000);
// ----------------------------------------
fs.watch(path.join(__dirname,'./data.json'),(eventType,filename)=>{
  console.log(eventType,filename);
});
```

### Markdown转化为html案例

安装包：`npm install markdown-it`
重点看这个回调的操作方式，监控文件watchfile的用法；markdown-it包的调用；

```js
const chokidar = require('chokidar');
const md = require('markdown-it')();
const path = require('path');
const fs = require('fs');

let templatePath = path.join(__dirname,'./template.html');
let mdPath = path.join(__dirname,'./sample.md');
let targetPath = path.join(__dirname,'./sample.html');
// 监控md文件的内容变化
chokidar.watch(mdPath, {ignored: /node_modules/}).on('change', (event, path) => {
  // 读取md文件的内容
  fs.readFile(mdPath,'utf8',(err,data)=>{
    // markdown语法转化成为html片段
    let html = md.render(data);
    // 读取html模板文件的内容
    fs.readFile(templatePath,'utf8',(err,data)=>{
      // 把模板当中的占位符替换成为新生成的html片段
      let result = data.replace('<%content%>',html);
      // 把生成的页面写入到新的文件中
      fs.writeFile(targetPath,result,(err)=>{
        console.log('转换成功');
      });
    });
  });
});
/*========================================================================
// var chokidar = require('chokidar');

// // One-liner for current directory, ignores .dotfiles
// chokidar.watch('.', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
//   console.log(event, path);
// });
```

### 文件的流式操作

读取大型文件的时候可以用到

```js
/*
  大文件操作（readFIle读取文件的时候，会把所有的文件数据加载到内存）

  文件的流式操作
  fs.createReadStream(path[, options])
  fs.createWriteStream(path[, options])
*/
const path = require('path');
const fs = require('fs');

// fs.readFile('C:\\Users\\www\\Desktop\\Nodejs\\file.zip',(err,data)=>{
//   console.log(err);
// });

let sPath = 'C:\\Users\\www\\Desktop\\Nodejs\\file.zip';
let tPath = 'C:\\Users\\www\\Desktop\\file.zip';

let readStream = fs.createReadStream(sPath);
let writeStream = fs.createWriteStream(tPath);

let num = 1;
// 基于事件的回调函数
readStream.on('data',(chunk) => {
  num += 1;
  writeStream.write(chunk);
});

readStream.on('end',() => {
  console.log('处理完成'+num);
});

// 文件的事件处理机制和jQuery绑定事件的处理机制类似
// $("div").on('click',function(){
//   console.log(this.id);
// });
```

优化后的代码

```js
/*
  文件的流式操作
  fs.createReadStream(path[, options])
  fs.createWriteStream(path[, options])
*/
const path = require('path');
const fs = require('fs');

let sPath = 'C:\\Users\\www\\Desktop\\Nodejs\\file.zip';
let tPath = 'C:\\Users\\www\\Desktop\\file.zip';

// let readStream = fs.createReadStream(sPath);
// let writeStream = fs.createWriteStream(tPath);
// readStream.pipe(writeStream);
// 上面三行等效于下面一行代码
fs.createReadStream(sPath).pipe(fs.createWriteStream(tPath));
```

基于readline包的输入输出流

```js
/*
  文件的流式操作readline模块
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,//标准输入流（键盘）
  output: process.stdout//标准输出流（显示器）
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   console.log('Thank you for your valuable feedback:', answer);
//   rl.close();
// });
// ---------------------------------------------------
// 基于事件的回调函数
console.log(1);
rl.on('line',(line)=>{
  if(line == 'exit'){
    rl.close();
    return ;
  }
  console.log('你输入了如下内容：'+line);
  console.log(2);
});
console.log(3);
```

## Nodejs-异步编程原理分析

nodejs异步编程的原理：基于事件的回调函数