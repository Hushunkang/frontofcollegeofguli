import request from '@/utils/request'
export default {
    //查询出最近更新的四个banner（若不足4个，查询所有）
    getBanners() {
        return request({
            url: '/cmsservice/frontbanner/getBanners',
            method: 'get'
        })
    }
}
