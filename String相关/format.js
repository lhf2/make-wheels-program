// 将数字每千分位用逗号隔开
function format(n) {
    let num = n.toString()
    let decimals = ""
    // 判断是否有小数 存储小数点后面的数字
    decimals = num.indexOf('.') > -1 ? num.split('.')[1] : ''
    let _num = num.indexOf('.') > -1 ? num.split('.')[0] : num
    let len = _num.length
    let ret = ''
    if (len <= 3) {
        return _num
    } else {
        let remainder = len % 3
        // 不是3的整数倍 1,234,567
        if (remainder > 0) {
            ret = num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',')
        } else {
            // 是3的整数倍 123,456
            ret = num.slice(0, len).match(/\d{3}/g).join(',')
        }
    }
    return decimals ? `${ret}.${decimals}` : ret
}

console.log(format(12323.33)) // '12,323.33'
console.log(format(1232323)) // '1,232,323'
console.log(format(123232345)) // 123,232,345