/**
 *  object instanceof constructor
 *  用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 *  1. 普通类型、null返回 false
 *  2. 找 object 的原型链，只要原型链上有 constructor.prototype 就返回 true
 *     [] instanceof Array;  //true
 *     {} instanceof Object; //true
 */


function myInstanceOf(instance, origin) {
  // 普通值 或者 null undefined 直接返回 false
  if ((typeof instance != 'object' && typeof instance != 'function') || instance == null) {
      return false
  }
  // 获取对象的原型
  let proto = Object.getPrototypeOf(instance)
  // 获取构造函数的 prototype 对象
  let prototype = origin.prototype
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (proto != null) {
      if (proto === prototype) {
          return true
      }
      proto = Object.getPrototypeOf(proto)
  }
  return false
}


/************************************************** */
 function myInstanceOf(instance, origin) {
  // 普通值 或者 null undefined 直接返回 false
  if ((typeof instance != 'object' && typeof instance != 'function') || instance == null) {
    return false
  }

  // 为了防止修改 instance
  let tempInstance = instance
  while (tempInstance) { // 查到原型链顶端：object.prototype = null 的时候就会跳出循环
    if (tempInstance.__proto__ === origin.prototype) {
      return true // 配上了
    }
    // 未匹配
    tempInstance = tempInstance.__proto__ // 顺着原型链，往上找
  }
  return false
}

console.log(myInstanceOf([], Object)); //true
console.log(myInstanceOf([], Array)); //true
