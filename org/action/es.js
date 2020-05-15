/*
 * @Author: your name
 * @Date: 2020-05-12 16:12:02
 * @LastEditTime: 2020-05-12 16:16:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\org\action\es.js
 */

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++]} :
          {done: true};
      }
    };
  }
var it = makeIterator(['a', 'b']);

// it.next() // { value: "a", done: false }
// it.next() // { value: "b", done: false }
// it.next() // { value: undefined, done: true }
console.log(it.next(),it.next(),it.next(),it.next())