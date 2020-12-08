<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" :model="staff" class="demo-form-inline">
      <el-form-item label="员工名">
        <el-input v-model="staff.name" placeholder="员工名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="staff.sex" placeholder="性别">
          <el-option label="--请选择--" value=""></el-option>
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名">
        <el-select v-model="staff.role" placeholder="角色名">
          <el-option label="--请选择--" value=""></el-option>
          <el-option label="超级管理员" value="admin"></el-option>
          <el-option label="普通管理员" value="common"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="staffonSubmit" size="small">查询</el-button>
      </el-form-item>
    </el-form>
<!--    按钮组-->
    <el-row type="flex" justify="end">
      <el-button type="success" size="small" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
    </el-row>
<!--    表单-->
    <el-table
      :data="stafftableData.slice((staffcurrentPage-1)*staffpagesize,staffcurrentPage*staffpagesize)"
      border
      style="width: 100%" header-align="center">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="loginname"
        label="账号"
        min-width="130">
      </el-table-column>
      <el-table-column
        prop="staffid"
        label="员工序号"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="员工电话"
        min-width="150">
      </el-table-column>
      <el-table-column prop="sex" label="员工性别" min-width="120" >
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" min-width="200"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" @click="staffhandleClick(scope.row)" size="small"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination background @size-change="staffhandleSizeChange" @current-change="staffhandleCurrentChange" :current-page="1" :page-sizes="[5,10,15,20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="stafftableData.length">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staff:{
        name:"",
        sex:"",
        role:""
      },
      stafftableData: [{
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex:"0",
        createtime:"2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex:"0",
        createtime:"2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex:"0",
        createtime:"2016-05-04 15:23:12"
      }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        },{
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }, {
          staffid: '1',
          loginname: 'wangxiahu',
          password: '123456',
          name: '王小虎',
          email: '1136811865@qq.com',
          phone: "156731004871",
          sex:"0",
          createtime:"2016-05-04 15:23:12"
        }],
      staffpageTotal: 0,
      staffcurrentPage:1, //默认第一页
      staffpagesize: 5  //当前显示页数
  }
  },
  methods:{
    staffonSubmit() {
      console.log('submit!');
    },
    staffhandleClick(row) {
      console.log(row);
    },
    staffhandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    staffhandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;

    }
  }
}
</script>

<style scoped>

</style>
