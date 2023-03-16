/**
 * p.finally(onFinally);
 * finally() 方法返回一个Promise。
 * 在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
 */

Promise.prototype.finally = function (cb) {
  return this.then((value) => {
    return Promise.resolve(cb()).then(function (){
      return value;
    })
  }, (err) => {
    return Promise.resolve(cb()).then(function () {
      throw err
    })
  })
}

// test
function p1(){
  return new Promise((resolve, reject) => {
      setTimeout(()=>{
          resolve('p1')
      }, 2000)
  })
}

function p2(){
  return new Promise((resolve, reject) => {
      // reject('p2 reject')
      resolve('p2 resolve')
  })
}

p2().finally(()=>{
  console.log('finally')
  return p1()
}).then(value => {
  console.log(value) // 2秒后输出 p2 resolve
}, reason => {
  console.log(reason);
})
