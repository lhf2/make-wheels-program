/**
 * fn.call(thisArg, arg1, arg2)：thisArg 是可选的;
 * 1. 函数 fn 立即执行；
 * 2. 修改 fn 里面的 this 为 thisArg;
 * 3. arg1 之后的所有参数为 fn 的实参；
 */

Function.prototype.myCall = function (thisArg) {
  thisArg = thisArg ? Object(thisArg) : window;
  // 这样调用 thisArg.originFn 的时候 就是调用 fn, fn 的 this 也指向了 thisArg；
  thisArg.originFn = this;

  // 获取从第一位之后的参数 args = ['arguments[1]']
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  // 使用 eval 执行字符串内容 会把 args 转成字符串
  // 数组转字符串之后是用 , 拼接 [1,2,3] -> 1,2,3
  var result = eval('thisArg.originFn(' + args + ')');
  delete thisArg.originFn;
  return result;
}

/*
测试代码：
function test(){
  console.log(this);
  console.log(arguments)
}
test.call({a: 1, b: 2}, 1, 2, 3);
test.myCall({a: 1, b: 2}, 1, 2, 3);
*/
