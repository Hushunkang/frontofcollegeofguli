import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/eduservice/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/eduservice/user/info',
    method: 'get',
    params: { token }
  })
}

export function LogOut() {
  return request({
    url: '/eduservice/user/logout',
    method: 'post'
  })
}
