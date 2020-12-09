<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" :model="staffquery" class="demo-form-inline">
      <el-form-item label="员工名">
        <el-input v-model="staffquery.name" placeholder="员工名" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="staffquery.sex" placeholder="性别" clearable>
          <el-option label="--请选择--" value="" clearable></el-option>
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名">
        <el-select v-model="staffquery.role" placeholder="角色名" clearable>
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
      <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="staffadd" >添加</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="staffedit">修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" :disabled="multiple" @click="staffdelete">删除</el-button>
    </el-row>
    <!--    表格-->
    <el-table
      :data="stafftableData.slice((staffcurrentPage-1)*staffpagesize,staffcurrentPage*staffpagesize)"
      border
      style="width: 100%" align="center" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="loginname"
        label="账号"
        min-width="130" align="center">
      </el-table-column>
      <el-table-column
        prop="staffid"
        label="员工序号"
        min-width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        min-width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="员工电话"
        min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="员工性别" min-width="120" align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" min-width="200" align="center"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click="staffhandleClick(scope.row)" size="small"
                       circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination background @size-change="staffhandleSizeChange" @current-change="staffhandleCurrentChange"
                       :current-page="1" :page-sizes="[5,10,15,20]" :page-size="5"
                       layout="total, sizes, prev, pager, next, jumper" :total="stafftableData.length">
        </el-pagination>
      </el-col>
    </el-row>

    <!--    添加/修改-->
    <el-dialog @close="cancel" :title="title" :visible.sync="staffdialog">
      <el-row :gutter="15">
        <el-form ref="staffadd" :model="staffformData" :rules="staffaddrules" size="smail"
                 label-width="100px">
          <el-col :span="12">
            <el-form-item label="登录名" prop="staff_loginname">
              <el-input v-model="staffformData.staff_loginname" placeholder="请输入登录名" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="staff_password">
              <el-input v-model="staffformData.staff_password" placeholder="请输入密码" clearable show-password
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="staff_name">
              <el-input v-model="staffformData.staff_name" placeholder="请输入昵称" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" prop="staff_email">
              <el-input v-model="staffformData.staff_email" placeholder="请输入Email" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="staff_phone">
              <el-input v-model="staffformData.staff_phone" placeholder="请输入联系电话" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="staff_sex">
              <el-radio-group v-model="staffformData.staff_sex" size="small">
                <el-radio v-for="(item, index) in staff_sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled" border>{{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="头像上传" prop="head_image">
              <el-upload ref="head_image" :file-list="head_imagefileList" :action="head_imageAction" disabled>
                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="staffclose">取 消</el-button>
        <el-button type="primary" @click="staffConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      staffquery: {
        name: "",
        sex: "",
        role: ""
      },
      stafftableData: [{
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '133',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '13334',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '5',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '16',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '1',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }, {
        staffid: '15',
        loginname: 'wangxiahu',
        password: '123456',
        name: '王小虎',
        email: '1136811865@qq.com',
        phone: "156731004871",
        sex: "0",
        createtime: "2016-05-04 15:23:12"
      }],
      staffpageTotal: 0,
      staffcurrentPage: 1, //默认第一页
      staffpagesize: 5,  //当前显示页数
      staffdialog: false,  //对话框
      staffformData: {
      },
      staffaddrules: {
        staff_loginname: [{
          required: true,
          message: '请输入登录名',
          trigger: 'blur'
        }],
        staff_password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        staff_name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
      },
      head_imageAction: 'https://8081/',
      head_imagefileList: [],
      staff_sexOptions: [{
        "label": "男",
        "value": 0
      }, {
        "label": "女",
        "value": 1
      }],
    }
  },
  methods: {
    //分页
    staffhandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.staffpagesize = val;
    },
    //分页
    staffhandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.staffcurrentPage = val;
    },
    // 取消按钮
    staffclose() {
      this.staffdialog = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        staff_id:"",
        staff_loginname: '',
        staff_password: undefined,
        staff_name: undefined,
        staff_email: undefined,
        staff_phone: undefined,
        staff_sex: 0,
        head_image: null
      };
      this.resetForm("staffformData");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.staffcurrentPage = 1;
      console.log(`查询...`);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    staffadd() {
      this.reset();
      this.open = true;
      this.title = "添加用户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids
      getUser(userId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },
    /** 提交按钮 */
    staffConfirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != null) {
            updateUser(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除用户信息编号为"' + userIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delUser(userIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    }
  }
}
</script>

<style scoped>
.el-upload__tip {
  line-height: 1.2;
}
</style>
