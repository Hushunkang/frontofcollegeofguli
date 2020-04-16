<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 课程章节和课程小节列表 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style type="text" @click="openVideo(chapter.id)">添加课时</el-button>
            <el-button style type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
        </p>
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button style type="text" @click="openEditVideo(video.id)">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加或修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" :title="dialogChapterTitle">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改小节表单，注课程的小节和课程的课时是一个概念 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" :title="dialogVideoTitle">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- todo -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chapterApi from "@/api/edu/chapter/chapter";
import videoApi from "@/api/edu/video/video";
export default {
  data() {
    return {
      saveBtnDisabled: false, //保存按钮是否禁用
      chapterVideoList: [],
      courseId: "",
      chapter: {
        //封装章节数据
        title: "",
        sort: 0
      },
      video: {
        //封装小节数据
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: ""
      },
      dialogChapterFormVisible: false, //章节弹框
      dialogVideoFormVisible: false, //小节弹框
      dialogChapterTitle: '',
      dialogVideoTitle: ''
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
    //================================课程小节相关操作======================================
    //删除课程小节
    removeVideo(videoId) {
      this.$confirm("此操作将删除课时, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        videoApi.deleteVideo(videoId).then(response => {
          //点击确定，执行then方法
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //刷新页面
          this.getChapterVideo();
        });
      }); //点击取消，执行catch方法
    },
    //添加课时，出现弹框的方法
    openVideo(chapterId) {
      this.dialogVideoFormVisible = true;
      this.dialogVideoTitle = "添加课时";
      //设置课程章节ID
      this.video.chapterId = chapterId;
      //将弹框上面表单数据清空
      this.video.title = "";
      this.video.sort = 0;
      this.video.sort = 0;
      this.videoSourceId = "";
    },
    //添加课时或者说添加章节的小节
    addVideo() {
      this.video.courseId = this.courseId;
      videoApi.addVideo(this.video).then(response => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示
        this.$message({
          type: "success",
          message: "添加课时成功"
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    //修改课程章节信息，数据回显
    openEditVideo(videoId) {
      this.dialogVideoFormVisible = true;
      this.dialogVideoTitle = "编辑课时";
      videoApi.getVideoInfo(videoId).then(response => {
        this.video = response.data.eduVideo;
      });
    },
    updateVideo() {
      videoApi.updateVideo(this.video).then(response => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示
        this.$message({
          type: "success",
          message: "修改课时成功"
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    saveOrUpdateVideo() {
      alert(this.video.id);
      if (!this.video.id) {
        this.addVideo();
      } else {
        this.updateVideo();
      }
    },
    //================================课程章节相关操作======================================
    //删除课程的章节
    removeChapter(chapterId) {
      this.$confirm("此操作将删除章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        chapterApi.deleteChapter(chapterId).then(response => {
          //点击确定，执行then方法
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //刷新页面
          this.getChapterVideo();
        });
      }); //点击取消，执行catch方法
    },
    //添加课程章节信息弹框
    openChapterDialog() {
      this.dialogChapterFormVisible = true;
      this.dialogChapterTitle = '添加章节';
      //将弹框上面表单数据清空
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapterApi.addChapter(this.chapter).then(response => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "添加章节成功"
        });
        //刷新页面拿到最新数据
        this.getChapterVideo();
      });
    },
    //修改课程章节信息，数据回显
    openEditChatper(chapterId) {
      this.dialogChapterFormVisible = true;
      this.dialogChapterTitle = "编辑章节"
      chapterApi.getChapterInfo(chapterId).then(response => {
        this.chapter = response.data.eduChapter;
      });
    },
    updateChapter() {
      chapterApi.updateChapter(this.chapter).then(response => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示
        this.$message({
          type: "success",
          message: "修改章节成功"
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter();
      } else {
        this.updateChapter();
      }
    },
    //根据课程ID获取章节和小节列表
    getChapterVideo() {
      chapterApi.getChapterVideo(this.courseId).then(response => {
        this.chapterVideoList = response.data.list;
      });
    },
    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/" + this.courseId });
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
