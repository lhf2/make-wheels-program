function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return function (..._args) {
      return curry(fn, ...args, ..._args)
    }
  }
}

function add1(x, y, z) {
  return x + y + z;
}

const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1, 2)(3));
console.log(add(1)(2)(3));
console.log(add(1)(2, 3));