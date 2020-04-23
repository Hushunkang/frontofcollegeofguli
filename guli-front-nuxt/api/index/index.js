import request from '@/utils/request'
export default {
    //查询前8门热门课程以及查询前4名讲师（按照添加时间）
    index() {
        return request({
            url: '/eduservice/frontindex/index',
            method: 'get'
        })
    }
}
