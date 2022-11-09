// const lruCache = new LRUCache(2)
// lruCache.set('1', 1) // {1=1}
// lruCache.set('2', 2) // {1=1, 2=2}
// console.info(lruCache.get('1')) // 1 {2=2, 1=1}
// lruCache.set('3', 3) // {1=1, 3=3}
// console.info(lruCache.get('2')) // null
// lruCache.set('4', 4) // {3=3, 4=4}
// console.info(lruCache.get('1')) // null
// console.info(lruCache.get('3')) // 3 {4=4, 3=3}
// console.info(lruCache.get('4')) // 4 {3=3, 4=4}

/**
 *  LRU - MAP 的方式
 */

class LRUCache {
    constructor(length) {
        if (length < 1) throw new Error('invalid length')
        this.length = length
        this.data = new Map()
    }
    set(key, value){
        const data = this.data
        
        // 放到优先位置，先删除后再存一次
        if(data.has(key)){
            data.delete(key)
        }
        data.set(key, value)

        // 判断是否超过了长度
        // 如果超出了容量，则删除 Map 最老的元素
        if(data.size > this.length){
            // 删除最开头的（很久没被访问的元素）
            const delKey = data.keys().next().value
            data.delete(delKey)
        }
    }
    get(key){
        const data = this.data

        if(!data.has(key)) return null

        const value = data.get(key)

        // 放到优先位置，先删除后再存一次
        data.delete(key)
        data.set(key, value)

        return value
    }
}