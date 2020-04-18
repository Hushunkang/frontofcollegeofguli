<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Draft" label="未发布" />
          <el-option value="Normal" label="已发布" />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 显示记录的序号 -->
          {{ (current - 1) * size + scope.$index + 1 }}
          <!-- 这里的scope对象表示这个表格对象 -->
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="80" />
      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">{{ scope.row.status === 'Draft' ? '未发布' : '已发布' }}</template>
      </el-table-column>
      <el-table-column prop="lessonNum" label="课时数" width="120"/>
      <el-table-column prop="gmtCreate" label="添加时间"  width="160"/>
      <el-table-column prop="viewCount" label="浏览数量" width="120" />
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲信息</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import courseApi from "@/api/edu/course/course";
export default {
  data() {
    //定义变量和初始化
    return {
      current: 1, //当前页
      size: 5, //每页大小
      total: 0, //总记录数
      courseQuery: {}, //条件对象
      list: null //后端接口返回的数据集合
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(current = 1) {
      //给current这个变量设置一个默认值为1，前端不传current默认就是1，传了current就给它赋值给this.current，因此这里的current并不是表示该方法的形参
      this.current = current;
      courseApi.pageCourseCondition(this.current, this.size, this.courseQuery)
        //response表示后端接口返回的数据
        .then(response => {
          // console.log(response)
          this.list = response.data.records;
          this.total = response.data.total;
        }); //axios发送ajax请求后请求成功
      // .catch(error => {
      //     console.log(error)
      // })//axios发送ajax请求后请求失败
      //说明：catch建议统一都不写，框架底层做了失败后做的事情，你这里再写一次可能有些浏览器会出现问题，详情看import request from '@/utils/request'源码
    },
    //清空功能
    resetData() {
      //将表单输入项的数据置空
      this.courseQuery = {};
      this.getList();
    },
    //删除课程的方法
    removeDataById(id) {
      //从用户体验角度出发，加一个友好性的提示，怕用户误操作直接删掉了记录
      this.$confirm("此操作将永久删除课程记录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        courseApi.removeCourse(id).then(response => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //回到课程列表页面
          this.getList();
        });
      });
      // .catch(() => {//点击取消，执行catch方法

      // })
    }
  }
};
</script>
