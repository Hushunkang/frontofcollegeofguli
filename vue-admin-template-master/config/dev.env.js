'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '"http://localhost:9001"',//说明https的也可以用，但是要花钱找相关机构认证，要证书才能用，真实的企业级项目要使用https协议
})
