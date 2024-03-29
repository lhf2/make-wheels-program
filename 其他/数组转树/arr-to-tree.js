/**
 * arr -> tree
 * @param {*} root 
 */

function convert(arr) {
    // 用于 id 和 treeNode 的映射
    const idToTreeNode = new Map()

    let root = null

    arr.forEach(item => {
        const { id, name, parentId } = item

        // 定义 tree node 并加入 map
        const treeNode = { id, name }
        idToTreeNode.set(id, treeNode)

        // 找到 parentNode 并加入到它的 children
        const parentNode = idToTreeNode.get(parentId)
        if (parentNode) {
            if (parentNode.children == null) parentNode.children = []
            parentNode.children.push(treeNode)
        }

        // 找到根结点
        if (parentId === 0) root = treeNode
    });
    return root
}

/****************************************************************************************/
function jsonToTree(data) {
    let ret = []
    let map = new Map()
    data.forEach(item => {
        map.set(item.id, item)
    });
    data.forEach(item => {
        let parent = map.get(item.pid)
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            ret.push(item)
        }
    })

    return ret
}

// test
const arr = [
    { id: 1, name: '部门A', parentId: 0 }, // 0 代表顶级节点，无父节点
    { id: 2, name: '部门B', parentId: 1 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 2 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
]
const tree = transTree(arr)
console.info(tree)