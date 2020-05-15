// let fd = function (fn, first, wait) {
//     let cantDo = null;
//     let that = this;
//     return function (...arg) {
//         if (cantDo) {
//             clearTimeout(cantDo)

//         }
//         if (first) {
//             if(!cantDo){
//                 fn.call(that, arg)
//             }
                
//                 cantDo = setTimeout(function () {
//                     cantDo = null
//                 }, wait)
            

//         } else {
          
//             cantDo = setTimeout(function () {
//                 fn.call(that, arg)
//                 // cantDo = null
//             }, wait)
//         }
//     }
// }
// let fn = function () {
//     console.log(1111)
// }
// let b = fd(fn, 0, 2000)
// b(); b(); b(); b(); b(); b(); b(); b();



var timer = setTimeout(function(){
    　　　　console.log("timer1",timer==null,timer);
     clearTimeout(timer);
    　　},100);
    
    // clearTimeout(timer);
    setTimeout(function(){
        　　　　console.log("timer2",timer==null,timer);
        　　},2000);