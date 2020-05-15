// 防抖和节流
// 防抖和节流是在时间轴上控制函数的执行次数。防抖可以类比为电梯不断上乘客,节流可以看做幻灯片限制频率播放电影。
// https://juejin.im/post/5a35ed25f265da431d3cc1b1#heading-10

// 防抖就是先清延时，再重建延时
/**
 * @desc 防抖函数(立即执行就像技能读条，非立即执行就像乘电梯)
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 * @param {是否立即执行} immediate
 */
function debounce(func, wait, immediate) {
    let timeout = null
    return function (...args) {
      let context = this
      if (timeout) clearTimeout(timeout)
      if (!timeout) {
        func.apply(context, args)
      }
      if (immediate) {
        timeout = setTimeout(function () {
          timeout = null
        }, wait)
  
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait)
      }
    }
  }
  var fn = function () {
    console.log('boom')
  }
  
  // setInterval(debounce(fn,500),1000) // 第一次在1500ms后触发，之后每1000ms触发一次
  // setInterval(debounce(fn,2000),1000) // 不会触发一次（我把函数防抖看出技能读条，如果读条没完成就用技能，便会失败而且重新读条）
  
  /**
   * @desc 节流
   * @param {需要节流的函数} fn
   * @param {间隔时间} wait
   * @param {是否立即执行} immediate
   */
  function throttle(fn, gapTime) {
    let _lastTime = null;
  
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn();
        _lastTime = _nowTime
      }
    }
  }
  
  let fn2 = ()=>{
    console.log('boom')
  }
  
  setInterval(throttle(fn2,1000),10)
  