<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bannerQuery.title" placeholder="标题" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="bannerQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="bannerQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 数据表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 显示记录的序号 -->
          {{ (current - 1) * size + scope.$index + 1 }}<!-- 这里的scope对象表示这个表格对象 -->
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="400" />
      <el-table-column prop="linkUrl" label="链接地址" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
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
    <!-- 分页条 -->
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
//引入要被调用的banner.js文件
import bannerApi from "@/api/edu/banner/banner";
export default {
  data() {
    //定义变量和初始化
    return {
      current: 1, //当前页
      size: 5, //每页大小
      total: 0, //总记录数
      bannerQuery: {}, //条件对象
      list: null //后端接口返回的数据集合
    };
  },
  created() {
    //渲染页面之前执行，一般调用methods定义的方法
    this.getList();
  },
  methods: {
    getList(current = 1) {
      this.current = current;
      bannerApi.pageBanner(this.current, this.size, this.bannerQuery)
        .then(response => {
          this.total = response.data.total;
          this.list = response.data.records;
        });//axios发送ajax请求后请求成功
      // .catch(error => {
      //     console.log(error)
      // })//axios发送ajax请求失败
      //说明：catch建议统一都不写，框架底层做了失败后做的事情，你这里再写一次可能有些浏览器会出现问题，详情看import request from '@/utils/request'源码
    },
    //清空功能
    resetData() {
      //将表单输入项的数据置空
      this.bannerQuery = {};
      this.getList();
    },
    //删除banner数据
    removeDataById(id) {
      //从用户体验角度出发，加一个友好性的提示，怕用户误操作直接删掉了记录
      this.$confirm("此操作将永久删除banner记录，是否继续？", "提示", {
        confirmButtonText: "确定",//点击确定，执行then方法
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //调用删除的方法
        bannerApi.removeBanner(id).then(response => {
          //删除成功，提示信息
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getList();
        });
      });
    }
  }
};
</script>
