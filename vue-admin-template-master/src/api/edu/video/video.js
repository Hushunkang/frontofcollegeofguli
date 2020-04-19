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
    //删除课程小节
    deleteVideo(videoId) {
        return request({
            url: '/eduservice/video/deleteVideo/' + videoId,
            method: 'delete'
        })
    },
    //根据阿里云视频点播服务为每一个视频生成的视频ID来删除云端视频
    removeVideo(videoSourceIds){
        return request({
            url: '/vodservice/video/removeVideo/' + videoSourceIds,
            method: 'delete'
        })
    }
}
