/**
 * Promise.allSettled()
 * 1. 接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。
 * 2. 只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更。
 * 3. 该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是fulfilled，不会变成rejected。
 * 状态变成fulfilled后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。
 * 格式为：
 * {status: 'fulfilled', value: value} 或 {status: 'rejected', reason: reason}；
 */

Promise.allSettled = function (promises) {
  if (promises.length === 0) return Promise.resolve([]);

  let _promise = promises.map(
    item => item instanceof Promise ? item : Promise.resolve(item)
  );

  return new Promise((resolve, reject) => {
    const result = [];
    let promisesCount = _promise.length;

    _promise.forEach((promise, index) => {
      promise.then((value) => {
        result[index] = {
          status: 'fulfilled',
          value: value
        }
      }, (reason) => {
        result[index] = {
          status: 'rejected',
          reason: reason
        }
      }).finally(() => {
        promisesCount -= 1;
        if (promisesCount === 0) {
          resolve(result)
        }
      })
    })
  })
}