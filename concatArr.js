// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，
// 合并 为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。

function concatArr(arr1, arr2) {
    const arr = [...arr1]; 
    let currIndex = 0; 
    for (let i = 0; i < arr2.length; i++) {
        const RE = new RegExp(arr2[i]) 
        while (currIndex < arr.length) { 
            currIndex++ 
            // 不符合条件  
            if (!RE.test(arr[currIndex])) { 
                arr.splice(currIndex, 0, arr2[i]) 
                break; 
            } 
        }
    } 
    return arr
}

let a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D']
let result = concatArr(a1, a2)
console.log(result) // [ 'A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']