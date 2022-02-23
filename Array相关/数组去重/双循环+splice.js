function unique(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if(arr[i] === arr[j]){
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr
}

console.log(unique([1,2,4,5,3,2,5,1,4,2,1,4,1,6,8,3]));