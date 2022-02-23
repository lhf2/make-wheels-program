/**
 * arr.some(callback(cur, index, arr), thisArg); 返回一个布尔值；
 * 1. cur：正在处理的元素；
 * 2. index：正在处理的当前元素索引；
 * 3. array：正在操作的数组；
 * 4. thisArg：callback 函数的 this 值，不传默认为 window
 */

Array.prototype.mySome = function (cb){
  var _arr = this, thisArg = arguments[1] || window, res = [];
  for (var i = 0; i < _arr.length; i++) {
    if(cb.apply(thisArg, [_arr[i], i, _arr])){
      return true;
    }
  }
  return false;
}