# 模块化规范

## Nodejs铺垫

### 初识模块化

现在网站越来复杂，JS代码和文件也越来越多，会造成了什么问题？

- 代码越来越乱了
- 命名冲突
- 文件依赖的问题
  + 写一个页面引入了很多JS文件，而且还容易产生依赖问题
- 什么是模块化
  + 一块儿一块儿的，JavaScript也是一块一块的
  + **模块化就是将一种复杂的事物按照模块的方式简单化实现**
  + 模块与模块之间相互协作构成了模块系统
- **程序模块化开发的优点**
  + 开发效率高
    * 代码方便重用，别人开发的模块直接拿过来就可以使用，不需要重复开发类似的功能
  + 可维护性高
    * 软件的声明周期中最长的阶段其实并不是开发阶段，而是维护阶段，需求变更比较频繁，使用模块化的开发方式更容易维护
- **非模块化开发的问题**
  + 命名冲突：团队协作开发，不同人员的变量和函数命名可能相同
  + 文件依赖：代码重用时，引入js文件的数目可能少了或者引入的顺序不对

>总结：1、什么是模块化； 2、程序模块化开发的优点

历史上，JavaScript一直没有模块体系，
无法将一个大程序拆分成相互依赖的小文件，再用简单的方法拼接起来
其他语言，包括CSS都有这项功能，
但是JavaScript任何这方便的支持都是没有的，这对开发大型的、复杂的项目形成了障碍

### 模块化演变历程

#### 全局函数

- 全局函数
  + 全局函数形成的模块只能人为的认为他们属于一个模块
  + 但是程序并不能区分哪些函数是同一个模块
- 全局函数容易造成的问题
  + 污染了全局变量，无法保证不与其他模块发生变量名冲突
  + 从代码阅读上来说：模块成员之间看不出之间的关系

```html
//  全局函数
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>全局函数</title>
  <style type="text/css">
  #container{
    width: 600px;
    height: 300px;
    background-color: lightgreen;
    margin:auto;
    padding: 10px;
    text-align: center;
  }
  </style>
  <script type="text/javascript">
    // 这里实现计算功能的函数可以称为一个模块，但是只能人为的认为他们是一个模块，程序是没有办法区分，这种编程模式非常容易产生命名冲突的问题
    // ---------------------------------计算模块start-----------------------------------------
    function sum(a,b){
      return parseInt(a) + parseInt(b);
    }
    function abstract(a,b){
      return parseInt(a) - parseInt(b);
    }
    function multiply(a,b){
      return parseInt(a) * parseInt(b);
    }
    function divide(a,b){
      return parseInt(a) / parseInt(b);
    }
    // ------------------------------------计算模块end----------------------------------------
    window.onload = function(){
      var btn = document.getElementById('btn');
      btn.onclick = function(){
        var a = document.getElementById('a').value;
        var b = document.getElementById('b').value;
        var flag = document.getElementById('flag').value;
        var result = 0;
        switch(parseInt(flag)){
          case 1:
            result = sum(a,b);
            break;
          case 2:
            result = abstract(a,b);
            break;
          case 3:
            result = multiply(a,b);
            break;
          case 4:
            result = divide(a,b);
            break;
        }
        var ret = document.getElementById('result');
        ret.innerHTML = result;
      }
    }
  </script>
</head>
<body>
  <div id="container">
    <input type="text" id="a">
    <select id="flag">
      <option value="1">加</option>
      <option value="2">减</option>
      <option value="3">乘</option>
      <option value="4">除</option>
    </select>
    <input type="text" id="b">
    <input type="button" value="计算" id="btn">
    <div id="result"></div>
  </div>
</body>
</html>
```

#### 对象封装(命名空间法)

所谓的命名空间，就是对象上加了一个属性或者方法

- 对象封装-命名空间
  + 通过添加命名空间的形式从某种程度上解决了变量命名冲突的问题，但是并不能从根本上解决命名冲突
  + 从代码级别可以明显的区别出哪些函数属于同一模块
- 对象封装-命名空间造成的问题
  + 暴露了所有的模块成员，内部状态可以被外部改写，不安全
  + 命名空间越来越长

```javascript
<script type="text/javascript">
// 这里的obj可以从程序级别区分出功能模块;这种模式可以降低命名冲突的概率，但是并不能从根本上解决；这种方式有一个说法：命名空间(早期的一些js框架YUI、EXTJS采用了命名空间)
var obj = {};
// obj.cal = {};
// obj.cal.sum = function(){};
// obj.cal.sum();
obj.sum = function(a,b){
  return parseInt(a) + parseInt(b);
}
obj.abstract = function(a,b){
  return parseInt(a) - parseInt(b);
}
obj.multiply = function(a,b){
  return parseInt(a) * parseInt(b);
}
obj.divide = function(a,b){
  return parseInt(a) / parseInt(b);
}
window.onload = function(){
  var btn = document.getElementById('btn');
  btn.onclick = function(){
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var flag = document.getElementById('flag').value;
    var result = 0;
    switch(parseInt(flag)){
      case 1:
        result = obj.sum(a,b);
        break;
      case 2:
        result = obj.abstract(a,b);
        break;
      case 3:
        result = obj.multiply(a,b);
        break;
      case 4:
        result = obj.divide(a,b);
        break;
    }
    var ret = document.getElementById('result');
    ret.innerHTML = result;
  }
}
</script>
```

#### 隔离公有私有成员 （私有空间）（重要）

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

如果不通过return，外部是无法访问到内部的属性和方法的，无法修改

形成了一个隔离作用域，
可以把模块自己使用的成员封装到模块内部，降低了对全局作用域的污染
其实就是降低命名冲突的概率，隔离公有私有成员

通过匿名自执行函数，利用函数作用域的机制隔开私有变量
- 私有共有成员分离
  + 私有空间的变量和函数不会影响全局作用域
  + 公开公有方法，隐藏私有空间

```javascript
var on = (function(){
  1、私有的函数
  2、公有的部分
  return;
})()

var module = (function(){
  // 这里就形成了一个隔离环境
  // 隔离公有私有成员之后，降低了对全局作用域的污染，进一步降低了命名冲突的概率
  function showLog(a,b,flag){
    console.log(a + flag + b + '进行计算');
  }
  var obj = {};
  obj.sum = function(a,b){
    showLog(a,b,'+');
    return parseInt(a) + parseInt(b);
  }
  obj.abstract = function(a,b){
    showLog(a,b,'-');
    return parseInt(a) - parseInt(b);
  }
  obj.multiply = function(a,b){
    showLog(a,b,'*');
    return parseInt(a) * parseInt(b);
  }
  obj.divide = function(a,b){
    showLog(a,b,'/');
    return parseInt(a) / parseInt(b);
  }
  return obj;
})();

window.onload = function(){
  var btn = document.getElementById('btn');
  btn.onclick = function(){
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var flag = document.getElementById('flag').value;
    var result = 0;
    switch(parseInt(flag)){
      case 1:
        result = module.sum(a,b);
        break;
      case 2:
        result = module.abstract(a,b);
        break;
      case 3:
        result = module.multiply(a,b);
        break;
      case 4:
        result = module.divide(a,b);
        break;
    }
    var ret = document.getElementById('result');
    ret.innerHTML = result;
  }
}
```

#### 增强模块可维护性(了解，多写熟悉)

- 模块的维护和拓展
  + 可以采用直接赋值的形式扩展这个模块，防止了模块的名称被冲突
  + 在加载模块的时候，不需要在考虑顺序的问题，但是采用着这种方式，一定要遵守这种规范
- 开闭原则

```javascript
var on = (function(){
  1、私有的函数
  2、公有的部分
  return
})()

var on = (function(o){
  1、私有的函数
  2、公有的部分
  return
})(one || {})

var module = (function(m){
  // 通过参数的形式划分了子模块，进一步增强了模块的可维护和可扩展性
  // 开闭原则：对修改封闭，对添加开放
  function showLog(a,b,flag){
    console.log(a + flag + b + '进行计算');
  }
  m.sum = function(a,b){
    showLog(a,b,'+');
    return parseInt(a) + parseInt(b);
  }
  m.abstract = function(a,b){
    showLog(a,b,'-');
    return parseInt(a) - parseInt(b);
  }
  m.multiply = function(a,b){
    showLog(a,b,'*');
    return parseInt(a) * parseInt(b);
  }
  m.divide = function(a,b){
    showLog(a,b,'/');
    return parseInt(a) / parseInt(b);
  }
  return m;
})(module || {});

// 新模块
var module = (function(m){
  function showInfo(){
    console.log('求余数');
  }
  m.mod = function(a,b){
    showInfo();
    return parseInt(a) % parseInt(b);
  }
  return m;
})(module || {});

window.onload = function(){
  var btn = document.getElementById('btn');
  btn.onclick = function(){
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var flag = document.getElementById('flag').value;
    var result = 0;
    switch(parseInt(flag)){
      case 1:
        result = module.sum(a,b);
        break;
      case 2:
        result = module.abstract(a,b);
        break;
      case 3:
        result = module.multiply(a,b);
        break;
      case 4:
        result = module.divide(a,b);
        break;
      case 5:
        result = module.mod(a,b);
        break;
    }
    var ret = document.getElementById('result');
    ret.innerHTML = result;
  }
}
```

#### 添加第三方依赖

一定要把依赖项通过参数的形式注入进来，然后在内部使用注入的属性<br>
不要直接在模块内部使用第三方依赖

- 模块的第三方依赖
  + 模块最好要保证模块的职责单一性，最好不要与程序的其他部分直接交互
  + 通过向匿名函数注入依赖项的形式，除了保证模块的独立性，还使模块之间的依赖关系变的更加明显
- 好处
  + 提高了代码的执行性能，减少了变量作用域的查找层数
  + 增加了代码的可读性，能直观的看当前文件模块依赖的其他模块

```javascript
var on = (function(o, abc){
  1、私有的函数
  2、公有的部分
  return
})(one || {}, jQuery)
```
```html
<script type="text/javascript" src="./jquery.js"></script>
<script type="text/javascript">
var module = (function(m){
    // 通过参数的形式划分了子模块，进一步增强了模块的可维护和可扩展性
    // 开闭原则：对修改封闭，对添加开放
    function showLog(a,b,flag){
      console.log(a + flag + b + '进行计算');
    }
    m.sum = function(a,b){
      showLog(a,b,'+');
      return parseInt(a) + parseInt(b);
    }
    m.abstract = function(a,b){
      showLog(a,b,'-');
      return parseInt(a) - parseInt(b);
    }
    m.multiply = function(a,b){
      showLog(a,b,'*');
      return parseInt(a) * parseInt(b);
    }
    m.divide = function(a,b){
      showLog(a,b,'/');
      return parseInt(a) / parseInt(b);
    }
    return m;
})(module || {});

// 新模块
var module = (function(m,$){
  function showInfo(){
    console.log('求余数');
  }
  m.mod = function(a,b){
    $("#container").css('backgroundColor','lightblue');
    showInfo();
    return parseInt(a) % parseInt(b);
  }
  return m;
})(module || {},jQuery);

window.onload = function(){
  var btn = document.getElementById('btn');
  btn.onclick = function(){
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var flag = document.getElementById('flag').value;
    var result = 0;
    switch(parseInt(flag)){
      case 1:
        result = module.sum(a,b);
        break;
      case 2:
        result = module.abstract(a,b);
        break;
      case 3:
        result = module.multiply(a,b);
        break;
      case 4:
        result = module.divide(a,b);
        break;
      case 5:
        result = module.mod(a,b);
        break;
    }
    var ret = document.getElementById('result');
    ret.innerHTML = result;
  }
}
</script>
```

### 总结

- 规范
  + 最大的问题，还是规范的问题
  + 如果在多人协作开发过程中，会有很大的问题
  + 多人协作开发阶段：代码的风格一定要统一

### 模块化规范
- 浏览器端规范
  + AMD---RequireJS 国外相对流行
    https://github.com/amdjs/amdjs-api/wiki/AMD
  + CMD---SeaJS 国内相对流行
    https://github.com/cmdjs/specification/blob/master/draft/module.md
  + ES6 Module
- 服务器端规范
  + CommonJS---nodejs
    http://www.commonjs.org/specs/

## AMD

- AMD实现-RequireJS
  + RequireJS-James Burke AMD规范的创始人
    与SeaJS 基本实现类似的功能
    中文官网：http://www.requirejs.cn/
  + RequireJS基本使用
    * 引入requirejs   
      <script data-main="main" src="require.js"></script>
    * 定义模块
      define([path1,path2],function(m1,m2){})
  + SeaJS和RequireJS对比
    https://github.com/seajs/seajs/issues/277

## CMD

CMD规范实现-SeaJS，SeaJS---阿里巴巴前端架构师玉伯，js文件的依赖管理、异步加载，方便前端的模块化开发。
官方网站：http://seajs.org/

### Seajs基本使用

- 使用seajs的步骤
  + 1、引入seajs
  + 2、如何定义模块
    * define // 参数的名字不允许修改，参数可以是多个（只能从后面开始省略，不能跳着省略）
    * define(function(require, exports, module){});
  + 3、如何公开模块成员
    * exports
    * seajs.use两个参数
      - 模块的路径
      - 回调函数 -- 回调函数的参数指成的是exports
  + 4、如何依赖模块
    * require()

- 案列代码如下：
```html
<script type="text/javascript" src="./sea.js"></script>
<script type="text/javascript">
  seajs.config({
    alias : {
      jquery: './jquery-1.11.1.js'
    }
  });
  seajs.use('./main.js',function(main){
    // main.showLog();
    // main.showInfo();
  });
</script>
```
```js
//  main.js中代码如下：
define(function(require, exports, module) {
  var a = require('./module3.js');
  a.showInfo();
})
```

### 参数定义分析
- exports 与 module.exports
  + 它们两个实际上是一个对象
  + exports 对外提供接口（对象的属性）
  + module.exports 对外提供了整个接口（整个对象）
- require
  + 加载外部的模块
  + require 是一个方法，接受模块标识作为唯一参数，用来获取其他模块提供的接口。
- exports
  + exports 是一个对象，用来向外提供模块接口。
- module
  + module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。
- module有几种属性和方法
  + module.id (模块id，就是全路径了，一般情况下（没有在 define 中手写 id 参数时），module.id 的值就是 module.uri，两者完全相同。)  
  + module.exports(对外接口，{}格式，exports 仅仅是 module.exports 的一个引用。)
  + module.dependencies(数组，当前模块依赖的模块)

### 导出成员原理分析

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

**exports与module.exports区别**

 其实，Module.exports才是真正的接口，exports只不过是它的一个辅助工具。
 最终返回给调用的是Module.exports而不是exports。
 所有的exports收集到的属性和方法，都赋值给了Module.exports。
 当然，这有个前提，就是Module.exports本身不具备任何属性和方法。
 如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略

- 如果导出的是单个成员，那么一般使用exports.成员名称 这种形式导出
- 如果导出的是一个对象，那么一般使用module.exports这种形式导出

### 异步加载

Seajs异步加载模块的写法
> require.async("模块地址",function(){})
```js
require.async('. /js/module.js',function(){
  console.log('回调函数');
});
```
### Seajs依赖jQuery
- 如何设置jQuery依赖
```js
  if ( typeof noGlobal === strundefined ) {
    window.jQuery = window.$ = jQuery;
    if ( typeof define === "function" ) {
      define(function(){return jQuery});
    }
  }
```
- seaJS如何配置参数
```js
  seajs.config({
    alias : {
      jquery: "jquery-1.11.1.js"
    }
  })
```
- module参数
  + id：模块的唯一标识
  + uri: 模块绝对路径
  + dependencies：当前模块依赖
  + exports：当前模块对外接口

### 加载原理分析

> /*@cc_on ..... @*/之间的部分可以被ie识别并作为程序执行，同时启用ie的条件编译。

```javascript
function loadJs(path,callback){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.setAttribute('src',path);
	head.appendChild(script);
	if(!/*@cc_on!@*/false){//非IE
		script.onload = function(){
			// console.log('非IE');
			callback();
		}
	}else{
		script.onreadystatechange = function(){
			if(script.readyState == 'loaded' || script.readyState == 'complete'){
			    console.log('IE');
				callback();
			}
		}
	}
}
```

### 官方案例介绍
简单介绍，不是重点

### 综合案例-1
查看案例（定时器）

### 综合案例-2
查看案例（Tab栏）

### 综合案例-3
查看案例（限制滑动返回的盒子）

## ES6 Module

## ConmonJS

> CommonJS 规范不是专门为JavaScript模块化制定的规范， <br>
> 而是为JavaScript语言很多在后台没有没有实现的功能制定的API规范 <br>
> 例如：文件操作、网络操作、进程操作等接口API  <br>
> 为JavaScript语言本身在后台的功能实现定义了很多API，其中就包括模块化的规范API

- 一个单独的文件就是一个模块
- 所有代码都运行在模块作用域中，不会污染全局作用域
- 每个文件的对外接口是module.exports对象
- require命令用于加载模块文件的接口对象
- 模块可以加载多次，但是只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后在加载，就直接读取缓存结果
- 模块加载的顺序，按照其在代码中出现的顺序

## 区别

- AMD
  + 预加载，预执行
  + 预加载就是把所有的 js 文件模块都下载下来
  + 预执行就是把每个加载成功一个执行一个
- CMD
  + 预加载，懒执行
  + 预加载就是把所有的 js 文件模块都下载下来
  + 懒执行就是等所有的js文件都加载完毕之后了才去执行
- ES6
  + 
- ConmonJS
  + 执行到了哪里，就加载到哪里，然后执行哪里，
  + 同步加载，同步执行

## 模块概念拓展

- AMD/CMD（同类规范：浏览器端）
- ES6 模块化  babel（ES6支持模块化，babel将es6语法转换为es5，这样浏览器就都支持了）
- CommonJS（另类规范：服务器端）
- Webpack（国外）
- Fis（百度实现的，和Webpack功能差不多）

### 开闭原则
- 模块拓展一定需要遵守的原则
  + 对添加开放
  + 对修改封闭

