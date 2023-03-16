function curry(fn, ...args){
  return args.length >= fn.length ? fn(...args) : curry.bind(null, fn, ...args)
}

function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return function (..._args) {
      // 积累参数
      return curry(fn, ...args, ..._args)
    }
  }
}


// ****************** 分割线 ******************
function curry(fn, args) {
  var args = args || [];
  return function () {
    let _args = args.concat([...arguments]);
    if (fn.length > args.length) {
      return curry.apply(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}


// ****************** 分割线 ******************
function curry(fn) {
  const fnArgsLength = fn.length // 传入函数的参数长度
  let args = []

  function calc(...newArgs) {
      // 积累参数
      args = [
          ...args,
          ...newArgs
      ]
      if (args.length < fnArgsLength) {
          // 参数不够，返回函数
          return calc
      } else {
          // 参数够了，返回执行结果
          return fn.apply(this, args.slice(0, fnArgsLength))
      }
  }

  return calc
}


// test
function add1(x, y, z) {
  return x + y + z;
}

const add = curry(add1);
// console.log(add(1, 2, 3));
// console.log(add(1, 2)(3));
// console.log(add(1)(2)(3));
console.log(add(1)(2, 3));