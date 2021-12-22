const MyPromise = require('./myPromise');

/*
// ------------------------ 基本的demo ------------------------
// resolve
let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});
promise.then((value) => {
  console.log('fulfilled: ' + value); //fulfilled: 成功了
}, (reason => {
  console.log('rejected: ' + reason);
}));

// reject
let promise1 = new MyPromise((resolve, reject) => {
  reject('失败了');
});
promise1.then((value) => {
  console.log('fulfilled: ' + value);
}, (reason => {
  console.log('rejected: ' + reason); //rejected: 失败了
}));


// throw 抛出异常
let promise2 = new MyPromise((resolve, reject) => {
  throw new Error('exception：失败了')
});
promise2.then((value) => {
  console.log('fulfilled: ' + value);
}, (reason => {
  console.log('rejected: ' + reason); //rejected: Error: exception：失败了
}));*/

// ------------------------ 支持异步  ------------------------
/*let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功了');
  }, 2000)
});

promise.then((value) => {
  console.log('fulfilled1: ' + value); //fulfilled1: 成功了
}, (reason) => {
  console.log('rejected1: ' + reason);
});

promise.then((value) => {
  console.log('fulfilled2: ' + value); //fulfilled2: 成功了
}, (reason) => {
  console.log('rejected2: ' + reason);
});*/

// ------------------------ 链式调用  ------------------------

// 1. then 返回的 promise2 返回自己
/*let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});

let promise2 = promise.then((value => {
  return promise2
}));

promise2.then((value) =>{
  console.log('value：' + value);
}, (reason)=>{
  console.log('reason：' + reason); // reason：TypeError: Chaining cycle detected for promise #<Promise>
});*/

// 2. return 一个普通值
/*let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});

promise.then((value) => {
  return value
}).then((value) => {
  console.log(value); //'成功了'
});*/

// 3. return 一个 new promise
/*let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});
promise.then((value) => {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}).then((value) => {
  console.log(value); //'成功了'
});*/

// 4. 支持异步
/*let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});
promise.then((value) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(()=>{
      resolve(value);
    }, 2000)
  })
}).then((value) => {
  console.log(value); //'成功了'
});*/

// 5. return promise 嵌套
/*let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});
promise.then((value) => {
  return new MyPromise((resolve, reject) => {
    resolve(new MyPromise((resolve, reject)=>{
      resolve(value)
    }));
  })
}).then((value) => {
  console.log(value); //'成功了'
});*/

// 6. then走了失败回调后在走then
/*let promise = new MyPromise((resolve, reject) =>{
  reject('失败了');
});
promise.then((value)=>{
  console.log('value: ' + value);
}, (reason)=>{
  console.log('reason: ' + reason); //reason: 失败了
}).then((value)=>{
  console.log('then value：' + value); //then value：undefined
});*/

// 7. then中抛出异常
/*let promise = new MyPromise((resolve, reject) =>{
  resolve('成功了');
});
promise.then((value)=>{
  throw new Error('then错误');
  console.log('value: ' + value); // 注意：这里不打印
}, (reason)=>{
  console.log('reason: ' + reason);
}).then((value)=>{
  console.log('then value：' + value);
}, (reason)=>{
  console.log('then reason: ' + reason); //then reason: Error: then错误
});*/

// 8. 多次then
/*let promise = new MyPromise((resolve, reject) =>{
  resolve('成功了');
});
promise.then().then().then().then((value)=>{
  console.log(value); //成功了
});*/

// 9. 实现catch
/*let promise = new MyPromise((resolve, reject) =>{
  throw new Error('error')
});
promise.then((value)=>{
  console.log('value: ' + value);
}).catch((e)=>{
  console.log('catch：' + e); //catch：Error: error
});*/

