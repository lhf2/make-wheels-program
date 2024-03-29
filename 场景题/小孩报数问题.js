// 有30个小孩儿，编号从1-30，围成一圈依此报数，
// 1、2、3 数到 3 的小孩儿退出这个圈， 
// 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
function childNum(num, count) {
    let allplayer = []
    for (let i = 0; i < num; i++) {
        allplayer[i] = i + 1
    }

    let exitCount = 0;    // 离开人数
    let counter = 0;      // 记录报数
    let curIndex = 0;     // 当前下标

    while (exitCount < num - 1) {
        if (allplayer[curIndex] !== 0) counter++;
        // 该退圈了
        if (counter == count) {
            // 方便后续做判断（退圈的变为0）
            allplayer[curIndex] = 0
            counter = 0
            exitCount++
        }
        curIndex++
        // 是个环
        if (curIndex == num) {
            curIndex = 0
        }
    }
    for (i = 0; i < num; i++) {
        if (allplayer[i] !== 0) {
            return allplayer[i]
        }
    }
}

console.log(childNum(30, 3)) //29