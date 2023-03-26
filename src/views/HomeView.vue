<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
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
            console.log('登录成功')
            this.$router.push('/login')
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
}
.login-form {
  width: 400px;
}
.login-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
