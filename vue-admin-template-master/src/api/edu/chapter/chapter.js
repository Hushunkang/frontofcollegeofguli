import request from '@/utils/request'
export default {
    //根据课程ID获取章节和小节列表
    getChapterVideo(courseId) {
        return request({
            url: '/eduservice/chapter/getChapterVideo/' + courseId,
            method: 'get'
        })
    },
    //添加课程章节
    addChapter(eduChapter) {
        return request({
            url: '/eduservice/chapter/addChapter',
            method: 'post',
            data: eduChapter
        })
    },
    //根据课程章节ID来查询课程章节信息
    getChapterInfo(chapterId) {
        return request({
            url: '/eduservice/chapter/getChapterInfo/' + chapterId,
            method: 'get'
        })
    },
    //修改课程章节
    updateChapter(eduChapter) {
        return request({
            url: '/eduservice/chapter/updateChapter',
            method: 'post',
            data: eduChapter
        })
    },
    //删除课程章节
    deleteChapter(chapterId) {
        return request({
            url: '/eduservice/chapter/' + chapterId,
            method: 'delete'
        })
    }
}
