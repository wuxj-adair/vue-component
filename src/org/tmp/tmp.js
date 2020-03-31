/*
 * @Author: your name
 * @Date: 2020-03-24 09:21:52
 * @LastEditTime: 2020-03-31 09:39:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\tmp\tmp.js
 */
function Sun(a){
    this.a1=a
}
Sun.prototype.be=function(){
    console.log(this.a1)
}
let sun=new Sun("123")
sun.be();
function Parent(a,b){
 Sun.call(this,a)
    this.b=b
}
Parent.prototype=Object.create(Sun.prototype)
Parent.prototype.construct=Parent
Parent.prototype.do=function(){
    console.log(this.a1,this.b)
}
let parent=new Parent("sunP","sunP2")
console.log(sun instanceof Sun)
console.log(parent instanceof Sun)
console.log(parent instanceof Parent)
parent.do()