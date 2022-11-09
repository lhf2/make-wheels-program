/**
 * 概念：限制一个函数在一定时间内只能执行一次。（过安检）
 * 场景：
 * 1. 懒加载、滚动加载、加载更多或监听滚动条位置；
 * 2. 百度搜索框，搜索联想功能；
 * 3. 拖拽场景：固定时间内只执行一次， 防止高频率的的触发位置变动
 *
 * 参考：https://mp.weixin.qq.com/s/BcsuTPH6BUNEXFw13Uvmlg
 */

/**
 * 
 * @param {*} fn ：节流函数
 * @param {*} delay ：时长
 * @param {*} option ：{ "start": "是否立即执行", "last"："最后一次是否执行"}
 * @returns 
 */
function throttle(fn, delay, option = {}) {
  let timer, context, args;
  let lastTime = 0;

  return function () {
    context = this;
    args = arguments;

    let currentTime = new Date().getTime();

    // 增加是否立即执行判断
    if (option.start == false && !lastTime) lastTime = currentTime;

    if (currentTime - lastTime > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(context, args);
      lastTime = currentTime;
    }

    // 增加最后是否再执行一次判断
    if (!timer && option.last == true) {
      timer = setTimeout(() => {
        // 确保再次触发事件时，仍然不立即执行
        // 如果 start = false，设置成了 0 之后，22 行还会做判断
        lastTime = option.start == false ? 0 : new Date().getTime();
        fn.apply(context, args);
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}