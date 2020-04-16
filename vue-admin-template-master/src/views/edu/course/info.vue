<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="示例：机器学习项目课：从基础到搭建项目视频课程" />
      </el-form-item>
      <!-- 所属分类 -->
      <!-- 一级课程分类 -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级课程分类"
          @change="subjectOneChanged"
        >
          <el-option
            v-for="subjectOne in subjectOnes"
            :key="subjectOne.id"
            :label="subjectOne.title"
            :value="subjectOne.id"
          />
        </el-select>
        <!-- 二级课程分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级课程分类">
          <el-option
            v-for="subjectTwo in subjectTwos"
            :key="subjectTwo.id"
            :label="subjectTwo.title"
            :value="subjectTwo.id"
          />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teachers"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/ossservice/file/uploadFileToOss'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from "@/api/edu/teacher/teacher";
import subjectApi from "@/api/edu/subject/subject";
import courseApi from "@/api/edu/course/course";
import Tinymce from "@/components/Tinymce"; //引入富文本编辑器Tinymce组件
export default {
  //声明富文本编辑器Tinymce组件
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, //保存按钮是否禁用
      courseInfo: {
        title: "",
        subjectParentId: "", //一级分类ID
        subjectId: "", //二级分类ID
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "/static/01.jpg",
        price: 0
      },
      BASE_API: process.env.BASE_API,
      teachers: [], //用于封装讲师列表
      subjectOnes: [], //用于封装所有一级分类课程
      subjectTwos: [], //用于封装所有二级分类课程
      courseId: ""
    };
  },
  created() {
    console.log("info created");
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
    //页面初始化方法
    init() {
      //拿到路由中的课程ID，观察的出这个ID在前端路由跳转（一个菜单跳到另一个菜单）在URL上面有显示
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getCourseInfo();
      } else {
        //新增操作路由里面没有传递课程ID，这个时候要清空一下表单数据
        this.courseInfo = {};
        this.courseInfo.cover = "/static/01.jpg";
      }
      //初始化所有讲师
      this.findAllTeacher();
      //初始化所有一级课程
      this.getSubjectOnes();
    },
    //根据课程ID查询课程基本信息
    getCourseInfo() {
      courseApi.getCourseInfo(this.courseId).then(response => {
        this.courseInfo = response.data.courseVo;
        //查询所有课程分类
        subjectApi.getAllSubject().then(response => {
          //获取所有一级课程
          this.subjectOnes = response.data.list;
          //匹配，取出要拿到的二级课程分类
          for (var i = 0; i < this.subjectOnes.length; i++) {
            if (this.subjectOnes[i].id === this.courseInfo.subjectParentId) {
              this.subjectTwos = this.subjectOnes[i].children;
            }
          }
        });
      });
    },
    //上传课程封面之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是JPG格式！");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过2MB！");
      }
      return isJPG && isLt2M;
    },
    //上传课程封面成功之后调用的方法
    handleAvatarSuccess(response, file) {
      this.courseInfo.cover = response.data.url;
    },
    //下拉框onchange事件触发的方法
    subjectOneChanged(value) {
      //value表示一级课程分类ID
      for (var i = 0; i < this.subjectOnes.length; i++) {
        var subjectOne = this.subjectOnes[i];
        if (value === subjectOne.id) {
          this.subjectTwos = subjectOne.children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    //查询所有一级课程分类
    getSubjectOnes() {
      subjectApi.getAllSubject().then(response => {
        this.subjectOnes = response.data.list;
      });
    },
    //查询所有讲师
    findAllTeacher() {
      teacherApi.findAllTeacher().then(response => {
        this.teachers = response.data.list;
      });
    },
    addCourseInfo() {
      courseApi.addCourseInfo(this.courseInfo).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "添加课程信息成功！"
        });
        //步骤条组件，跳转到下一步
        this.$router.push({
          path: "/course/chapter/" + response.data.courseId
        });
      });
    },
    //修改课程
    updateCourseInfo() {
      courseApi.updateCourseInfo(this.courseInfo).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "修改课程信息成功！"
        });
        //步骤条组件，跳转到第二步
        this.$router.push({ path: "/course/chapter/" + this.courseId });
      });
    },
    saveOrUpdate() {
      if (!this.courseInfo.id) {
        //添加操作，courseInfo里面没有id值
        this.addCourseInfo();
      } else {
        //修改操作，courseInfo里面有id值
        this.updateCourseInfo();
      }
    }
  }
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
