import request from '@/utils/request'
export default {
    //会员登录（手机号登录）
    login(member) {
        return request({
            url: '/ucenterservice/member/login',
            method: 'post',
            data: member
        })
    },
    //根据token获取会员信息
    getMemberInfo(){
        return request({
            url: '/ucenterservice/member/getMemberInfo',
            method: 'get'
        })
    }
}
