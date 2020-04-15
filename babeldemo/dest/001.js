"use strict";
//转码前
//定义数据
var input = [1, 2, 3]
//将数组的每个元素 +1
input = input.map(function (item) {//es5规范里面的代码
  return item + 1;
})
console.log(input)
