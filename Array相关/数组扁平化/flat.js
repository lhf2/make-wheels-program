/**
 * 数组扁平化: Array.prototype.flat()
 * 1. 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
 * 2. 不传参数时，默认“拉平”一层，可以传入一个整数，表示想要“拉平”的层数。
 * 3. 传入 <=0 的整数将返回原数组，不“拉平”
 * 4. Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
 * 5. 如果原数组有空位，Array.prototype.flat() 会跳过空位。
 */

// 1. 递归
function flat(arr) {
  let arrResult = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      arrResult.push(...flat(item));
    } else {
      arrResult.push(item);
    }
  }
  return arrResult;
}

// 2. concat 会自动拍平一层数组
function flat(arr) {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      // 递归
      const flatItem = flat(item)
      res = res.concat(flatItem)
    } else {
      res = res.concat(item)
    }
  })
  return res
}

// 3. reduce + concat
function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
}

// 4. 栈思想
// 如果是数组的话，解构后再 push 到数组中
function flat(arr) {
  const result = [];
  const stack = [].concat(arr);
  while (stack.length != 0) {
    const val = stack.pop();
    if (Array.isArray(val)) {
      stack.push(...val)
    } else {
      result.unshift(val);
    }
  }
  return result;
}

// 5. 通过传入整数参数控制“拉平”层数
function flat(arr, num = 1) {
  return num > 0 ?
    arr.reduce((pre, cur) => {
      // 这里为什么要 num - 1？是因为使用 concat 就已经拍平一层了
      pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur);
    }, [])
    : arr.slice();
}

// 6. 使用 Generator 实现 flat 函数
function* flat(arr, num = 1) {
  for (const item of arr) {
    if (Array.isArray(item) && num > 0) {   // num > 0
      yield* flat(item, num - 1);
    } else {
      yield item;
    }
  }
}

// const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", {name: "弹铁蛋同学"}];
// console.log(flat(arr));

// 7. 修改原型链上的 flat
Array.prototype.fakeFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this
  }
  let arr = [].concat(this);
  return num > 0 ?
    arr.reduce(
      (pre, cur) =>
        pre.concat(Array.isArray(cur) ? cur.fakeFlat(num - 1) : cur),
      []
    )
    : arr.slice();
}

// 8. split 和 toString
function flat(arr) {
  return arr.toString().split(',')
}

// 9. 正则和 JSON 方法
function flat(arr){
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}

const arr = [1, [3, 4], , ,];
console.log(arr.fakeFlat());
