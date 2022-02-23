/**
 * arr.reduce(callback(acc, cur, index, arr), [initialValue]);
 * 1. acc：累计器累计回调的返回值；它是上一次调用回调时返回的累积值，或initialValue
 * 2. cur：正在处理的元素；
 * 3. index：正在处理的当前元素索引；
 * 4. array：正在操作的数组；
 * 5. initialValue：作为第一次调用 callback 函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 */
Array.prototype.myReduce = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  // 在空数组上调用 reduce 且未提供初始值 报类型错误
  if (!_len && !arguments[1]) {
    return new TypeError('Reduce of empty array with no initial value');
  }

  var _initialValue = arguments[1] || _arr[0];
  // 如果传了initialValue 就从第0位开始，如果没传从第1位开始;
  var i = arguments[1] ? 0 : 1;
  for (i; i < _len; i++) {
    _initialValue = cb(_initialValue, _arr[i], i, _arr);
  }
  return _initialValue;
}
