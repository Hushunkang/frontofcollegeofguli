import request from '@/utils/request'//引入utils目录下面的request.js文件
export default {
    //分页查询讲师数据
    pageTeacher(current,size) {
        return request({
            url: `/eduservice/frontteacher/pageTeacher/${current}/${size}`,
            method: 'get'
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
