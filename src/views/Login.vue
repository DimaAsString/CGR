<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 150px;margin-left: 40px;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import VueToast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Vue from "vue";
Vue.use(VueToast, {
  timeout: 1500
})

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在6到20位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // TODO: 处理登录逻辑
          if(this.form.username =='admin' && this.form.password == 'ping0000'){
            this.$toast.success('登录成功')
            setTimeout(() => {
              this.$router.push('/ShowInfo')
            }, 1500)
          } else {
            console.log('校验成功')
          }
        } else {
          console.log('登录失败')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("file/river.jpg");
}
.login-form {
  width: 400px;
  background-color: rgba(179, 192, 209, 0.2);
  border-radius: 10px;
}
.login-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
