<template>
  <div class="app-container">
     <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- TODO讲师头像 -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher/teacher'
export default {
  data(){
    return{
      teacher:{
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled:false//保存按钮是否经验，防止表单重复提交(*￣︶￣)
    }
  },
  created(){
    this.init()
  },
  watch:{//vue路由监听
    $route(to,from){//to和from表示路由变化的方式，一旦路由发生变化，这个方法就会执行，说白了就是菜单变了这个方法就被触发
      this.init()
    }
  },
  methods:{
    init(){
      //预备知识点：在JavaScript语言中，所有的变量都可以作为一个boolean类型的变量去使用
      //判断请求路径中是否有id，没有就是添加，有就是修改
      if(this.$route.params && this.$route.params.id) {//路径有id，修改
          //从请求路径获取id
          const id = this.$route.params.id
          //根据id查询讲师数据，编辑数据前回显使用
          this.getTeacherInfo(id)
      } else {//路径没有id，添加
        //清空表单（原理：vue的双向绑定）
        this.teacher = {}
      }
    },
    saveOrUpdate(){
      //根据teacher是否带有id来判断是添加还是修改
      if(!this.teacher.id) {
        //添加
        this.saveTeacher()
      } else {
        //修改
        this.updateTeacher()
      }
    },
    saveTeacher(){
      teacherApi.addTeacher(this.teacher)
      .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功！'
          });
          //路由跳转，回到讲师列表页面，路由跳转说的底层一点就是所学的JavaWEB技术栈里面的重定向操作(*￣︶￣)
          this.$router.push({path:'/teacher/table'})
        })
    },
    getTeacherInfo(id){
      teacherApi.getTeacherById(id)
      .then(response => {
          this.teacher = response.data.teacher
        })
    },
    updateTeacher(){
      teacherApi.updateTeacherInfo(this.teacher)
      .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功！'
          });
          //路由跳转，回到讲师列表页面
          this.$router.push({path:'/teacher/table'})
        })
    }
  }
}
</script>
