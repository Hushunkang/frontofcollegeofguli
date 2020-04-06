'use strict';

var _ = require('./01.js');

//./表示当前文件目录，和linux里面一样

//调用方法
(0, _.getList)(); //调用01.js的方法，引入01.js文件，进行调用

(0, _.save)();