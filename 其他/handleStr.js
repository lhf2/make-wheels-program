// 去除字符串中出现次数最少的字符，不改变原字符串的顺序
function handleStr(str) {
    let i = 0
    let len = str.length
    let map = new Map()
    let ret = ''
    // 设置 字符 - 次数 的 map
    while (i < len) {
        let count = map.get(str[i]) || 0
        map.set(str[i], count + 1)
        i++
    }

    // 获取最少出现的字符数
    let arr = Array.from(map)
    // 升序排列
    arr.sort((a, b) => {
        return a[1] - b[1]
    })
    let minVal = arr[0][1]

    // 循环进行判断是否是出现最少的字符 使用正则进行替换
    for (let item of str) {
        let count = map.get(item)
        if (count === minVal) {
            let reg = new RegExp(item, "g")
            str = str.replace(reg, "")
        }
    }
    return str
}


console.log(handleStr('aaabbbceeffc'))
console.log(handleStr('ababacdd'))
