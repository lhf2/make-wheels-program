// 实现数组乱序输出

// 1. 主要的实现思路就是：

// 取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。
// 第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换
// 按照上面的规律执行，直到遍历完成

var arr = [1,2,3,4,5,6,7,8,9,10];

for(let i = 0 ; i< arr.length; i++){
    const randomIndex = Math.round(Math.random() * arr.length - 1 - i) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
}
console.log(arr)

// 2. 倒序遍历
let length = arr.length
while(length){
    const randomIndex = Math.floor(Math.random() * length--);
    [arr[length], arr[randomIndex]] = [arr[randomIndex], arr[length]]
}
console.log(arr)
