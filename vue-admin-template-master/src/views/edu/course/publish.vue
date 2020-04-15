<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/><!-- 因为商业模式是B2C模式，系统里面就存在普通用户和管理员两种角色，这个地方管理员直接发布课程即可，没做审核功能这个环节就可以成功发布课程 -->
    </el-steps>
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      saveBtnDisabled:false//保存按钮是否禁用
    }
  },
  created() {
    console.log('publish created')
  },
  methods: {
    previous() {
      console.log('previous')
      this.$router.push({path:'/course/chapter/1'})
    },
    publish() {
      console.log('publish')
      this.$router.push({path:'/course/list'})
    }
  }
}
</script>
