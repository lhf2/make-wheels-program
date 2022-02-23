/**
 * arr.find(callback(cur, index, arr), thisArg); 返回数组中满足提供的测试函数的第一个元素的值；
 * 1. cur：正在处理的元素；
 * 2. index：正在处理的当前元素索引；
 * 3. array：正在操作的数组；
 * 4. thisArg：callback 函数的 this 值，不传默认为 window
 */

Array.prototype.myFind = function (cb) {
  var _arr = this, thisArg = arguments[1] || window;
  for (var i = 0; i < _arr.length; i++) {
    if (cb.apply(thisArg, [_arr[i], i, _arr])) {
      return _arr[i]
    }
  }
  return undefined
}