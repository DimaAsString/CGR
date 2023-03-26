<template>
  <div>
    <div style="margin: 20px;">
      <el-button  type="primary" icon="el-icon-plus">添加用户</el-button>
      <el-input style="width: 200px; margin-left: 20px;" v-model="searchText" placeholder="请输入用户名称"></el-input>
      <el-select style=" width: 150px;margin-left: 20px;" v-model="order" placeholder="请选择排序方式">
        <el-option label="升序" value="asc"></el-option>
        <el-option label="倒序" value="desc"></el-option>
      </el-select>
      <el-button style="margin-left: 20px;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <el-table :data="users" style="width: 100%;margin: 20px;text-align: center">
      <el-table-column fixed label="名称" prop="name" width="100"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="账户余额" prop="balance"></el-table-column>
      <el-table-column label="最近登录时间" prop="lastLoginTime"></el-table-column>
      <el-table-column label="注册时间" prop="registerTime"></el-table-column>
      <el-table-column label="信息更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="诚信值" prop="credit"></el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="editUser(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: '',
      order: '',
      users: [
        {
          name: '张三',
          nickname: '三儿',
          gender: '男',
          phone: '13800138000',
          email: 'zhangsan@test.com',
          balance: 1000,
          lastLoginTime: '2021-08-01 10:00:00',
          registerTime: '2021-01-01 00:00:00',
          updateTime: '2021-08-01 10:00:00',
          credit: 95,
        },
        {
          name: '李四',
          nickname: '四儿',
          gender: '女',
          phone: '13900139000',
          email: 'lisi@test.com',
          balance: 2000,
          lastLoginTime: '2021-08-02 10:00:00',
          registerTime: '2021-02-01 00:00:00',
          updateTime: '2021-08-02 10:00:00',
          credit: 98,
        },
        {
          name: '王五',
          nickname: '五儿',
          gender: '男',
          phone: '13600136000',
          email: 'wangwu@test.com',
          balance: 3000,
          lastLoginTime: '2021-08-03 10:00:00',
          registerTime: '2021-03-01 00:00:00',
          updateTime: '2021-08-03 10:00:00',
          credit: 99,
        },
      ],
    };
  },
  methods: {
    editUser(user) {
      // 编辑用户操作
    },
    deleteUser(user) {
      // 删除用户操作
    },
    search() {
      // 搜索操作
    },
  },
};
</script>
