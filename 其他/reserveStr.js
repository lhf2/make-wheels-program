// 用 JavaScript 写一个函数，
// 输入 int 型，返回整数逆序后的字符串。
// 如：输入 整型 1234，返回字符串“4321”。
// 要求必须使用递归函数调用，不能用全局变量， 输入函数必须只有一个参数传入，必须返回字符串

function reserveStr(num) {
    let num1 = num / 10
    let num2 = num % 10
    if (num1 < 1) {
        // 单个数字
        return num
    } else {
        num1 = Math.floor(num1)
        return `${num2}${reserveStr(num1)}`
    }
}
let a = reserveStr(12345) //"54321"
console.log(a)
console.log(typeof a) // string