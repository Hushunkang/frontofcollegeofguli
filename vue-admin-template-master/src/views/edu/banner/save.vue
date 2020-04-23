<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="Banner排序">
        <el-input-number v-model="banner.sort" controls-position="right" min="0" />
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>

      <!-- banner（幻灯片、轮播图） -->
      <el-form-item label="Banner">
        <pan-thumb :image="banner.imageUrl" />
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">上传Banner</el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/ossservice/file/uploadFileToOss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <!-- 注意：使用element-ui前端文件上传组件会默认给你上传的文件名统一修改成file.png，因为框架底层怕你文件存在中文名称后面操作会有问题 -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入要被调用的banner.js文件
import bannerApi from "@/api/edu/banner/banner";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: {
        title: "",
        sort: 0,
        imageUrl: "",
        linkUrl: ""
      },
      imagecropperShow: false, //上传弹框组件是否显示
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled: false //保存按钮是否禁用，防止表单重复提交(*￣︶￣)
    };
  },
  created() {
    this.init();
  },
  watch: {
    //vue路由监听
    $route(to, from) {
      //to和from表示路由变化的方式，一旦路由发生变化，这个方法就会执行，说白了就是菜单变了这个方法就被触发
      this.init();
    }
  },
  methods: {
    close() {
      //关闭文件上传弹框的方法
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    cropSuccess(data) {
      //文件上传成功的方法
      this.imagecropperShow = false;
      //上传成功后返回图片地址
      this.banner.imageUrl = data.url;
      this.imagecropperKey = this.imagecropperKey + 1;//刷新作用
    },
    init() {
      //预备知识，在JavaScript语言中，所有的变量都可以作为一个boolean类型的变量去使用
      //判断请求路径中是否有id，没有就是添加，有就是修改
      if (this.$route.params && this.$route.params.id) {
        //路径有id，修改，从请求路径获取id
        const id = this.$route.params.id;
        //根据id查询banner数据，编辑数据前回显使用
        this.getBannerById(id);
      } else {
        //路径没有id，添加
        //清空表单（原理是vue的双向绑定）
        this.banner = {};
        this.banner.imageUrl = ""; //不需要设置默认banner，也可以设置，这里我不设置
      }
    },
    saveOrUpdate() {
      if (!this.banner.id) {
        //添加
        this.addBanner();
      } else {
        //修改
        this.updateBanner();
      }
    },
    addBanner() {
      bannerApi.addBanner(this.banner).then(response => {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        //路由跳转，回到banner列表页面，路由跳转说的底层一点就是所学的JavaWEB技术栈里面的重定向操作(*￣︶￣)
        this.$router.push({ path: "/banner/list" });
      });
    },
    getBannerById(id) {
      bannerApi.getBannerById(id).then(response => {
        this.banner = response.data.banner;
      });
    },
    updateBanner() {
      bannerApi.updateBanner(this.banner).then(response => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改成功"
        });
        //路由跳转，回到banner列表页面
        this.$router.push({ path: "/banner/list" });
      });
    }
  }
};
</script>
