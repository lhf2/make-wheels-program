function unique(arr){
  var newArr = [];
  for (var i = 0; i < arr.length; i++){
    if(newArr.indexOf(arr[i]) == -1){
      newArr.push(arr[i])
    }
  }
  return newArr
}

console.log(unique([1,4,2,3,1,6,7,2,4]))