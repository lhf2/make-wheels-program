/**
 *  object instanceof constructor
 *  用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 *  1. 普通类型、null返回 false
 *  2. 找 object 的原型链，只要原型链上有 constructor.prototype 就返回 true
 *     [] instanceof Array;  //true
 *     {} instanceof Object; //true
 */

function instanceOf(object, constructor) {
  // 普通值 或者 null 直接返回 false
  if ((typeof object != 'object' && typeof object != 'function') || object === null ) {
    return false
  }

  var objProto = object.__proto__;
  var conProto = constructor.prototype;

  while (true){
    // 查找原型链顶端，仍未查到，返回 false
    if(objProto === null) return false;
    // 找到了原型链
    if(objProto === conProto) return true
    objProto = objProto.__proto__;
  }
}

console.log(instanceOf([], Object));
console.log(instanceOf([], Array));