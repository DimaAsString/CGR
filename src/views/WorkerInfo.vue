<template>
    <div style="height: 100%;">
        <el-container style="height:100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); text-align: center">
                <img src="../assets/admin_icon.png" style="height: 200px; width: 200px;">
                <p style="text-align: center; font-size: 14px;">当前操作员：
                    <br> {{ admin_name }}
                </p>

                <el-menu default-active="3">
                    <el-menu-item index="1" style="text-align: center" @click="gotoShowInfo">概要展示</el-menu-item>
                    <el-menu-item index="2" style="text-align: center" @click="gotoUserInfo">登记签到</el-menu-item>
                    <el-menu-item index="3" style="text-align: center">员工管理</el-menu-item>
                </el-menu>
                <el-button type="danger" @click="gotoTopPage" style="margin-top: 20px;">退出登录</el-button>
            </el-aside>
            <el-container>
                <el-main>
                    <div style="">
                        <el-button type="primary" icon="el-icon-plus" @click="DialogVisible = true">添加员工</el-button>
                        <el-input style="width: 200px; margin-left: 20px;" v-model="searchText"
                                  placeholder="请输入员工名称"></el-input>
                        <el-select style=" width: 150px;margin-left: 20px;" v-model="order"
                                   placeholder="请选择排序方式">
                            <el-option label="升序" value="asc"></el-option>
                            <el-option label="倒序" value="desc"></el-option>
                        </el-select>
                        <el-button style="margin-left: 20px;" type="primary" icon="el-icon-search" @click="search">
                            搜索
                        </el-button>
                    </div>
                    <div style="height: 84%">
                        <el-table :data="users" height="100%" style=" width: 100%;  margin: 20px;"
                                  :header-cell-style="{textAlign: 'center'}"
                                  :cell-style="{ textAlign: 'center' }">
                            <el-table-column label="序号" width="50px;">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column label="名称" prop="name"></el-table-column>
                            <el-table-column label="昵称" prop="nickname"></el-table-column>
                            <el-table-column label="性别" prop="gender">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.gender == 1 ? 'success': 'primary'">
                                        {{ scope.row.gender == 1 ? '男' : '女' }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="电话" prop="phone"></el-table-column>
                            <el-table-column label="邮箱" prop="email"></el-table-column>
                            <el-table-column label="最近登录时间" prop="lastLoginTime"></el-table-column>
                            <el-table-column label="注册时间" prop="registerTime"></el-table-column>
                            <el-table-column label="信息更新时间" prop="updateTime"></el-table-column>
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="DialogVisible = true">修改</el-button>
                                    <el-dialog
                                            title="提示"
                                            :visible.sync="DialogVisible"
                                            width="30%"
                                            center>
                                        <div style="width: 100%;text-align: center;">
                                            <span style="width: 30%;margin-top: 10px;">员工姓名:</span>
                                            <el-input v-model="form.username"
                                                      style="width: 40%;margin-left: 20px;margin-top: 10px;"></el-input>
                                            <br>
                                            <span style="width: 30%;margin-top: 10px;">员工密码:</span>
                                            <el-input type="password" v-model="form.password"
                                                      style="width: 40%;margin-left: 20px;margin-top: 10px;"></el-input>
                                            <br>
                                            <span style="width: 30%;margin-top: 10px;">员工昵称:</span>
                                            <el-input v-model="form.nickname"
                                                      style="width: 40%;margin-left: 20px;margin-top: 10px;"></el-input>
                                            <br>
                                            <span style="width: 30%;margin-top: 10px;">员工性别:</span>
                                            <el-radio v-model="form.gender" label="0"
                                                      style="margin-top: 10px;margin-left: 16px;">男
                                            </el-radio>
                                            <el-radio v-model="form.gender" label="1" style="margin-top: 10px;">女
                                            </el-radio>
                                            <br>
                                            <span style="width: 30%;">员工手机:</span>
                                            <el-input v-model="form.phone"
                                                      style="width: 40%;margin-left: 20px;margin-top: 10px;"></el-input>
                                            <br>
                                            <span style="width: 30%;margin-top: 10px;">员工邮箱:</span>
                                            <el-input v-model="form.email"
                                                      style="width: 40%;margin-left: 20px;margin-top: 10px;"></el-input>
                                        </div>


                                        <span slot="footer" class="dialog-footer">
                      <el-button @click="DialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
                    </span>
                                    </el-dialog>
                                    <el-popconfirm
                                            style="margin-left: 10px;"
                                            title="确定是否删除该员工？"
                                            confirm-button-text='确认'
                                            cancel-button-text='取消'
                                            icon="el-icon-info"
                                            icon-color="red">
                                        <el-button type="danger" @click="deleteUser(scope.row)" slot="reference">删除
                                        </el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="150">
                        </el-pagination>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            DialogVisible: false,
            admin_name: 'ChenShenShi',
            searchText: '',
            order: '',
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                nickname: '',
                gender: '',
                phone: '',
                email: ''
            },
            users: [
                {
                    name: '陈龙',
                    nickname: '珅式',
                    gender: 0,
                    phone: '13800138000',
                    email: 'ShenSHI@test.com',
                    lastLoginTime: '2021-08-01 10:00:00',
                    registerTime: '2021-01-01 00:00:00',
                    updateTime: '2021-08-01 10:00:00',
                },
            ],
        };
    },
    mounted() {
        this.getList()
    },
    methods: {
        // 初始化页面渲染
        getList() {
            for (let i = 1; i <= 35; i++) {
                const item = {
                    name: '陈龙',
                    nickname: '珅式',
                    gender: 0,
                    phone: '13800138000',
                    email: 'ShenSHI@test.com',
                    lastLoginTime: '2021-08-01 10:00:00',
                    registerTime: '2021-01-01 00:00:00',
                    updateTime: '2021-08-01 10:00:00',
                }
                this.users.push(item)
            }
            const data = {pageid: 1, pagenumber: 1};
            const jsonStr = JSON.stringify(data);
            axios({
                    method: "post",
                    url: "http://192.168.31.82:9000/adminuser/all",
                    data: jsonStr
                }
            ).then((res) => {
                const item = res.data;
                console.log(item)
                this.users = []
                for (let i = 0; i < item.data.length; i++) {
                    let base = item.data[i];
                    const tempItem = {
                        name: base.name,
                        nickname: base.nickname,
                        gender: base.gender,
                        phone: base.phone,
                        email: base.email,
                        lastLoginTime: base.Logintime.slice(0, 10) + " " + base.Logintime.slice(11, 19),
                        registerTime: base.Registertime.slice(0, 10) + " " + base.Registertime.slice(11, 19),
                        updateTime: base.Updatetime.slice(0, 10) + " " + base.Updatetime.slice(11, 19),
                    }
                    this.users.push(tempItem)
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        },
        deleteUser(user) {
            // 删除员工操作
        },
        search() {
            // 搜索操作
        },

        // 跳转到登录页面
        gotoTopPage() {
            this.$toast.error('退出成功')
            setTimeout(() => {
                this.$router.push('/')
            }, 1500)
        },

        // 跳转到概要展示页面
        gotoShowInfo() {
            this.$router.push('/ShowInfo')
        },

        // 跳转到用户签到页面
        gotoUserInfo() {
            this.$router.push('/UserInfo')
        },
    },
};
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
