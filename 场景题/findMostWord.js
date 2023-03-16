// 查找文章中出现频率最高的单词
function findMostWord(article) {
    // 合法性判断
    if (!article) return
    // 参数处理
    article = article.trim().toLowerCase()
    // 获取到所有的单词
    let wordList = article.match(/[a-z]+/g)
    // 已经出现过的单词集合
    let visitedMap = new Map()
    // 出现最多的次数以及单词
    let maxNum = 0
    let maxWord = ''
    wordList.forEach(word => {
        if (!visitedMap.has(word)) {
            visitedMap.set(word, 1)
        } else {
            let num = visitedMap.get(word)
            visitedMap.set(word, num + 1)
        }
    });
    // 循环找到最多的单词跟次数
    for (let [word, num] of visitedMap) {
        if (num > maxNum) {
            maxNum = num
            maxWord = word
        }
    }
    return maxWord + "  " + maxNum
}

// article 4
console.log(findMostWord('function findMostWord(article)  { async await article function function'))