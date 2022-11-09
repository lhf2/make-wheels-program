/**
 * 发布订阅模式 拆分保存 on 和 once 事件
 */
class EventEmitter {
    constructor() {
        this.events = {}
        this.onceEvents = {}
    }

    on(type, fn) {
        const events = this.events
        if (events[type] === null) events[type] = []
        events[type].push(fn)
    }

    once(type, fn) {
        const onceEvents = this.onceEvents
        if (onceEvents[type] === null) onceEvents[type] = []
        onceEvents[type].push(fn)
    }

    off(type, fn) {
        const events = this.events
        const onceEvents = this.onceEvents
        // 如果没有 fn, 则解绑所有 type 的函数
        if (!fn) {
            events[type] = []
            onceEvents[type] = []
        } else {
            // 解绑单个 fn
            const fnList = events[type]
            const onceFnList = onceEvents[type]

            // 使用过滤
            if (fnList) {
                events[type] = fnList.filter(item => item.fn !== fn)
            }

            if (onceFnList) {
                onceEvents[type] = onceFnList.filter(item => item.fn !== fn)
            }
        }
    }

    emit(type, ...args) {
        const fnList = this.events[type]
        const onceFnList = onceEvents[type]

        if (fnList) {
            fnList.forEach(f => f(...args))
        }

        if (onceFnList) {
            onceFnList.forEach(f => f(...args))

            // once 执行一次就删除
            this.onceEvents[type] = []
        }
    }
}