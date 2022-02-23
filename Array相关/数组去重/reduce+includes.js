function unique(arr){
  return arr.reduce((acc, cur, idx, arr)=>{
    if(!acc.includes(cur)){
      acc.push(cur);
    }
    return acc;
  },[])
}

console.log(unique([1, 4, 2, 5, 6, 3, 2, 5, 6, 1]));