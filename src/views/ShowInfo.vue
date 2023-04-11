<template>
    <div style="height: 100%;">
        <el-container style="height:100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); text-align: center">
                <img src="../assets/headIMG.jpg" style="height: 200px; width: 200px;">
                <p style="text-align: center; font-size: 14px;">当前操作员：
                    <br> {{ tempUser.name }}
                </p>

                <el-menu default-active="1">
                    <el-menu-item index="1" style="text-align: center">概要展示</el-menu-item>
                    <el-menu-item index="2" style="text-align: center" @click="gotoUserInfo">登记签到</el-menu-item>
                    <el-menu-item v-if="this.tempUser.level == 2" index="3" style="text-align: center"
                                  @click="gotoWokerInfo">员工管理
                    </el-menu-item>
                </el-menu>
                <el-button type="danger" @click="gotoTopPage" style="margin-top: 20px;">退出登录</el-button>
            </el-aside>
            <el-container>
                <el-main>
                    <div id="top_list">
                        <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;">
                            <img src="../assets/篮球.jpg"
                                 class="image" style="width: 250px;height: 255px;">
                            <div style="padding: 14px;">
                                <span>篮球场</span>
                                <div style="margin-top: 5px;">
                                    <el-tag>已签：{{ this.sportList[0].signinNum }}人</el-tag>
                                    <el-tag type="danger" style="margin-left: 10px">未签：{{ this.sportList[0].notsigninNum }}人</el-tag>
                                </div>
                            </div>
                        </el-card>

                        <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;margin-left: 50px;">
                            <img src="../assets/乒乓.webp"
                                 class="image" style="width: 250px;height: 255px;">
                            <div style="padding: 14px;">
                                <span>乒乓球场</span>
                                <div style="margin-top: 5px;">
                                    <el-tag>已签：{{ this.sportList[1].signinNum }}人</el-tag>
                                    <el-tag type="danger" style="margin-left: 10px">未签：{{ this.sportList[1].notsigninNum }}人</el-tag>
                                </div>
                            </div>
                        </el-card>

                        <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;margin-left: 50px;">
                            <img src="../assets/羽毛球.jpeg"
                                 class="image" style="width: 250px;height: 255px;">
                            <div style="padding: 14px;">
                                <span>羽毛球场</span>
                                <div style="margin-top: 5px;">
                                    <el-tag>已签：{{ this.sportList[2].signinNum }}人</el-tag>
                                    <el-tag type="danger" style="margin-left: 10px">未签：{{ this.sportList[2].notsigninNum }}人</el-tag>
                                </div>
                            </div>
                        </el-card>

                        <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;margin-left: 50px;">
                            <img src="../assets/网球.webp"
                                 class="image" style="width: 250px;height: 255px;">
                            <div style="padding: 14px;">
                                <span>网球场</span>
                                <div style="margin-top: 5px;">
                                    <el-tag>已签：{{ this.sportList[3].signinNum }}人</el-tag>
                                    <el-tag type="danger" style="margin-left: 10px">未签：{{ this.sportList[3].notsigninNum }}人</el-tag>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div style="text-align: center; display: flex;">
                        <h1 style="width: 50%">已签到人员展示</h1>
                        <h1 style="width: 50%">未签到人员展示</h1>
                    </div>
                    <div id="down_list">
                        <div style="width: 40%; height: 250px;">
                            <el-table
                                    :data="signinList"
                                    height="100%"
                                    border
                                    style="width: 100%;">
                                <el-table-column
                                        prop="date"
                                        label="日期"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="姓名"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="状态">
                                    <el-tag>已签到</el-tag>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="width: 40%; height: 250px; margin-left: 100px;">
                            <el-table
                                    :data="notsigninList"
                                    height="100%"
                                    border
                                    style="width: 100%;">
                                <el-table-column
                                        prop="date"
                                        label="日期"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="姓名"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="状态">
                                    <el-tag type="danger">未签到</el-tag>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            tempUser: {
                name: 'admin',
                gender: 0,
                level: 3,
            },
            admin_name: 'ChenShenShi',
            searchText: '',
            order: '',
            tableData: [],
            signinList: [],
            notsigninList: [],
            sportList: [],
            users: [
                {
                    name: '陈龙',
                    nickname: '珅式',
                    gender: 0,
                    code: '1008',
                    phone: '13800138000',
                    email: 'ShenSHI@test.com',
                    lastLoginTime: '2021-08-01 10:00:00',
                },
                {
                    name: '陈龙',
                    nickname: '珅式',
                    gender: 1,
                    code: '1006',
                    phone: '13800138000',
                    email: 'ShenSHI@test.com',
                    lastLoginTime: '2021-08-01 10:00:00',
                },
            ],
        };
    },
    mounted() {
        this.initUser();
        this.getList();
    },
    methods: {
        //  展示页查询数据
        getList() {
            const jsonStr = JSON.stringify({});
            axios({
                    method: "post",
                    url: "http://192.168.31.82:9000/order/signin",
                    data: jsonStr
                }
            ).then((res) => {
                console.log(res.data)
                this.signinList = []
                this.notsigninList = []
                this.sportList = res.data.siginsport
                for (let i = 0; i < res.data.signinList.length; i++) {
                    const tempItem = res.data.signinList[i]
                    const item = {
                        date: tempItem.orderdate.slice(0, 10) + " " + tempItem.orderdate.slice(11, 19),
                        name: tempItem.name,
                    }
                    this.signinList.push(item)
                }
                for (let i = 0; i < res.data.notsigninList.length; i++) {
                    const tempItem = res.data.notsigninList[i]
                    const item = {
                        date: tempItem.orderdate.slice(0, 10) + " " + tempItem.orderdate.slice(11, 19),
                        name: tempItem.name,
                    }
                    this.notsigninList.push(item)
                }
            })
        },
        initUser() {
            const userId = parseInt(this.$route.query.id);
            const data = {id: userId};
            const jsonStr = JSON.stringify(data);
            axios({
                    method: "post",
                    url: "http://192.168.31.82:9000/adminuser/queryid",
                    data: jsonStr
                }
            ).then((res) => {
                this.tempUser = res.data.data[0];
            })
        },
        search() {
            const data = {username: '111', password: '111'};
            const jsonStr = JSON.stringify(data)
            // 搜索操作
            axios({
                    method: "post",
                    url: "test.php",
                    data: jsonStr
                }
            ).then((res) => {
                console.log(res.data);
            })
        },

        // 跳转到用户签到页面
        gotoUserInfo() {
            this.$router.push('/UserInfo?id=' + this.$route.query.id)
        },
        // 跳转到员工管理页面
        gotoWokerInfo() {
            this.$router.push('/WorkerInfo?id=' + this.$route.query.id)
        },

        gotoTopPage() {
            this.$toast.error('退出成功')
            setTimeout(() => {
                this.$router.push('/')
            }, 1500)
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

#top_list {
    display: flex;
    justify-content: center;
    width: 100%;
}

#down_list {
    display: flex;
    justify-content: center;
}

</style>
