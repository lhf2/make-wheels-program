/**
 * Promise.any()
 * 1. 该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
 * 2. 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
 */
Promise.any = function (promiseArr){
  let index = 0;
  return new Promise((resolve, reject) => {
    if(promiseArr.length === 0) {
      reject(new AggregateError('All promises were rejected'));
    }
    promiseArr.forEach((p, i)=>{
      Promise.resolve(p).then((value)=>{
        resolve(value);
      },(err)=>{
        index++;
        if(index === promiseArr.length){
          reject(new AggregateError('All promises were rejected'));
        }
      })
    })
  })
}