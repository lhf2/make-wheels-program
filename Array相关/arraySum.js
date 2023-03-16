// 求和
let arr = [1,2,3,4,5,6,7,8,9,10]
let sum = arr.reduce((prev, cur) => prev += cur ,0)
console.log('sum', sum);


let arr1 = [1, 2, 3, [[4, 5], 6], 7, 8, 9, 10]
let sum1 = arr1.toString().split(",").reduce((prev, cur) => prev += Number(cur), 0)
console.log('sum', sum1);
