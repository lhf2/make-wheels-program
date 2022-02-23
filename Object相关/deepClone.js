/**
 * 1. 解决循环引用问题：创建一个 WeakMap，记录下已经拷贝过的对象，如果已经拷贝过，直接返回它；
 * 2. 可拷贝特殊对象；分为可遍历的、不可遍历的；
 * 3. 拷贝函数：箭头函数 直接返回；
 */
function deepClone(origin, hashMap = new WeakMap()) {
  // 如果是 null、undefined、原始值、function
  if (origin === undefined || typeof origin != 'object') {
    return origin
  }

  if(origin instanceof Date){
    return new Date(origin)
  }
  if(origin instanceof RegExp){
    return new RegExp(origin)
  }

  // 如果 weakMap 中有此值，直接返回，不必在深拷贝。防止互相修改造成死循环
  // let test1 = {}; let test2 = {}; test2.test1 = test1; test1.test2 = test2; deepClone(test2);
  const hashKey = hashMap.get(origin);
  if(hashKey){
    return hashKey
  }

  // 对象 或 数组
  const target = new origin.constructor();
  hashMap.set(origin, target);
  for (var k in origin){
    if(origin.hasOwnProperty(k)){
      target[k] = deepClone(origin[k], hashMap)
    }
  }

  return target;
}
