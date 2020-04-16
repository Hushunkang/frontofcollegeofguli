import request from '@/utils/request'
export default {
    //添加课程小节
    addVideo(eduVideo) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: eduVideo
        })
    },
    //根据课程小节ID来查询课程小节信息
    getVideoInfo(videoId) {
        return request({
            url: '/eduservice/video/getVideoInfo/' + videoId,
            method: 'get'
        })
    },
    //修改课程小节
    updateVideo(eduVideo) {
        return request({
            url: '/eduservice/video/updateVideo',
            method: 'post',
            data: eduVideo
        })
    },
    //删除课程章节
    deleteVideo(videoId) {
        return request({
            url: '/eduservice/video/' + videoId,
            method: 'delete'
        })
    }
}
