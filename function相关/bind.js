/**
 * fn.bind(thisArg, arg1, arg2, ...)
 * 1. 函数 fn 不会立即执行；返回一个新函数；
 * 2. bind 的 第一个参数是 fn 的 this；
 * 3. bind 可以分离参数；bind 接收一部分，返回的新函数接收一部分参数；
 * 4. bind 跟 call 的参数传递方式是一样的；
 * 5. 实例化返回的新函数 -> this 指向是 fn 构造出来的实例；
 * 6. 实例应该继承 fn 构造函数上的原型属性
 */

Function.prototype.myBind = function (thisArg) {
  thisArg = thisArg ? Object(thisArg) : window;
  var _temp = function (){};
  var originFn = this;
  // 处理参数
  var args = [].slice(arguments, 1);
  var newFn = function () {
    var newArgs = [].slice(arguments);
    // 注意 this
    return originFn.apply(this instanceof newFn ? this : thisArg, args.concat(newArgs));
  }

  _temp.prototype = originFn.prototype
  newFn.prototype = new _temp();
  return newFn;
}

/*
// 测试代码
function test(){
  this.a = 1;
  console.log(this);
  console.log(arguments)
}
test.prototype.c = 3;
var t = test.myBind({b: 2});
new t();*/
