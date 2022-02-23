/**
 * arr.forEach(callback(cur, index, arr), thisArg);
 * 1. cur：正在处理的元素；
 * 2. index：正在处理的当前元素索引；
 * 3. array：正在操作的数组；
 * 4. thisArg：callback 函数的 this 值，不传默认为 window
 */

Array.prototype.myForEach = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  // this 指向
  var _arg2 = arguments[1] || window;

  for (var i = 0; i < _len; i++) {
    cb.apply(_arg2, [arr[i], i, _arr]);
  }
}