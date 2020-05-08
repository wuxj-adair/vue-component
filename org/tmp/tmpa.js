/*
 * @Author: your name
 * @Date: 2020-05-06 18:36:52
 * @LastEditTime: 2020-05-06 18:41:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\org\tmp\tmpa.js
 */
function add(a) {
	function sum(b) { // 使用闭包
    	a = a + b; // 累加
    	return sum;
 	}
 	sum.toString = function() { // 重写toString()方法
        return a;
    }
 	return sum; // 返回一个函数
}

// add(1); // 1
// add(1)(2);  // 3
// add(1)(2)(3);  // 6
// add(1)(2)(3)(4);  // 10 
console.log(add(1))
add(1)(2);
