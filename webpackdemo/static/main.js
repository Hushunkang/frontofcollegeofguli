const common = require('./common.js')
// const utils = require('./utils.js')
const utils = require('./utils')//引入js，后缀可以省略，因为默认找js


//css文件引入
require('./style.css')//引入css，后缀不可以省略

common.info('hello common'+utils.add(1,2))
