/**
 * 概念：就是指触发事件后，在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。（坐电梯)
 * 场景：
 * 1. 搜索框搜索输入。只需用户最后一次输入完，再发送请求；
 * 2. 按钮提交场景，比如点赞，表单提交等，防止多次提交
 * 3. 用户名、手机号、邮箱输入验证；
 * 4. 浏览器窗口大小改变后，只需窗口调整完后，再执行 resize 事件中的代码，防止重复渲染。
 */

/**
 * 
 * @param {*} fn ：节流的函数
 * @param {*} delay ：时长
 * @param {*} immediate ：是否立即执行
 */
function debounce(fn, delay, immediate) {
  var t = null, result;
  var debounced = function () {
    var context = this;
    var args = arguments;

    if (t) clearTimeout(t);

    // 立即执行
    if (immediate) {
      var callNow = !t;

      // delay 秒之后 t 变成了空，callNow 又变成了 true
      t = setTimeout(function () {
        t = null;
      }, delay)

      if (callNow) {
        result = fn.apply(context, args);
      }
    } else {
      // 正常流程
      t = setTimeout(function () {
        result = fn.apply(context, args)
      }, delay)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(t);
    t = null;
  }

  return debounced;
}