import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'

//创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', //api的base_url
  timeout: 20000 //请求超时时间
})

//注意这玩意是前端拦截器，不要以为拦截器就后端有
// http request 拦截器
service.interceptors.request.use(//表示每次axios发送ajax请求都使用这个拦截器
  config => {
      //debugger
      //判断cookie里面是否存在名称为guli_token这样的数据，因为cookie的结构和map结构类似，都是键值对存放数据的
      if (cookie.get('guli_token')) {
        config.headers['token'] = cookie.get('guli_token');//请求后端的url时候在请求头里面添加token
      }
        return config
      },
      err => {
      return Promise.reject(err);
    }
);

export default service
