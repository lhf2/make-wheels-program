// 输入字符串s，以及其重复的次数，输出重复的结果，例如输入abc，2，输出abcabc。
function repeat(s, n) {
    return (new Array(n + 1)).join(s)
}

// 递归实现
function repeat(s, n) {
    return (n > 0) ? s.concat(repeat(s, --n)) : ""
}

// 迭代实现
function repeate(s, n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += s
    }
    return str
}
