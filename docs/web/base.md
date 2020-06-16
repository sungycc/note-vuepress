# es6基础

>2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。
- 1997年     ECMAScript 1.0
- 1998年6月  ECMAScript 2.0
- 1999年12月 ECMAScript 3.0
- 2009年12月 ECMAScript 5.0
- 2015年6月  ECMAScript 6.0

- 安装es-checker  检测node对es6的支持情况
> npm install -g es-checker
安装完成后执行es-checker查看Node.js对es6的支持情况
- [Babel](https://babeljs.io/)
详情请看：http://es6.ruanyifeng.com/

## let

用法类似于var，let声明的变量只在let命令所在的代码块内有效。
- let声明的变量不存在预解析
- let声明的变量在块级作用域有效
- 同一个作用域内，let不可以声明重名的变量
- 在代码级内部，不可以在声明变量之前使用

for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```
上面代码正确运行，输出了3次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。

注意：
- **不存在变量提升**：也就是说必须在声明之后使用否则会报错，这点和var不同；
- **暂时性死**区：在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ），在死区内使用typeof会报错，let出现前typeof时百分百安全的操作符，后面这种写法也会报错：let x = x;// ReferenceError: x is not defined。总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
- **不允许重复声明**：let不允许在相同作用域内，重复声明同一个变量；

## const
const声明一个只读的常量。一旦声明，常量的值就不能改变，否则报错；const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值，否则报错；

+ 声明的变量不可以重新赋值，必须在声明的时候进行初始
化，
+ 除了这条规则，别的特性和let一致

其它和let一样：只在声明所在的块级作用域内有效；const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用；const声明的常量，也与let一样不可重复声明。

**注意：**
本质：const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

如果真的想将对象冻结，应该使用Object.freeze方法。
```javascript
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```
上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

##  babel
将es6转换成浏览器能识别的es5语法

## 暂时性死区
在代码块内部，不可以在声明变量之前使用

## 变量解构赋值
- 解构赋值作用：解构赋值可以方便地将一组参数与变量名对应起来
- 解构赋值
  + 从对象中提取值，对变量进行赋值，这就是解构赋值
  + 从数组中提取值，对变量进行赋值，这就是解构赋值
  + 字符串的解构赋值

## 字符串扩展
+ 模板字符串：${里面可以执行js代码}
+ 方法扩展
  - Str.includes(a,b) 判断字符串中是否包含特定的子串：这里的b指的是str的b-str.length之间的字符串
  - str.startsWith(a,b) 判断字符串是否以特定的字串开始
  - str.endsWith(a,b) 判断字符串是否以特定的字串结束：**这里的b指的是str的0-b之间的字符串**

## 函数扩展
- 参数
  + 可以传递默认值
  + 参数可以进行解构解析
  + `...rest`(rest参数,名称可以自定义) --- 把单个数据项解析为数组
  + `...` (扩展运算符) --- 把数组解析为单个数据项
- 箭头函数
  + 函数中的this是声明时的对象，不是调用时的对象，也就是函数所在作用于中的this
  + 也就是说它不是构造函数
  + 函数内部不可以使用arguments，可以用rest参数替代

## Class类
- Class 类的基本用法
- 构造方法 constructor super
- Static静态方法
- 继承 extends
```javascript
//    类（本质上就是构造函数）

function Person(sex, weight) {
  this.sex = sex;
  this.weight = weight;
}
Person.prototype.showSex = function() {
  console.log('sex:' + this.sex);
}
Person.prototype.showWeight = function() {
  console.log('weight:' + this.weight);
}
let p = new Person('male', '80kg');
p.showSex();
p.showWeight();

//类的基本用法：class实质就是构造函数
class Person {
  constructor(sex, weight) {
    this.sex = sex;
    this.weight = weight;
  }

  showWeight() {
    console.log('weight:' + this.weight);
  }

  showSex() {
    console.log('sex:' + this.sex);
  }
}

let p = new Person('female', '75kg');
p.showWeight();
p.showSex();

//  静态方法(静态方法必须通过类名调用， 不可以使用实例对象调用)
class Person {
  static showInfo() {
    console.log('hello');
  }
  constructor(sex, weight) {
    this.sex = sex;
    this.weight = weight;
  }

  showWeight() {
    console.log('weight:' + this.weight);
  }

  showSex() {
    console.log('sex:' + this.sex);
  }
}

let p = new Person('female', '75kg');
p.showWeight();
p.showSex();
// p.showInfo();
Person.showInfo();

//  继承
class Student extends Person {
  constructor(sex, weight, score) {
    super(sex, weight); //调用父类的构造函数,这个步骤是必须的
    this.score = score;
  }

  showScore() {
    console.log('score:' + this.score);
  }
}

let stu = new Student('male', '70kg', '100');
stu.showScore();
stu.showSex();
stu.showWeight();
Student.showInfo();// 通过子类可以调用父类的静态方法
```
