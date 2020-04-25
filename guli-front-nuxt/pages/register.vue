<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item
          class="input-prepend restyle"
          prop="nickname"
          :rules="[{ required: true, message: '请输入您的昵称', trigger: 'blur' }]"
        >
          <div>
            <el-input type="text" placeholder="您的昵称" v-model="params.nickname" />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend restyle no-radius"
          prop="mobile"
          :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]"
        >
          <div>
            <el-input type="text" placeholder="手机号" v-model="params.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend restyle no-radius"
          prop="code"
          :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
        >
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="验证码" v-model="params.code" />
            <i class="iconfont icon-phone" />
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a
              href="javascript:"
              type="button"
              @click="getCodeFun()"
              :value="codeText"
              style="border: none;background-color: none"
            >{{codeText}}</a>
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <div class="btn">
          <input
            type="button"
            :disabled="disabled"
            class="sign-up-button"
            value="注册"
            @click="submitRegister()"
          />
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br />
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="#"
            >
              <i class="iconfont icon-weixin" />
            </a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#">
              <i class="iconfont icon-qq" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import registerApi from "@/api/register/register";
export default {
  layout: "sign",
  data() {
    return {
      params: {
        //用于封装会员注册表单
        nickname: "",
        mobile: "",
        code: "",
        password: ""
      },
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeText: "获取验证码",
      disabled: false
    };
  },
  methods: {
    //提交注册表单，实现用户注册
    submitRegister() {
      registerApi.register(this.params).then(response => {
        console.log(response);
        //前端要根据后端传递的响应报文做判断，不能擅自的自作主张的认为有返回数据了就是成功了，这部分肯定要写的，由于我研究的重点不偏向于前端，知道有这么个东西就可以了
        if (response.data.code === 20000) {
          //提示注册成功
          this.$message({
            type: "success",
            message: "注册成功"
          });
          //跳转到登录页面
        this.$router.push({ path: "/login" });//路由跳转，回到登录页面，路由跳转说的底层一点就是所学的JavaWEB技术栈里面的重定向操作(*￣︶￣)
        } else {
          //提示注册成功
          this.$message({
            type: "error",
            message: response.data.message
          });
        }
        //最好做一个功能，让用户点击了提交按钮后，不能让用户继续点击了，否则表单重复提交相当于造成了高并发问题，系统中出现了好几个一模一样的记录
      });
    },
    //倒计时
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeText = "验证码已发送，接收约需要" + this.second + "秒";
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          this.second = 60;
          this.codeText = "获取验证码";
        }
      }, 1000);
    },
    //根据手机号发送验证码
    getCodeFun() {
      registerApi.sendSms(this.params.mobile).then(response => {
        console.log(response);
        if (response.data.code === 20000) {
          //验证码发送成功
          this.$message({
            type: "success",
            message: response.data.message
          });
        } else {
          //提示验证码发送成功
          this.$message({
            type: "error",
            message: response.data.message
          });
        }
        this.sending = false;
        this.timeDown();
      });
    },
    checkPhone(rule, value, callback) {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    }
  }
};
</script>
