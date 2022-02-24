/**
 *  Promise.race(iterable)
 *  方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
 */
Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(p => {
      Promise.resolve(p).then(val => {
        resolve(val)
      }, err => {
        reject(err);
      })
    })
  })
}