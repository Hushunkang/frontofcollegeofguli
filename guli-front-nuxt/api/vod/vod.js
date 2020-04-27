import request from '@/utils/request'
export default {
    getVideoPlayAuth(vid) {
    return request({
      url: `/vodservice/video/getVideoPlayAuth/${vid}`,
      method: 'get'
    })
  }
}
