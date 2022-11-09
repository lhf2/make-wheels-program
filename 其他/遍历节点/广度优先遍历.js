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
 * 广度优先遍历 - 队列
 * @param root dom node
 */
function breadthFirstTraverse(root) {
    const queue = []
    // 根结点入队
    queue.unshift(root)
    // queue.push(root)

    while (queue.length > 0) {
        // 取出根结点
        const curNode = queue.pop()
        // const curNode = queue.shift()
        if(curNode == null) break

        visitNode(curNode)

         // 子节点入队
        const childNodes = curNode.childNodes
        if (childNodes.length > 0) {
            childNodes.forEach(child => {
                queue.unshift(child)
                // queue.push(child)
            })
        }
    }
}