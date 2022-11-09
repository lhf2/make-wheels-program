/**
 * 普通的发布订阅 没有 once 方法，在 on 中做判断；
 * this.cache = {
 *    "key": [fn1, fn2]
 * }
 */
class EventEmitter {
  constructor() {
    this.cache = {}
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }

  off(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex(f => f === fn);
      if (index >= 0) {
        // 减少使用 splice，性能很差
        tasks.splice(index, 1)
      }
    }
  }

  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      let tasks = this.cache[name].slice()
      for (const fn of tasks) {
        fn(...args)
      }
      // 如果是 once 为 true，执行完之后要删除，否则下次还会执行
      if (once) {
        delete this.cache[name];
      }
    }
  }
}