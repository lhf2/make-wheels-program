function unique(arr) {
  return arr.filter(function (item, index, arr) {
    // const arr = [1,1,2,1,3]
    // arr.indexOf(arr[0]) === 0 // 1 的第一次出现
    // arr.indexOf(arr[1]) !== 1 // 说明前面曾经出现过1
    return arr.indexOf(item) === index;
  })
}
console.log(unique([1, 4, 2, 5, 6, 3, 2, 5, 6, 1]));