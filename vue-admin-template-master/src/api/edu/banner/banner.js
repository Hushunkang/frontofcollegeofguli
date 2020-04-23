import request from '@/utils/request'
export default {
    //多条件组合查询带分页效果的banner数据
    pageBanner(current, size, bannerQuery) {
        return request({
            url: `/cmsservice/backbanner/pageBanner/${current}/${size}`,
            method: 'post',
            data: bannerQuery
        })
    },
    //逻辑删除banner
    removeBanner(bannerId) {
        return request({
            url: `/cmsservice/backbanner/removeBanner/${bannerId}`,
            method: 'delete'
        })
    },
    //添加banner
    addBanner(banner) {
        return request({
            url: `/cmsservice/backbanner/addBanner`,
            method: 'post',
            data: banner
        })
    },
    //根据bannerId查询banner数据
    getBannerById(bannerId) {
        return request({
            url: `/cmsservice/backbanner/getBannerById/${bannerId}`,
            method: 'get'
        })
    },
    //修改banner数据
    updateBanner(banner) {
        return request({
            url: `/cmsservice/backbanner/updateBanner`,
            method: 'post',
            data: banner
        })
    }
}
