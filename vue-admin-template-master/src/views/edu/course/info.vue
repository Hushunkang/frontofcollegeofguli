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
        <el-input v-model="courseInfo.description" />
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
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from "@/api/edu/teacher/teacher";
import subjectApi from "@/api/edu/subject/subject";
import courseApi from "@/api/edu/course/course";
export default {
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
      subjectTwos: [] //用于封装所有二级分类课程
    };
  },
  created() {
    console.log("info created");
    //初始化所有讲师
    this.findAllTeacher();
    this.getSubjectOnes();
  },
  methods: {
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
        this.teachers = response.data.items;
      });
    },
    next() {
      courseApi.addCourseInfo(this.courseInfo).then(response => {
        //提示
        this.$message({
          type: "success",
          message: "添加课程信息成功!"
        });
        //步骤条组件，跳转到下一步
        this.$router.push({
          path: "/course/chapter/" + response.data.courseId
        });
      });
    }
  }
};
</script>
