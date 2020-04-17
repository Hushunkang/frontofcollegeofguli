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
    getCourseInfo(courseId) {
        return request({
            url: '/eduservice/course/getCourseInfo/' + courseId,
            method: 'get'
        })
    },
    //修改课程基本信息
    updateCourseInfo(courseVo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseVo
        })
    },
    //课程确认信息的显示
    getPublishCourseInfo(courseId) {
        return request({
            url: '/eduservice/course/getPublishCourseInfo/' + courseId,
            method: 'get'
        })
    },
    //课程发布
    publishCourse(courseId) {
        return request({
            url: '/eduservice/course/publishCourse/' + courseId,
            method: 'put'
        })
    },
    //多条件组合查询带分页效果的课程数据
    pageCourseCondition(current, size, courseQuery) {
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${size}`,//采用`这个字符来实现，后面可以用表达式取值
            method: 'post',
            data: courseQuery
        })
    },
    //物理删除课程（删除课程的时候需要删除课程关联的所有数据）
    removeCourse(courseId){
        return request({
            url: `/eduservice/course/deleteCourse/${courseId}`,
            method: 'delete'
        })
    }
}
