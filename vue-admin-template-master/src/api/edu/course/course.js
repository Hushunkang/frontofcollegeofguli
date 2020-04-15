import request from '@/utils/request'
export default {
    //添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //根据课程ID查询课程基本信息
    //修改课程基本信息
}
