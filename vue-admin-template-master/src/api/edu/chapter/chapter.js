import request from '@/utils/request'
export default {
    //根据课程ID获取章节和小节列表
    getChapterVideo(courseId) {
        return request({
            url: '/eduservice/chapter/getChapterVideo/' + courseId,
            method: 'get'
        })
    }
}
