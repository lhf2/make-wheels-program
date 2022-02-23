/**
 * fn.apply(thisArg, [arg1, arg2, ..])：thisArg 是可选的; 参数是数组或类数组
 * 1. 函数 fn 立即执行；
 * 2. 修改 fn 里面的 this 为 thisArg || window;
 * 3. 如果第二个参数不传或者传的不是数组：
 *    - 传的是普通类型： string | boolean | number | symbol
 *      报错：Uncaught TypeError: CreateListFromArrayLike called on non-object
 *    - 传的是 undefined | null | {} | [] | function(){} | 不传： 直接执行 fn，不传参数
 *    - 传的是数组:
 *      - 传多个数组：[1,2,3], [4,5,6], 只取第一个数组
 */

Function.prototype.myApply = function (thisArg, args) {
  thisArg = thisArg ? Object(thisArg) : window;
  // 这样调用 thisArg.originFn 的时候 就是调用 fn, fn 的 this 也指向了 thisArg；
  thisArg.originFn = this;

  // 处理参数
  if (typeof args != 'object' && typeof args != 'function' && typeof args != 'undefined') {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }

  if (!args || typeOf(args) != 'Array') {
    return thisArg.originFn();
  }

  var result = eval('thisArg.originFn(' + args + ')');
  delete thisArg.originFn;
  return result;
}

function typeOf(val) {
  if (val == null) {
    return null
  }

  return typeof val === 'object' ? {
    "[object Object]": "Object",
    "[object Array]": 'Array',
    "[object Number]": 'Number',
    "[object String]": 'String',
    "[object Boolean]": 'Boolean',
    "[object Symbol]": 'Symbol',
  }[({}).toString.call(val)] : typeof val;
}


/*
// 测试代码：
function test(){
  console.log(this);
  console.log(arguments)
}
test.myApply({a: 1, b: 2}, [1,2,3], [4,5,6]);*/
