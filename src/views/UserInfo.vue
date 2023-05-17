<template>
    <div style="height: 100%;">
        <el-container style="height:100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); text-align: center">
                <img src="../assets/headIMG.jpg" style="height: 200px; width: 200px;">
                <p style="text-align: center; font-size: 14px;">当前操作员：
                    <br> {{ tempUser.name }}
                </p>

                <el-menu default-active="2">
                    <el-menu-item index="1" style="text-align: center" @click="gotoShowInfo">概要展示</el-menu-item>
                    <el-menu-item index="2" style="text-align: center">登记签到</el-menu-item>
                    <el-menu-item v-if="this.tempUser.level == 2" index="3" style="text-align: center"
                                  @click="gotoWokerInfo">员工管理
                    </el-menu-item>
                </el-menu>
                <el-button type="danger" @click="gotoTopPage" style="margin-top: 20px;">退出登录</el-button>
            </el-aside>
            <el-container>
                <el-main>
                    <div style="">
                        <span style="font-size: 14px;margin-left: 20px;">签到码：</span>
                        <el-input style="width: 200px; margin-left: 10px;" v-model="searchText"
                                  placeholder="请输入用户签到码">
                        </el-input>
                        <span style="font-size: 14px;margin-left: 10px;">签到状态：</span>
                        <el-select v-model="selectType" placeholder="请选择" style="margin-left: 10px;width: 100px;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button style="margin-left: 20px;" type="primary" icon="el-icon-search" @click="search">
                            搜索
                        </el-button>
                    </div>
                    <div style="height: 84%">
                        <el-table :data="users" height="100%" style="width: 100%;  margin: 20px;"
                                  :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                            <el-table-column label="序号" width="50px;">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column label="名称" prop="name"></el-table-column>
                            <el-table-column label="签到码" prop="code"></el-table-column>
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
                            <el-table-column label="签到情况" prop="signin">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.signin == 1 ? 'success': 'primary'">
                                        {{ scope.row.signin == 1 ? '签到成功' : '暂未签到' }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-popconfirm
                                            v-if="scope.row.signin == 0"
                                            style="margin-left: 10px;"
                                            title="是否为当前用户进行签到？"
                                            confirm-button-text='确认'
                                            cancel-button-text='取消'
                                            icon="el-icon-info"
                                            @confirm="editUser(scope.row)"
                                    >
                                        <el-button  type="primary" icon="el-icon-edit"
                                                   slot="reference">场地签到
                                        </el-button>
                                    </el-popconfirm>

                                    <el-popconfirm
                                        v-if="scope.row.signin == 1"
                                        style="margin-left: 10px;"
                                        title="是否为当前用户取消签到状态？"
                                        confirm-button-text='确认'
                                        cancel-button-text='取消'
                                        icon="el-icon-info"
                                        @confirm="editUser(scope.row)"
                                    >
                                        <el-button  type="danger" icon="el-icon-edit"
                                                   slot="reference">取消签到
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
                                :total="totalNum">
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
            options: [{
                value: 'all',
                label: '(全部)'
            }, {
                value: 'signing',
                label: '已签到'
            }, {
                value: 'notsigning',
                label: '未签到'
            }],
            selectType: 'all',
            tempUser: {
                name: 'admin',
                gender: 0,
                level: 3,
            },
            admin_name: 'ChenShenShi',
            searchText: '',
            order: '',
            currentPage: 1,
            pageSize: 10,
            totalNum: 20,
            users: [
            ],
        };
    },
    mounted() {
        this.initUser();
        this.getList();
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.getList();
        },
        getList() {
            const data = {pageid: this.currentPage, pagenumber: this.pageSize, selectType: this.selectType};
            const jsonStr = JSON.stringify(data);
            axios({
                    method: "post",
                    url: "http://localhost:9000/order/all",
                    data: jsonStr
                }
            ).then((res) => {
                const dataList = res.data.data;
                this.totalNum = res.data.totalNumbers;
                this.users = [];
                for (let i = 0; i < dataList.length; i++) {
                    const tempItem = dataList[i];
                    const pushItem = {
                        id: tempItem.id,
                        name: tempItem.name,
                        nickname: tempItem.nickname,
                        gender: tempItem.gender,
                        code: tempItem.code,
                        phone: tempItem.phone,
                        email: tempItem.email,
                        lastLoginTime: tempItem.Logintime.slice(0, 10) + " " + tempItem.Logintime.slice(11, 19),
                        signin: tempItem.signin,
                    }
                    this.users.push(pushItem);
                }
            })
        },
        initUser() {
            const userId = parseInt(this.$route.query.id);
            const data = {id: userId};
            const jsonStr = JSON.stringify(data);
            axios({
                    method: "post",
                    url: "http://localhost:9000/adminuser/queryid",
                    data: jsonStr
                }
            ).then((res) => {
                this.tempUser = res.data.data[0];
            })
        },
        editUser(user) {
            // 编辑员工操作
            console.log(user)
            const data = {id: user.id};
            const jsonStr = JSON.stringify(data);
            if (user.signin == 1){
                axios({
                        method: "post",
                        url: "http://localhost:9000/order/UpdateSigninBy0",
                        data: jsonStr
                    }
                ).then((res) => {
                    this.$toast.success('签到状态修改成功')
                    this.searchText = ''
                    this.getList();
                })
            } else {
                axios({
                        method: "post",
                        url: "http://localhost:9000/order/UpdateSigninBy1",
                        data: jsonStr
                    }
                ).then((res) => {
                    this.$toast.success('签到状态修改成功')
                    this.searchText = ''
                    this.getList();
                })
            }
        },
        search() {
            if (this.searchText == '') {
                this.getList();
                return;
            }
            const data = {code: parseInt(this.searchText)};
            const jsonStr = JSON.stringify(data);
            axios({
                    method: "post",
                    url: "http://localhost:9000/order/code",
                    data: jsonStr
                }
            ).then((res) => {
                const dataList = res.data.data;
                this.users = [];
                this.totalNum = 1;
                for (let i = 0; i < dataList.length; i++) {
                    const tempItem = dataList[i];
                    const pushItem = {
                        id: tempItem.id,
                        name: tempItem.name,
                        nickname: tempItem.nickname,
                        gender: tempItem.gender,
                        code: tempItem.code,
                        phone: tempItem.phone,
                        email: tempItem.email,
                        lastLoginTime: tempItem.Logintime.slice(0, 10) + " " + tempItem.Logintime.slice(11, 19),
                        signin: tempItem.signin,
                    }
                    this.users.push(pushItem);
                }
            })
        },
        // 跳转到登录页面
        gotoTopPage() {
            this.$toast.error('退出成功')
            setTimeout(() => {
                this.$router.push('/')
            }, 1500)
        },

        // 跳转到员工管理页面
        gotoWokerInfo() {
            this.$router.push('/WorkerInfo?id=' + this.$route.query.id)
        },

        // 跳转到概要展示页面
        gotoShowInfo() {
            this.$router.push('/ShowInfo?id=' + this.$route.query.id)
        }
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
