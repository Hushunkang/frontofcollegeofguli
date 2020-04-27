<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" />
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
    <!-- 定义播放器DOM -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>
<script>
import vodApi from '@/api/vod/vod'
export default {
    layout: 'video',//应用video布局
    asyncData({ params, error }) {
       return vodApi.getVideoPlayAuth(params.vid)
        .then(response => {
            return { 
                videoPlayAuth: response.data.data.videoPlayAuth,//视频播放凭证
                vid: params.vid//动态路由跳转到此vue页面，路径中的值，此处即为云端视频ID
            }
        })
    },
    mounted() {//vue生命周期当中的一个方法mounted方法，表示页面渲染之后执行，与之相对的是created方法，表示页面渲染之前执行
        new Aliplayer({
            id: 'J_prismPlayer',
            vid: this.vid,//云端视频ID
            playauth: this.videoPlayAuth,//视频播放凭证
            encryptType: '1',//如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            width: '100%',
            height: '500px',
            //以下可选设置
            cover: 'http://guli.shop/photo/banner/1525939573202.jpg',//视频封面
            qualitySort: 'asc',//清晰度排序
            mediaType: 'video',//返回音频还是视频
            autoplay: false,//自动播放
            isLive: false,//直播
            rePlay: false,//循环播放
            preload: true,
            controlBarVisibility: 'hover',//控制条的显示方式，鼠标悬停
            useH5Prism: true,//播放器类型H5
        }, function(player) {
            console.log('阿里云视频播放器创建成功(*￣︶￣)')
        })
    }
}
</script>
