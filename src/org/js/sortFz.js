/*
 * @Author: your name
 * @Date: 2020-04-02 18:28:29
 * @LastEditTime: 2020-04-02 18:28:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\js\sortFz.js
 */
function mergeSort(arr) {
    const length = arr.length;
    if (length === 1) { //递归算法的停止条件，即为判断数组长度是否为1
        return arr;
    }
    const mid = Math.floor(length / 2);
   
    const left = arr.slice(0,  mid);
    const right = arr.slice(mid, length);
  
    return merge(mergeSort(left), mergeSort(right)); //要将原始数组分割直至只有一个元素时，才开始归并
}

function merge(left, right) {
    const result = [];
    let il = 0;
    let ir = 0;

    //left, right本身肯定都是从小到大排好序的
    while( il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il]);
            il++;
        } else {
            result.push(right[ir]);
            ir++;
        }
        
    }

    //不可能同时存在left和right都有剩余项的情况, 要么left要么right有剩余项, 把剩余项加进来即可
    while (il < left.length) { 
        result.push(left[il]);
        il++;
    }
    while(ir < right.length) {
        result.push(right[ir]);
        ir++;
    }
    return result;
}