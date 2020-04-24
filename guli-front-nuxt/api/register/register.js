import request from '@/utils/request'
export default {
    //根据手机号发送验证码
    sendSms(phoneNumber) {
        return request({
            url: '/smsservice/sms/sendSms/' + phoneNumber,
            method: 'get'
        })
    },
    //提交注册表单，实现用户注册
    register(registerVo){
        return request({
            url: '/ucenterservice/member/register',
            method: 'post',
            data: registerVo
        })
    }
}
