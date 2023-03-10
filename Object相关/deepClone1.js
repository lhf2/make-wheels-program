// 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况
// 用 getOwnPropertySymbols 可以获取 symbol key 可以解决问题 Symbol 的拷贝情况
// 用集 合记忆曾经遍历过的对象可以解决循环引用的问题
function deepCopy(target, cache = new Set()) {
    // 普通类型
    if (typeof target !== 'object' || cache.has(target)) {
        return target
    }
    // 数组类型
    if (Array.isArray(target)) {
        target.map(t => {
            cache.add(t)
            return t
        })
    } else {
        // 对象类型
        return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].reduce((res, key) => {
            cache.add(target[key])
            res[key] = deepCopy(target[key], cache)
            return res
        }, 
        target.constructor !== Object ? Object.create(target.constructor.prototype) : {})
    }
}