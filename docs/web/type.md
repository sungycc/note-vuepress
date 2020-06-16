# javascript类型

## 类型检测

在 JavaScript 中，我们常常会看到这样的代码：变量与null的比较（这种用法很有问题），用来判断变量是否被赋予了一个合理的值。比如：
```javascript
var Controller = {
  process: function(items) {
    if (items !== null) { // 不好的写法
      items.sort();
      items.forEach(function(item) {
        // 执行一些逻辑
      });
    }
  }
}
```

在这段代码中，process()方法显然希望items是一个数组，因为我们看到items拥有sort()和forEach()。这段代码的意图非常明显：如果参数items不是一个组数，则停止接下来的操作。这种写法的问题在于，和null的比较并不能真正避免错误的发生。items的值可以是1，也可以是是字符串，甚至可以是任意对象。这些值都和null不相等，进而会导致process()方法一旦执行到sort()时就会出错。

仅仅和null比较并不能提供足够的信息来判断后续代码的执行是否真的安全。好在 JavaScript 为我们提供了很多种方法来检测变量的真实值。

### 检测原始值

在 JavaScript 中有5种原始类型（也称为简单数据类型）： String、Number、Boolean、Undefined和Null。如果你希望一个值是String、Number、Boolean或Undefined，最佳选择是使用typeof运算符，它会返回一个表示类型的字符串。

对于字符串，typeof返回"string"。
对于数字，typeof返回"number"。
对于布尔值，typeof返回"boolean"。
对于undefined，typeof返回"undefined"。
typeof的基本语法是：typeof variable，你还可以这样用：typeof(variable)，尽管这是合法的 JavaScript 语法，这种用法让typeof看起来像一个函数而非运算符。鉴于此，我们更推荐无括号的写法。

使用typeof来检测这4种原始类型是非常安全的做法。来看下面这些例子。
```javascript
// 检测"String"
if (typeof name === "string") {
  anotherName = name.substring(3);
}
// 检测"Number"
if (typeof count === "number") {
  updateCount(count);
}
// 检测"Boolean"
if (typeof found === "boolean" && found) {
  message("Found!");
}
// 检测"Undefined"
if (typeof MyApp === "undefined") {
  MyApp = {
    // 其他代码
  };
}
```

typeof运算符的独特之处在于，将其用于一个未声明的变量也不会报错。未定义的变量和值为undefined的变量通过typeof都将返回"undefined"。

最后一个原始类型null，通过typeof将返回"object"，这看上去很怪异，被认为是标准规范的严重 bug，因此在编程时要 杜绝使用typeof来检测null的类型。
```javascript
console.log(typeof null);   // "object"
```
简单地和null进行比较通常不会包含足够的信息以判断值的类型是否合法，所以null一般不应用于检测语句。

但有一个例外，如果所期望的值真的是null，则可以直接和null进行比较。例如：
```javascript
// 如果你需要检测 null，则使用这种方法
var element = document.getElementById("my-div");
if (element !== null) {
  element.className = "found";
}
```
如果 DOM 元素不存在，则通过document.getElementById()得到的值为null。这个方法要么返回一个节点，要么返回null。由于这时null是可预见的一种输出，则可以用恒等运算符===或非恒等运算符!==来检测返回结果。

typeof运算符的返回值除了上述提到的string、number、boolean、undefined和object之外，还有function。从技术的角度来讲，函数在 JavaScript 中也是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过typeof运算符来区分函数和其他对象是有必要的。这一特性将在后面 检测函数 中用到。

### 检测引用值

在 JavaScript 中除了原始值之外的都是引用值（也称为对象），常用的引用类型有：Object、Array、Date和RegExp，这些引用类型都是 JavaScript 的内置对象。typeof运算符在判断这些引用类型时全都返回"object"。
```javascript
console.log(typeof {});             // "object"
console.log(typeof []);             // "object"
console.log(typeof new Date());     // "object"
console.log(typeof new RegExp());   // "object"
```
检测某个引用值类型的最好方法是使用instanceof运算符，instanceof的基本语法是：
```javascript
value instanceof constructor
// 检测日期
if (value instanceof Date) {
  console.log(value.getFullYear);
}
// 检测 Error
if (value instanceof Error) {
  throw value;
}
// 检测正则表达式
if (value instanceof RegExp) {
  if (value.test(anotherValue)) {
    console.log("Matches");
  }
}
```

instanceof的一个有意思的特性是它不仅检测构造这个对象的构造器，还检测原型链。原型链包含了很多信息，包括定义对象所采用的继承模式。比如，默认情况下，每个对象都继承自Object，因此每个对象的value instanceof Object都会返回ture。比如：

```javascript
var now = new Date();
console.log(now instanceof Object); // ture
console.log(now instanceof Date);   // ture
```
instanceof运算符也可以检测自定义的类型，比如：
```javascript
function Person(name){
  this.name = name;
}
var me = new Person("Nicholas");
console.log(me instanceof Object);  // ture
console.log(me instanceof Person);  // ture
```

这段示例代码中创建了Person类型。变量me是Person的实例，因此me instanceof Person是true。上文也提到，所有的对象都被认为是Object的实例，因此me instanceof Object也是ture。

在 JavaScript 中检测 内置类型 和 自定义类型 时，最好的做法就是使用instanceof运算符，这也是唯一的方法。

但有一个严重的限制，假设两个浏览器帧（frame）里都有构造函数Person，帧A中的Person实例frameAPersonInstance传入到帧B中，则会有如下结果：
```javascript
console.log(frameAPersonInstance instanceof frameAPerson)    // ture
console.log(frameAPersonInstance instanceof frameBPerson)    // false
```
尽管两个Person的定义是完全一样的，但在不同帧（frame）里，他们被认为是不同类型。有两个非常重要的内置类型也有这个问题：Array和Function，所以检测它们一般不使用instanceof。

### 检测函数

从技术上讲，JavaScript 中的函数是引用类型，同样存在Function构造函数，每个函数都是其实例，比如：
```javascript
function myFunc() {}
// 不好的写法
console.log(myFunc instanceof Function); // true
```
然而，这个方法亦不能跨帧（frame）使用，因为每个帧都有各自的Function构造函数，好在typeof运算符也是可以用于函数的，返回"function"。
```javascript
function myFunc() {}
// 好的写法
console.log(typeof myFunc === "function"); // true
```
检测函数最好的方法是使用typeof，因为他可以跨帧（frame）使用。

用typeof来检测函数有一个限制。在 IE 8 和更早版本的 IE 浏览器中，使用typeof来检测 DOM 节点中的函数都返回"object"而不是"function"。比如：
```javascript
// IE8 及更早版本的IE
console.log(typeof document.createElement);         // "object"
console.log(typeof document.getElementById);        // "object"
console.log(typeof document.getElementByTagName);   // "object"
```
之所以出现这种怪异的现象是因为浏览器对 DOM 的实现有差异。简言之，这些早版本的 IE 并没有将 DOM 实现为内置的 JavaScript 方法，导致内置typeof运算符将这些函数识别为对象。因为 DOM 是有明确定义的，了解到对象成员如果存在则意味着它是一个方法，开发者往往通过in运算符来检测 DOM 的方法，比如：
```javascript
// 检测 DOM 方法
if ("querySelectorAll" in document) {
  var images = document.querySelectorAll("img");
}
```
这段代码检查querySelectorAll是否定义在document中，如果是，则使用这个方法。尽管不是最理想的方法，如果想在 IE 8 及更早浏览器中检测 DOM 方法是否存在，这是最安全的做法。在其他所有的情形中，typeof运算符是检测 JavaScript 函数的最佳选择。

### 检测数组

JavaScript 中最古老的跨域问题之一就是在帧（frame）之间来回传递数组。开发者很快发现instanceof Array在此场景中不能返回正确的结果。正如上文提到的，每个帧都有各自的Array构造函数，因此一个帧中的实例在另外一个帧里不会被识别。

关于如何在 JavaScript 中检测数组类型已经有狠多研究了，最终 Kangax 给出了一种优雅的解决方案：
```javascript
function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}
```
Kangax 发现调用某个值的内置toString()方法在所有浏览器中都会返回标准的字符串结果。对于数组来说，返回的字符串为"[object Array]"，也不用考虑数组实例实在哪个帧（frame）中被构造出来的。这种方法在识别内置对象时往往十分有用，但对于自定义对象请不要用这种方法。

ECMAScript5 将Array.isArray()正式引入 JavaScript。唯一的目的就是准确地检测一个值是否为数组。同 Kangax 的函数一样，Array.isArray()也可以检测跨帧（frame）传递的值，因此很多 JavaScript 类库目前都类似地实现了这个方法。
```javascript
function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}
```
IE 9+、FireFox 4+、Safari 5+、Opera 10.5+、Chrome 都实现了Array.isArray()方法。

### 检测属性

另外一种用到null（以及undefined）的场景是当检测一个属性是否在对象中存在时，比如：

```javascript
// 不好的写法：检测假值
if (object[propertyName]) {
  // 一些代码
}
// 不好的写法：和null相比较
if (object[propertyName] != null) {
  // 一些代码
}
// 不好的写法：和undefined相比较
if (object[propertyName] != undefined) {
  // 一些代码
}
```

上面这段代码里的每个判断，实际上是通过给定的名字来检查属性的值，而并非判断给定的名字所指的属性是否存在。在第一个判断中，当属性值为假值时结果会出错，比如：0、""（空字符串）、false、null和undefined，毕竟这些都是属性的合法值。

判断属性是否存在的最好的方法是使用in运算符。in运算符仅仅会简单地判断属性是否存在，而不去读属性的值，如果实例对象的属性存在、或者继承自对象的原型，in运算符都会返回true。比如：
```javascript
var object = {
  count: 0,
  related: null
};
// 好的写法
if ("count" in object) {
  // 这里的代码会执行
}
// 不好的写法：检测假值
if (object["count"]) {
  // 这里的代码不会执行
}
// 好的写法
if ("related" in object) {
  // 这里的代码会执行
}
// 不好的写法，检测是否为
if (object["related"] != null) {
  // 这里的代码不会执行
}
```

如果你只想检查实例对象的某个属性是否存在，则使用hasOwnProperty()方法。所有继承自Object的 JavaScript 对象都有这个方法，如果实例中存在这个属性则返回true（如果这个属性只存在于原型里，则返回false）。需要注意的是，在 IE 8 以及更早版本的 IE 中，DOM 对象并非继承自 Object，因此也不包含这个方法。也就是说，你在调用 DOM 对象的hasOwnProperty()方法之前应当先检测其是否存在。

```javascript
// 对于所有非 DOM 对象来说，这是好的写法
if (object.hasOwnProperty("related")) {
  // 执行这里的代码会
}
// 如果你不确定是否为 DOM 对象，则这样来写
if ("hasOwnProperty" in object && object.hasOwnProperty("related")) {
  // 执行这里的代码会
}
```

因为存在 IE 8 以及更早版本的 IE 的情形，在判断实例对象的属性是否存在时，我更倾向于使用in运算符，只有在需要判断实例属性时才会用到hasOwnProperty()。

不管你什么时候需要检测属性的存在性，请使用in运算符或者hasOwnProperty()。这样做可以避免很多 bug。