<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246); text-align: center"
      >
        <img src="../assets/headIMG.jpg" style="height: 200px; width: 200px" />
        <p style="text-align: center; font-size: 14px">
          当前操作员： <br />
          {{ tempUser.name }}
        </p>

        <el-menu default-active="1">
          <el-menu-item index="1" style="text-align: center"
            >概要展示</el-menu-item
          >
          <el-menu-item
            index="2"
            style="text-align: center"
            @click="gotoUserInfo"
            >登记签到</el-menu-item
          >
        </el-menu>
        <el-button type="danger" @click="gotoTopPage" style="margin-top: 20px"
          >退出登录</el-button
        >
      </el-aside>
      <el-container>
        <el-main>
          <div id="top_list">
            <el-card
              :body-style="{ padding: '0px' }"
              style="height: 350px; width: 250px"
            >
              <img
                src="../assets/篮球.jpg"
                class="image"
                style="width: 250px; height: 255px"
              />
              <div style="padding: 14px">
                <span>篮球场</span>
                <div style="margin-top: 5px">
                  <el-tag>已签：{{ this.sportList[0].signinNum }}人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px"
                    >未签：{{ this.sportList[0].notsigninNum }}人</el-tag
                  >
                </div>
              </div>
            </el-card>

            <el-card
              :body-style="{ padding: '0px' }"
              style="height: 350px; width: 250px; margin-left: 50px"
            >
              <img
                src="../assets/乒乓.webp"
                class="image"
                style="width: 250px; height: 255px"
              />
              <div style="padding: 14px">
                <span>乒乓球场</span>
                <div style="margin-top: 5px">
                  <el-tag>已签：{{ this.sportList[1].signinNum }}人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px"
                    >未签：{{ this.sportList[1].notsigninNum }}人</el-tag
                  >
                </div>
              </div>
            </el-card>

            <el-card
              :body-style="{ padding: '0px' }"
              style="height: 350px; width: 250px; margin-left: 50px"
            >
              <img
                src="../assets/羽毛球.jpeg"
                class="image"
                style="width: 250px; height: 255px"
              />
              <div style="padding: 14px">
                <span>羽毛球场</span>
                <div style="margin-top: 5px">
                  <el-tag>已签：{{ this.sportList[2].signinNum }}人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px"
                    >未签：{{ this.sportList[2].notsigninNum }}人</el-tag
                  >
                </div>
              </div>
            </el-card>

            <el-card
              :body-style="{ padding: '0px' }"
              style="height: 350px; width: 250px; margin-left: 50px"
            >
              <img
                src="../assets/网球.webp"
                class="image"
                style="width: 250px; height: 255px"
              />
              <div style="padding: 14px">
                <span>网球场</span>
                <div style="margin-top: 5px">
                  <el-tag>已签：{{ this.sportList[3].signinNum }}人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px"
                    >未签：{{ this.sportList[3].notsigninNum }}人</el-tag
                  >
                </div>
              </div>
            </el-card>
          </div>
          <div style="text-align: center; display: flex">
            <h1 style="width: 50%">已签到人员展示</h1>
            <h1 style="width: 50%">未签到人员展示</h1>
          </div>
          <div id="down_list">
            <div style="width: 40%; height: 250px">
              <el-table
                :data="signinList"
                height="100%"
                border
                style="width: 100%"
              >
                <el-table-column prop="date" label="日期"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="address" label="状态">
                  <el-tag>已签到</el-tag>
                </el-table-column>
              </el-table>
            </div>
            <div style="width: 40%; height: 250px; margin-left: 100px">
              <el-table
                :data="notsigninList"
                height="100%"
                border
                style="width: 100%"
              >
                <el-table-column prop="date" label="日期"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="address" label="状态">
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
import axios from "axios";

export default {
  data() {
    return {
      tempUser: {
        name: "admin",
        gender: 0,
        level: 3,
      },
      signinList: [],
      notsigninList: [],
      sportList: [
        {
          signinNum: 0,
          notsigninNum: 0,
          sportid: 1,
        },
        {
          signinNum: 0,
          notsigninNum: 0,
          sportid: 2,
        },
        {
          signinNum: 0,
          notsigninNum: 0,
          sportid: 3,
        },
        {
          signinNum: 0,
          notsigninNum: 0,
          sportid: 4,
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
        url: "http://localhost:8088/admin/showInfo",
        data: jsonStr,
        headers: {
          "Content-Type": "application/json", // 设置请求头
        },
      }).then((res) => {
        console.log(res.data);
        this.signinList = [];
        this.notsigninList = [];
        this.sportList = res.data.signingSport;
        if (res.data.signingList != null) {
          for (let i = 0; i < res.data.signingList.length; i++) {
            const tempItem = res.data.signingList[i];
            const item = {
              date:
                tempItem.orderdate.slice(0, 10) +
                " " +
                tempItem.orderdate.slice(11, 19),
              name: tempItem.name,
            };
            this.signinList.push(item);
          }
        }

        if (res.data.notSigningList != null) {
          for (let i = 0; i < res.data.notSigningList.length; i++) {
            const tempItem = res.data.notSigningList[i];
            const item = {
              date:
                tempItem.orderdate.slice(0, 10) +
                " " +
                tempItem.orderdate.slice(11, 19),
              name: tempItem.name,
            };
            this.notsigninList.push(item);
          }
        }
      });
    },
    // 初始化用户
    initUser() {
      const userId = parseInt(this.$route.query.id);
      const data = { userId: userId };
      const jsonStr = JSON.stringify(data);
      axios({
        method: "post",
        url: "http://localhost:8088/admin/selectAdminByID",
        data: jsonStr,
        headers: {
          "Content-Type": "application/json", // 设置请求头
        },
      }).then((res) => {
        this.tempUser.name = res.data.admin.name;
      });
    },

    // 跳转到用户签到页面
    gotoUserInfo() {
      this.$router.push("/UserInfo?id=" + this.$route.query.id);
    },

    gotoTopPage() {
      this.$toast.error("退出成功");
      setTimeout(() => {
        this.$router.push("/");
      }, 1500);
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
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
