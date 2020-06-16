# void操作符

由于JS表达式偏啰嗦，于是最近便开始采用Coffeescript来减轻负担。举个栗子，当我想取屋子里的第一条dog时，首先要判断house对象是否存在，然后再判断house.dogs是否存在，最后取house.dogs[0]。在JS需要这么写

```javascript
var dog = (typeof house !== 'undefined && house !== null) && house.dogs && house.dogs[0];
```

在Coffee中，我只需要这么写：

```javascript
dog = house?.dogs?[0];
```

写到这里，读者会问，这跟标题《Javascript中的void》有一毛钱关系？Coffee的本质就是JS，之所以Coffee能工作的很好，是因为它生成出了高效而且健壮的JS代码，我们可以看看它的生成结果。

```javascript
var dog, _ref;
dog = typeof house !== "undefined" && house !== null ? (_ref = house.dogs) != null ? _ref[0] : void 0 : void 0;
```

短短一行Coffee代码生成出了如此长的JS代码，看上去似乎比我最前面自己用JS写的更靠谱更安全，末尾还出来了两个void 0，这究竟是何方神圣？

结构化一下上面的例子：

```javascript
dog = (typeof house !== "undefined" && house !== null) ?
        ((_ref = house.dogs) != null ? _ref[0] : void 0 ) 
        : void 0;
```

如果house未定义或house为null时，返回void 0
如果house.dogs为null时，返回void 0
可void 0究竟是什么值，这个倒很容易测试:

```javascript
typeof void 0 //得到"undefined"
console.log(void 0) //输出undefined
```

似乎void 0就是undefined了，但这样子路数太野，也不够严谨，即无法回答：void 100, void hello(), void i++这无数可能组合的值是什么？

我们来瞅瞅规范是怎么说的吧。

## 规范是这么说的

在ECMAScript 262规范，有如下描述：

The void Operator

The production UnaryExpression : void UnaryExpression is evaluated as follows:

Let expr be the result of evaluating UnaryExpression.
Call GetValue(expr).
Return undefined.
NOTE: GetValue must be called even though its value is not used because it may have observable side-effects.
搬译一下：

void操作符

产生式 UnaryExpression : void UnaryExpression 按如下流程解释:

令 expr 为解释执行UnaryExpression的结果。
调用 GetValue(expr).
返回 undefined.
注意：GetValue一定要调用，即使它的值不会被用到，但是这个表达式可能会有副作用(side-effects)。
重点在于：无论void后的表达式是什么，void操作符都会返回undefined. 因此上面由Coffee编译出来的代码我们可以认为是这样的：

```javascript
dog = (typeof house !== "undefined" && house !== null) ? 
        ((_ref = house.dogs) != null ? _ref[0] : undefined ) 
        : undefined ;
```

问题来了，既然(void 0) === undefined，那直接写undefined不就行了么？

## 为什么要用void？

因为undefined在javascript中不是保留字。换言之，你可以写出：

```javascript
function joke() {
  var undefined = "hello world";
  console.log(undefined); //会输出"hello world"
}
console.log(undefined); //输出undefined
```

对的，你可以在一个函数上下文内以undefined做为变量名，于是在这个上下文写的代码便只能通过从全局作用域来取到undefined，如：

```javascript
window.undefined //浏览器环境
GLOBAL.undefined //Node环境
```

但要注意的是，即便window, GLOBAL仍然可以在函数上下文被定义，故从window/GLOBAL上取undefined并不是100%可靠的做法。如：

```javascript
function x() {
  var undefined = 'hello world',
    f = {},
    window = {
      'undefined': 'joke'
    };
  console.log(undefined);// hello world
  console.log(window.undefined); //joke
  console.log(f.a === undefined); //false
  console.log(f.a === void 0); //true
}
```

于是，采用void方式获取undefined便成了通用准则。如underscore.js里的isUndefined便是这么写的：

```javascript
_.isUndefined = function(obj) {
  return obj === void 0;
}
```

除了采用void能保证取到undefined值以外，还有其它方法吗？有的，还有一种方式是通过函数调用。如AngularJS的源码里就用这样的方式：

```javascript
(function(window, document, undefined) {
    //.....
})(window, document);
```

通过不传参数，确保了undefined参数的值是一个undefined。

## 其它作用

除了取undefined外，void还有什么其它用处吗？

还有一个常见的功能，填充href。下面是一个微博截图，它的转发, 收藏， 讨论都是超链接，但是用户并不希望点击它们会跳转到另一个页面，而是引发出一些交互操作。
<img src="https://sfault-image.b0.upaiyun.com/e0/70/e070948266121dfd51a633c63be7a8a1_articlex" alt="">
理论上而言，这三个超链接都是没有URL的，但如果不写的话，呵呵，点击它会刷新整个页面。于是便用上了href="javascript:void(0)的方式，确保点击它会执行一个纯粹无聊的void(0)。

另一种情况是，如果我们要生成一个空的src的image，最好的方式似乎也是src='javascript:void(0)'，参见StackOverflow上的这个问题：What's the valid way to include an image with no src?

## 写在最后

回到void的定义，有一句话特别让人迷惑：

注意：GetValue一定要调用，即使它的值不会被用到，但是这个表达式可能会有副作用(side-effects)。
这是什么意思？这表示无论void右边的表达式是什么，都要对其求值。这么说可能不太明白，在知乎上winter大神有过阐述关于js中void，既然返回永远是undefined，那么GetValue有啥用？，我且拾人牙慧，代入一个场景，看代码：

```javascript
var happiness = 10;
var girl = {
  get whenMarry() {
    happiness--;
    return 1/0; //Infinity
  },
  get happiness() {
    return happiness;
  }
};

console.log(girl.whenMarry); //调用了whenMarry的get方法
console.log(girl.happiness); // 9

void girl.whenMarry; //调用了whenMarry的get方法
console.log(girl.happiness); // 8

delete girl.whenMarry; //没有调用whenMarry的get方法
console.log(girl.happiness); //还是8
```

上述代码定义了一个大龄文艺女青年，每被问到什么时候结婚呀(whenMarry)，happiness都会减1。从执行情况可以看出，无论是普通访问girl.whenMarry，还是void girl.whenMarry都会使她的happiness--。而如果把void换成delete操作符写成delete girl.whenMarry，她的happiness就不会减了，因为delete操作符不会对girl.whenMarry求值。

## 总结

- void有如下作用：
  + 通过采用void 0取undefined比采用字面上的undefined更靠谱更安全，应该优先采用void 0这种方式。
  + 填充a标签的href确保点击时不会产生页面跳转; 填充<image>的src，确保不会向服务器发出垃圾请求。