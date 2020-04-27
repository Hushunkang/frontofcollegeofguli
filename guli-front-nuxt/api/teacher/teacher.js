import request from '@/utils/request'//引入utils目录下面的request.js文件
export default {
    //分页查询讲师数据
    frontPageTeacher(current,size) {
        return request({
            url: `/eduservice/frontteacher/frontPageTeacher/${current}/${size}`,
            method: 'get'
        })
    },
    //讲师详情
    frontGetTeacherById(teacherId){
        return request({
            url: '/eduservice/frontteacher/frontGetTeacherById/' + teacherId,
            method: 'get'
        })
    }
}
