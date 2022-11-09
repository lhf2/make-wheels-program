/**
 * 遍历 DOM tree
 */

/**
 * 访问节点
 * @param n node
 */
function visitNode(n) {
    if (n instanceof Comment) {
        // 注释
        console.info('Comment node ---', n.textContent)
    }

    if (n instanceof Text) {
        // 文本
        const t = n.textContent?.trim()
        if (t) {
            console.info('Text node ---', t)
        }
    }

    if (n instanceof Element) {
        // element
        console.info('Element node ---', `<${n.tagName.toLowerCase()}>`)
    }
}

/**
 * 生成器遍历 - 传入数组 [root]
 */
function* traverse(elemList) {
    for (let elem of elemList) {
        yield elem

        const childNodes = Array.from(elem.childNodes)
        if (childNodes.length) {
            yield* traverse(childNodes)
        }
    }
}