//0 1 1 2 3 5 8，假设第 0 个是 0，第 1 个是 1，求第 n 个数的实现方式？
function addArray(n){
if(n==0)
return 0
if(n==1)
return 1
return addArray(n-1)+addArray(n-2)
}
console.log(addArray(6))