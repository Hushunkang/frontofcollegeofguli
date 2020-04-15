'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '"http://localhost:9001"',//线上的项目必须要去花钱向相关机构申请证书，用https协议，http协议明文传输数据的，存在中间人攻击的风险
})
