<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        {{ chapter.title }}
        <ul>
          <li v-for="video in chapter.children" :key="video.id">
            {{ video.title }}
          </li>
        </ul>
        <!-- <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button style type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p> -->
        <!-- 视频 -->
        <!-- <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul> -->
      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapterApi from "@/api/edu/chapter/chapter";
export default {
  data() {
    return {
      saveBtnDisabled: false, //保存按钮是否禁用
      chapterVideoList: [],
      courseId: ""
    };
  },
  created() {
    console.log("chapter created");
    //拿到路由中的课程ID，观察的出这个ID在前端路由跳转（一个菜单跳到另一个菜单）在URL上面有显示
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      //根据课程ID查询章节和小节数据
      this.getChapterVideo();
    }
  },
  methods: {
    //根据课程ID获取章节和小节列表
    getChapterVideo() {
      chapterApi.getChapterVideo(this.courseId).then(response => {
        this.chapterVideoList = response.data.list;
      });
    },
    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/1" });
    },
    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/1" });
    }
  }
};
</script>
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
