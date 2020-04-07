<template>
<div class="app-container">
<!-- 查询表单 -->
<el-form :inline="true" class="demo-form-inline">
<el-form-item>
<el-input v-model="teacherQuery.name" placeholder="讲师名"/>
</el-form-item>

<el-form-item>
<el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
    <el-option :value="1" label="高级讲师"/>
    <el-option :value="2" label="首席讲师"/>
</el-select>
</el-form-item>

<el-form-item label="添加时间">
<el-date-picker
    v-model="teacherQuery.begin"
    type="datetime"
    placeholder="选择开始时间"
    value-format="yyyy-MM-dd HH:mm:ss"
    default-time="00:00:00"
/>
</el-form-item>
<el-form-item>
<el-date-picker
    v-model="teacherQuery.end"
    type="datetime"
    placeholder="选择截止时间"
    value-format="yyyy-MM-dd HH:mm:ss"
    default-time="00:00:00"
/>
</el-form-item>

<el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
<el-button type="default" @click="resetData()">清空</el-button>
</el-form>
<!-- 表格 -->
<el-table
  v-loading="listLoading"
  :data="list"
  element-loading-text="数据加载中"
  border
  fit
  highlight-current-row>
  <el-table-column
    label="序号"
    width="70"
    align="center">
    <template slot-scope="scope">
      {{ (current - 1) * size + scope.$index + 1 }}<!-- 这里的scope表示这个表格对象 -->
    </template>
  </el-table-column>
  <el-table-column prop="name" label="名称" width="80"/>
  <el-table-column label="头衔" width="80">
    <template slot-scope="scope">
      {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
    </template>
  </el-table-column>
  <el-table-column prop="intro" label="资历"/>
  <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
  <el-table-column prop="sort" label="排序" width="60"/>
  <el-table-column label="操作" width="200" align="center">
    <template slot-scope="scope">
      <router-link :to="'/edu/teacher/edit/'+scope.row.id">
        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
      </router-link>
      <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
//引入要被调用的teacher.js文件
import teacher from '@/api/edu/teacher/teacher'
export default {
    //核心代码位置
    // data:{

    // },
    data(){//定义变量和初始化
        return{
            current:1,//当前页
            size:5,//每页大小
            total:0,//总记录数
            teacherQuery:{},//条件对象
            list:null//后端接口返回的数据集合
        }
    },
    created(){//渲染页面之前执行，一般调用methods定义的方法
        //调用
        this.getList()
    },
    methods:{//创建具体的方法，调用teacher.js中定义的方法
        //讲师列表
        getList(current = 1){//给current这个变量设置一个默认值为1，前端不传current默认就是1，传了current就给它赋值给this.current，因此这里的current并不是表示该方法的形参
            this.current = current;
            teacher.pageTeacherCondition(this.current,this.size,this.teacherQuery)
            //response表示后端接口返回的数据
            .then(response => {
                // console.log(response)
                this.list = response.data.rows
                console.log(this.list)
                this.total = response.data.total
                console.log(this.total)
            })//axios发送ajax请求后请求成功
            .catch(error => {
                console.log(error)
            })//axios发送ajax请求后请求失败
        }
    }
}
</script>