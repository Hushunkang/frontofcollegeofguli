<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="login()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_self" href="http://localhost:8150/api/ucenter/wx/getWeChatCode"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import loginApi from "@/api/login/login"
  export default {
    layout: 'sign',
    data () {
      return {
        user:{//用于封装手机号和密码对象
          mobile:'',
          password:''
        },
        loginInfo:{}
      }
    },
    methods: {
      login(user){
        //第一步 调用接口进行登录，返回token字符串
        loginApi.login(this.user) 
           .then(response => {

             //有可能登录不成功，给前端响应
            //  debugger
            if(response.data.code != 20000){
              // alert(123)
              this.$message({
            type: "error",
            message: response.data.message
              });
              return ;
            }

             //第二步 获取token字符串放到cookie里面
             //第一个参数cookie名称，第二个参数值，第三个参数作用范围（每次请求都带上cookie，这个表示请求时cookie的传递范围）
             cookie.set('guli_token',response.data.data.token,{domain: 'localhost'})

//第三步 看request.js里面的拦截器

              //第四步 调用接口 根据token获取用户信息，为了首页面显示
              loginApi.getMemberInfo()
                .then(response => {
                  this.loginInfo = response.data.data.memberInfo
                  //获取返回用户信息，放到cookie里面
                  cookie.set('guli_ucenter',this.loginInfo,{domain: 'localhost'})
                  //一个cookie其实有很多属性的，其中domain和path这两个属性，限制了请求某一个url，浏览器是否要发送这个cookie
                  // document.cookie="username=John Doe";
                  // cookie.set('name', 'value', { expires: 365 })
                  // document.cookie = "name=huang";
                  // document.cookie="age=12; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=localhost; path=/";

                  //跳转到首页面
                  window.location.href = "/";
                })
           })
      },
      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>
