// promise states
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

function resolvePromise(promise2, x, resolve, reject) {
  // 如果 promise2 跟 x 是同一个对象，报错TypeError
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  // 区分普通值 跟 promise
  let called = false;
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 认为是promise
        then.call(x, (y) => {
          if (called) return;
          called = true;
          // 有可能里面还是 promise 需要递归调用
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        // 普通值
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }

  } else {
    // 普通值
    resolve(x)
  }
}


class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 为什么要在这里定义resolve, reject。如果定义在下面相当于是在原型上面定义。
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 如果抛出错误 捕获错误执行reject
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled onRejected 是可选的，设置默认值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
    let promise2 = new MyPromise((resolve, reject) => {
      // 根据 state 来判断处理哪个回调函数
      if (this.status === FULFILLED) {
        // 异步调用 此处为了方便用宏任务 源码是用的微任务
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else if (this.status === PENDING) {
        // 支持异步 使用发布订阅模式
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }

        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }

        })
      }
    });

    return promise2;

  }

  catch(errorCallback){
    return this.then(null, errorCallback);
  }
}

module.exports = MyPromise;
