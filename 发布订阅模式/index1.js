/**
 * 发布订阅模式
 * {
 *    'key1': [
 *        { fn: fn1, isOnce: false },
 *        { fn: fn2, isOnce: false },
 *        { fn: fn3, isOnce: true },
 *    ]
 *    'key2': [] // 有序
 *    'key3': []
 * }
 */

class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(type, fn, isOnce = false) {
        const events = this.events
        if (events[type] === null) {
            // 初始化 key 的 fn 数组
            events[type] = []
        }
        events[type].push({
            fn,
            isOnce
        })
    }

    once(type, fn) {
        this.on(type, fn, true)
    }

    off(type, fn) {
        const events = this.events
        // 如果没有 fn, 则解绑所有 type 的函数
        if (!fn) {
            events[type] = []
        } else {
            // 解绑单个 fn
            const fnList = events[type]
            if (fnList) {
                // 使用过滤
                events[type] = fnList.filter(item => item.fn !== fn)
            }
        }
    }

    emit(type, ...args) {
        const fnList = this.events[type]
        if (fnList == null) return

        // 注意这里使用过滤的巧妙之处
        this.events[type] = fnList.filter(item => {
            const { fn, isOnce } = item
            fn(...args)

            // once 执行一次就要被过滤掉
            if (!isOnce) return true
            return false
        })
    }
}