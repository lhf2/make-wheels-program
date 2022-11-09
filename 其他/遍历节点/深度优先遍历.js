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

    if(n instanceof Element){
         // element
         console.info('Element node ---', `<${n.tagName.toLowerCase()}>`)
    }
}

/**
 * 深度优先遍历 - 递归
 * @param root dom node
 */
function depthFirstTraverse1(root){
    visitNode(root)

    // 注意 childNodes（包括文本、注释） 跟 children 不一样（不包括文本、注释）
    const childNodes = root.childNodes
    if(childNodes.length){
        childNodes.forEach(child => {
            depthFirstTraverse1(child)
        })
    }
}


/**
 * 深度优先遍历 - 栈
 * @param root dom node
 */
function depthFirstTraverse2(root){
    const stack = []

    // 根结点压栈
    stack.push(root)

    while(stack.length){
        const curNode = stack.pop()// 出栈
        if(curNode === null) break

        // 访问节点
        visitNode(curNode)

        // 子节点入栈
        const childNodes = curNode.childNodes
        if(childNodes.length > 0){
            // reverse 反顺序压栈
            // 为什么反顺序压栈？因为栈，先进后出；在这里进的时候是push，出的时候是pop
            // 比如要想 pop 的时候访问顺序为【1，2，3，4】push 的时候必须是【4，3，2，1】
            Array.from(childNodes).reverse().forEach(child => stack.push(child))
        }
    }
}