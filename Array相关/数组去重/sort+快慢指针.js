function unique(arr) {
  arr.sort((a, b) => a - b);
  // [1, 1, 2, 2, 3, 4, 5, 5, 6, 6]
  var slow = 1;
  var fast = 1;
  while (fast < arr.length) {
    if (arr[fast] != arr[fast - 1]) {
      arr[slow] = arr[fast];
      slow++;
    }
    fast++;
  }
  arr.length = slow;
  return arr
}

console.log(unique([1, 4, 2, 5, 6, 3, 2, 5, 6, 1]));