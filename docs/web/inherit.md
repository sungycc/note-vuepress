# js继承

## 原型继承

```javascript
function Person(name) {
  this.name = name;
  this.num = [1, 2, 7];
}

Person.prototype.say = function() {
  console.log('my name is ' + this.name);
};

function Doctor(id) {
  this.id = id;
}

Doctor.prototype = new Person();
//原型继承的缺点：在创建子类时，不能像父类的构造函数传递参数

var xiao1 = new Doctor('001');
var xiao2 = new Doctor('002');
xiao1.num.push(5);

console.log(xiao1.num); //[ 1, 2, 7, 5 ]
console.log(xiao2.num); //[ 1, 2, 7, 5 ]
//缺点：当父属性有引用类型时，实例的调用会影响原型本身
```

## apply、call继承

原型继承配合apply、call继承：一般通用的原型继承方式就是这种，但它也有缺点：就是重复调用了父类构造函数。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function() {
  console.log('hello,' + this.name + ',我的年龄是' + this.age);
}

function Doctor(name, age, id) {
  this.id = id;
  Person.call(this, name, age);
  //Person.apply(this,name,age);
}

Doctor.prototype = new Person();

Doctor.prototype.show = function() {
  console.log('hello,' + this.name + ',我的年龄是' + this.age + ',我的代号是' + this.id);
}

var doctor = new Doctor('小新', 20, '001');
doctor.say();//hello,小新,我的年龄是20
doctor.show();//hello,小新,我的年龄是20,我的代号是001
```

## 组合继承

上边的几种方式各有各的缺点，那么寄生组合继承就出现了。
寄生组合继成核心代码：

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(childType, parentType) {
  var prototype = object(parentType.prototype);
  prototype.constructor = childType;
  childType.prototype = prototype;
}
```

通过这种方法可以使parentType不用通过原型继承，减少一次调用。
