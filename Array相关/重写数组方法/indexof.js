/**
 * indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 * arr.indexOf(searchElement, [formIndex]);
 * 1. searchElement 要查找的元素
 * 2. fromIndex 开始查找的位置
 *    - 如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。
 *    - 如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。
 *    - 如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.
 */

Array.prototype.myIndexOf = function (findVal, beginIndex = 0) {
  var _arr = this;
  if (beginIndex > _arr.length || _arr.length < 1 || !findVal) {
    return -1
  }
  beginIndex = beginIndex < 0 ? _arr.length + beginIndex < 0 ? 0 : _arr.length + beginIndex : beginIndex;
  for (var i = beginIndex; i < _arr.length; i++) {
    if (_arr[i] === findVal) return i
  }
  return -1;
}

console.log([1,2,3,4].indexOf());
console.log([1,2,3,4].myIndexOf());
console.log([1,2,3,4].indexOf(4,-1));
console.log([1,2,3,4].myIndexOf(4,-1));
console.log([1,2,3,4,5,6].indexOf(4,-8));
console.log([1,2,3,4,5,6].myIndexOf(4,-8));
