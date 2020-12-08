<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" :model="role" class="demo-form-inline">
      <el-form-item label="员工名">
        <el-input v-model="role.name" placeholder="角色名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmitrole" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="roleialogFormVisibleadd=true">
          添加
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格-->
    <el-table
      :data="roletableData.slice((rolecurrentPage-1)*rolepagesize,rolecurrentPage*rolepagesize)"
      border
      style="width: 100%" header-align="center">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="roleid"
        label="角色序号"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" @click="handleEdit(scope.row.roleid)" size="small"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination background @size-change="rolehandleSizeChange" @current-change="rolehandleCurrentChange"
                       :current-page="1" :page-sizes="[5,10,15,20]" :page-size="5"
                       layout="total, sizes, prev, pager, next, jumper" :total="roletableData.length">
        </el-pagination>
      </el-col>
    </el-row>
    <!--    添加框-->
    <el-dialog title="角色添加" :visible.sync="roleialogFormVisibleadd">
      <el-form :model="roleadd" label-width="100px" :rules="rolerulesadd" ref="roleadd">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="roleadd.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleadd.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleaddresetForm('roleadd')">重置</el-button>
        <el-button type="primary" @click="roleaddsubmit('roleadd')">确 定</el-button>
      </div>
    </el-dialog>

    <!--    修改框-->
    <el-dialog title="角色编辑" :visible.sync="roleialogFormVisibleedit">
      <el-form :model="roleedit" label-width="100px" :rules="rolerules" ref="roleedit">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="roleedit.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleedit.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleeditresetForm('roleedit')">重置</el-button>
        <el-button type="primary" @click="roleeditsubmit('roleedit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: {
        name: ''
      },
      roleedit: {
        name: "",
        remark: ""
      },
      roleadd: {
        name: "",
        remark: ""
      },
      roleialogFormVisibleedit: false,
      roleialogFormVisibleadd: false,
      roletableData: [{
        roleid: "1",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "2",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "3",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "4",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "5",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "6",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "7",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "8",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "9",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "10",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        roleid: "11",
        rolename: '超级管理员',
        remark: '上海市普陀区金沙江路 1518 弄'
      }],
      rolepageTotal: 0,
      rolecurrentPage: 1, //默认第一页
      rolepagesize: 5, //当前显示页数
      rolerules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        remark: [
          {required: true, message: '请输入备注', trigger: 'blur'}
        ]
      },
      rolerulesadd: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        remark: [
          {required: true, message: '请输入备注', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmitrole() {
      console.log('submit!');
    },
    roleeditsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.roleeditresetForm(formName);
          this.roleialogFormVisibleedit = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    roleaddsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.roleaddresetForm(formName);
          this.roleialogFormVisibleadd = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    roleaddresetForm(formName) {
      this.$refs[formName].resetFields();
    },
    roleeditresetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(id) {
      this.roleialogFormVisibleedit = true  //打开窗口
    },
    rolehandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.rolepagesize = val;
    },
    rolehandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.rolecurrentPage = val;

    }
  }
}
</script>

<style scoped>

</style>
