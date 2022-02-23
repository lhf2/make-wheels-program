function unique(arr) {
  var map = new Map();
  let uniqueArr = [];
  for (var i = 0; i < arr.length; i++) {
    if(map.has(arr[i])){
      map.set(arr[i], true)
    }else{
      map.set(arr[i], false)
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}
console.log(unique([1,4,2,6,4,2,3,5]));