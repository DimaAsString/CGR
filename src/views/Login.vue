<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h1>This is an about page</h1>
      <h1>This is an about page</h1>
      <h1>This is an about page</h1>
      <h1>This is an about page</h1>
      <h1>This is an about page</h1>
      <h1>This is an about page</h1>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // TODO: 处理登录逻辑
          console.log('登录成功')
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