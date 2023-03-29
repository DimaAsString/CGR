<template>
  <div style="height: 100%;">
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
          <div style="">
            <el-button type="primary" icon="el-icon-plus">添加员工</el-button>
            <el-input style="width: 200px; margin-left: 20px;" v-model="searchText"
                      placeholder="请输入员工名称"></el-input>
            <el-select style=" width: 150px;margin-left: 20px;" v-model="order" placeholder="请选择排序方式">
              <el-option label="升序" value="asc"></el-option>
              <el-option label="倒序" value="desc"></el-option>
            </el-select>
            <el-button style="margin-left: 20px;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
          <div>
            <el-table :data="users" style="width: 100%;  margin: 20px;" :header-cell-style="{textAlign: 'center'}"
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
                  <el-button type="primary" @click="editUser(scope.row)">修改</el-button>
                  <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin_name: 'ChenShenShi',
      searchText: '',
      order: '',
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
        {
          name: '陈龙',
          nickname: '珅式',
          gender: 1,
          phone: '13800138000',
          email: 'ShenSHI@test.com',
          lastLoginTime: '2021-08-01 10:00:00',
          registerTime: '2021-01-01 00:00:00',
          updateTime: '2021-08-01 10:00:00',
        },
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
        {
          name: '陈龙',
          nickname: '珅式',
          gender: 1,
          phone: '13800138000',
          email: 'ShenSHI@test.com',
          lastLoginTime: '2021-08-01 10:00:00',
          registerTime: '2021-01-01 00:00:00',
          updateTime: '2021-08-01 10:00:00',
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
      // 搜索操作
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
