function unique(arr) {
  arr.sort((a, b) => a - b);
  let slow = 0, fast = 0
  while (fast <= arr.length) {
    if (arr[slow] != arr[fast]) {
      slow++
      arr[slow] = arr[fast]
    }
    fast++
  }
  arr.length = slow
  return arr
  // return arr.slice(0, slow)
}

console.log(unique([1, 4, 2, 5, 6, 3, 2, 5, 6, 1]));