/**
 * tree -> arr
 * @param {*} root 
 */

function convert(root){
    const res = []

    // node -> parent 的对应关系
    const nodeToParent = new Map()

    // 广度优先遍历
    const queue = []
    queue.push(root)

    while(queue.length > 0){
        const curNode = queue.shift()
        if (curNode == null) break
        
        const {id, name, children = []} = curNode

        // 创建数组 item 并 push
        const parentNode = nodeToParent.get(curNode)
        const parentId = parentNode?.id || 0
        const item = { id, name, parentId }
        res.push(item)

        // 循环子节点
        children.forEach(child => {
            // 映射 parent
            nodeToParent.set(child, curNode)
            // 子节点入队
            queue.push(child)
        });

    }
    return res
}


const obj = {
    id: 1,
    name: '部门A',
    children: [
        {
            id: 2,
            name: '部门B',
            children: [
                { id: 4, name: '部门D' },
                { id: 5, name: '部门E' }
            ]
        },
        {
            id: 3,
            name: '部门C',
            children: [
                { id: 6, name: '部门F' }
            ]
        }
    ]
}
const arr1 = convert(obj)
console.info(arr1)