# 基于Promises/A+规范手写实现promise
## 一：Promise 核心逻辑实现
```
const promise = new Promise((resolve, reject) => {
   resolve('success')
   reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})
```
### 先从原生的 promise 来分析一下【基本原理】
- promise 是一个类，接受一个执行器 executor。执行器在 new 的时候会立即执行。执行器接受两个参数，一个 resolve 方法, 一个 reject 方法；
- promise 的状态： pending、fulfilled(value)、rejected(reason)。只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。状态一旦更改就不会再变。
- promise 通过 resolve 和 reject 函数来更改状态；
- then 方法通过判断状态执行不同的回调函数：
	1. 接收两个可选参数：onFulfilled、onRejected；
	2. onFulfilled：promise 状态为 onFulfilled 的时候调用，value 值作为参数。
	3. onRejected： promise 状态为 onRejected 的时候调用，reason 值作为参数。
	
### 1. 支持resolve、reject、throw抛出异常
```
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
}));
```
#### 按照上面我们分析的基本原理来实现：
- 维护 promise 的状态
- 调用 resolve、reject 的逻辑
- then 根据状态判断走相应的回调函数

```
// promise states
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 为什么要在这里定义resolve, reject。如果定义在下面相当于是在原型上面定义。
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
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
      if (this.status === FULFILLED) {
        onFulfilled(this.value);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      }
  }
}

module.exports = MyPromise;
```
### 2. 支持异步以及 then 方法多次调用
```
let promise = new MyPromise((resolve, reject) => {
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
});
```
按照我们第一步实现的简单的 promise 来调用这段程序，没有任何反应；

我们来分析一下出现的问题：因为 setTimeout 是异步的，then 执行的时候 setTimeout 里面的 resolve 还没有执行，此时状态是 pending ，然而之前的时候 then 里面并没有判断这个状态；

####  我们需要修改一下之前的代码，加入 then 处理 pending 的逻辑
- 可以使用发布订阅的模式，在 then 的时候订阅所有成功的、失败的回调函数
- 在 resolve 的时候进行发布，循环按顺序执行所有成功的回调
- 在 reject 的时候进行发布，循环按顺序执行所有失败的回调

```
class MyPromise {
  constructor(executor) {
    // --------------- 新增的 ---------------
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        //  --------------- 新增的 --------------- 
        // 发布
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        //  --------------- 新增的 --------------- 
        // 发布
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    ............
 }
 
 then(onFulfilled, onRejected) {
 	if(this.status === FULFILLED){
 		......
 	}else if (this.status === REJECTED){
 		......
 	//  --------------- 新增的 --------------- 
 	} else if (this.status === PENDING) {
        // 支持异步 使用发布订阅模式
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason);
        })
      }
 }
```

### 3. 支持链式调用
- then 必须返回一个promise 才能支持链式调用

```
 then(onFulfilled, onRejected) {
    //  --------------- 新增的 ---------------
    let promise2 = new MyPromise((resolve, reject) => {});
    return promise2;
 }
```
- onFulfilled、onRejected 返回一个值 x ，后续通过 resolvePromise 对 x 进行处理；onFulfilled、onRejected 都必须 try.. catch 捕获错误；

```
then(onFulfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
      	  //  --------------- 新增的 ---------------
        try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
      } else if (this.status === REJECTED) {
      	  //  --------------- 新增的 ---------------
        try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
         }
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          //  --------------- 新增的 ---------------
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        });
        this.onRejectedCallbacks.push(() => {
          //  --------------- 新增的 ---------------
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
```
- x 可能是普通值， 也可能是一个 new promise，需要在 resolvePromise 中进行处理；

```
function resolvePromise(promise2, x, resolve, reject) {}
```
#### demo1: then 方法链式调用识别 Promise 是否返回自己， 需要报错 TypeError
```
let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});

let promise2 = promise.then((value => {
  return promise2
}));

promise2.then((value) =>{
  console.log('value：' + value);
}, (reason)=>{
  console.log('reason：' + reason); // reason：TypeError: Chaining cycle detected for promise #<Promise>
});
```
会报错：ReferenceError: Cannot access 'promise2' before initialization；

这是因为在调用 resolvePromise 的时候需要传 promise2，此时 promise2 还没有完成初始化。 这个时候我们就要用上宏微任务和事件循环的知识了，这里就需要创建一个异步函数去等待 promise2 完成初始化。为了方便这里我们使用宏任务，源码实现肯定是用的微任务；

```
let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //  --------------- 新增的 ---------------
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
       //  --------------- 新增的 ---------------
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0);
```

通过原生的 promise 执行上述 demo 代码会报错： UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>

```
function resolvePromise(promise2, x, resolve, reject) {
   //  --------------- 新增的 ---------------
  // 如果 promise2 跟 x 是同一个对象，报错TypeError
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
} 
```
#### demo2: then 方法 return 一个普通值 或 一个 new promise
```
// return 一个普通值
let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});

promise.then((value) => {
  return value
}).then((value) => {
  console.log(value); //'成功了'
});

// return 一个 new promise
let promise = new MyPromise((resolve, reject) => {
  resolve('成功了');
});
promise.then((value) => {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}).then((value) => {
  console.log(value); //'成功了'
});

// 支持异步
let promise = new MyPromise((resolve, reject) => {
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
});
```

根据 Promises/A+ 规范可知：怎么才被认为是一个 promise?

x是一个 object or function， x 有 then 属性，x.then 是一个方法；

如果是 promise 的话，执行 new promise 的 then 方法；普通值的话直接 resolve 方法；

```
function resolvePromise(promise2, x, resolve, reject) {
  //  --------------- 新增的 ---------------
  // 区分普通值 跟 promise
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 认为是promise
        then.call(x, (y) => {
          resolve(y); 
        }, (r) => {
          reject(r);
        })
      } else {
        // 普通值
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }

  } else {
    // 普通值
    resolve(x)
  }
}
```

#### demo3：支持 return new promise 嵌套
```
let promise = new MyPromise((resolve, reject) => {
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
});
```
如果是 new promise 的时候，需要递归处理；

不能多次调用 then 方法里面的成功、失败回调；通过 called 来处理；

```
//  --------------- 新增的 ---------------
let called = false;
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
           //  --------------- 新增的 ---------------
          if (called) return;
          called = true;
          // 有可能里面还是 promise 需要递归调用
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
            //  --------------- 新增的 ---------------
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        // 普通值
        resolve(x)
      }
    } catch (e) {
     //  --------------- 新增的 ---------------
      if (called) return;
      called = true;
      reject(e)
    }

  } else {
    // 普通值
    resolve(x)
  }
```

#### demo4：支持多次 then
```
let promise = new MyPromise((resolve, reject) =>{
  resolve('成功了');
});
promise.then().then().then().then((value)=>{
  console.log(value); //成功了
});
```
onFulfilled、onRejected 是两个可选的参数；需要设置默认值；

```
then(onFulfilled, onRejected) {
    //  --------------- 新增的 ---------------
    // onFulfilled onRejected 是可选的，设置默认值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
```

#### demo5：支持 catch
```
let promise = new MyPromise((resolve, reject) =>{
  throw new Error('error')
});
promise.then((value)=>{
  console.log('value: ' + value);
}).catch((e)=>{
  console.log('catch：' + e); //catch：Error: error
});
```
catch 其实就是 then 不传第一个参数；

```
//  --------------- 新增的 ---------------
catch(errorCallback){
    return this.then(null, errorCallback);
}
```

到此：我们的手写promise就已经完成了。