/**
 * promise.all(iterable) : 一个可迭代对象，如 Array 或 String。
 * 1. 返回一个新的 promise;
 * 2. 如果传入的参数为空，同步的返回一个 resolved 状态的 promise;
 *    如果传入的 promise 都变成了完成状态，Promise.all 返回的 promise 异步地变为完成。结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。
 *    如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。
 */

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError("promises must be an array")
    }

    let result = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((res) => {
        result[index] = res;
        count++;
        count === promises.length && resolve(result);
      }, (err) => {
        reject(err)
      })
    })
  })
}


// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(3)
  }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})