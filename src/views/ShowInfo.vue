<template>
  <div style="height: 100%;">
    <el-button @click="search">asdawd</el-button>
    <el-container style="height:100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <img src="../assets/admin_icon.png" style="height: 200px; width: 200px;">
        <p style="text-align: center; font-size: 14px;">当前操作员：
          <br> {{ admin_name }}
        </p>

        <el-menu>
          <el-menu-item index="1-1" style="text-align: center">概要展示</el-menu-item>
          <el-menu-item index="1-2" style="text-align: center">登记签到</el-menu-item>
          <el-menu-item index="1-3" style="text-align: center">员工管理</el-menu-item>
        </el-menu>
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
                  <el-tag>已签：20人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px">未签：20人</el-tag>
                </div>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;margin-left: 50px;">
              <img src="../assets/乒乓.webp"
                   class="image" style="width: 250px;height: 255px;">
              <div style="padding: 14px;">
                <span>乒乓球场</span>
                <div style="margin-top: 5px;">
                  <el-tag>已签：20人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px">未签：20人</el-tag>
                </div>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;margin-left: 50px;">
              <img src="../assets/羽毛球.jpeg"
                   class="image" style="width: 250px;height: 255px;">
              <div style="padding: 14px;">
                <span>羽毛球场</span>
                <div style="margin-top: 5px;">
                  <el-tag>已签：20人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px">未签：20人</el-tag>
                </div>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }" style="height: 350px;width: 250px;margin-left: 50px;">
              <img src="../assets/网球.webp"
                   class="image" style="width: 250px;height: 255px;">
              <div style="padding: 14px;">
                <span>网球场</span>
                <div style="margin-top: 5px;">
                  <el-tag>已签：20人</el-tag>
                  <el-tag type="danger" style="margin-left: 10px">未签：20人</el-tag>
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
                  :data="tableData"
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
                    label="地址">
                </el-table-column>
              </el-table>
            </div>
            <div style="width: 40%; height: 250px; margin-left: 100px;">
              <el-table
                  :data="tableData"
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
                    label="地址">
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
      admin_name: 'ChenShenShi',
      searchText: '',
      order: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
  methods: {
    editUser(user) {
      // 编辑员工操作
    },
    deleteUser(user) {
      // 删除员工操作
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
