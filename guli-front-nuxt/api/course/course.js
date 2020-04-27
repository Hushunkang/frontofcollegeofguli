import request from '@/utils/request'//引入utils目录下面的request.js文件
export default {
    //分页查询课程数据
    frontPageCourse(current,size,frontCourseVo) {
        return request({
            url: `/eduservice/frontcourse/frontPageCourse/${current}/${size}`,
            method: 'post',
            data: frontCourseVo
        })
    },
    //课程分类列表（要求返回有层级关系那种树结构的数据模型）
    getAllSubject(){
        return request({
            url: '/eduservice/subject/getAllSubject',
            method: 'get'
        })
    }
}
