/**
 * new 是一个关键字。做了什么？ new Fn(arg1，arg2)
 * 1. 创建一个新的对象 obj；
 * 2. 设置obj.__proto__ = fn.prototype;
 * 3. 执行 fn 里面的代码，添加属性和方法到 obj 上；
 * 5. 如果函数返回值为对象，直接返回对象；否则返回 obj
 */

function myNew(Fn) {
  var obj = {};
  obj.__proto__ = Fn.prototype;
  var args = [].slice.call(arguments, 1);
  var res = Fn.apply(obj, args);
  return typeof res === 'object' && typeof res != null ? res : obj;
}


function customNew(constructor, ...args){
  // 1. 创建一个空对象，继承 constructor 的原型
  const obj = Object.create(constructor.prototype)
  // 2. 将 obj 作为 this ，执行 constructor ，传入参数
  constructor.apply(obj, args)
  // 3. 返回 obj
  return obj
}