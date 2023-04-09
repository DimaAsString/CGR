<template>
    <div class="login-container">
        <el-form ref="form" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">登录</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"
                          style="width: 300px;"></el-input>
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
import axios from "axios";

Vue.use(VueToast, {
    timeout: 1500
})

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        login() {
            if (this.form.username == '') {
                this.$toast.error('账号为空，请检查！')
                return;
            }
            if (this.form.password == '') {
                this.$toast.error('密码为空，请检查！')
                return;
            }
            // 搜索操作
            const data = {name: this.form.username, password: this.form.password};
            const jsonStr = JSON.stringify(data);
            // 搜索操作
            axios({
                    method: "post",
                    url: "http://192.168.31.82:9000/adminuser/checkpasswd",
                    data: jsonStr
                }
            ).then((res) => {
                const item = res.data;
                if (item.loginStatus) {
                    this.$toast.success('登录成功')
                    setTimeout(() => {
                        this.$router.push('/ShowInfo?id=' + item.id)
                    }, 1500)
                } else {
                    this.$toast.error('登录失败，请检查账号密码')
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
