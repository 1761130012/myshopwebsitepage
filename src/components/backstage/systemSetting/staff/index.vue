<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="员工名">
        <el-input v-model="queryParams.name" placeholder="请输入员工名" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable>
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-edit" size="small" :disabled="single" @click="handleUpdate">修改
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" icon="el-icon-delete" size="small" :disabled="multiple" @click="handleDelete">删除
        </el-button>
      </el-form-item>
    </el-form>

    <!--    表格.slice((queryParams.pageNum-1)*queryParams.pageSize,queryParams.pageNum*queryParams.pageSize)"-->
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange" @row-click="clickRow"
              ref="moviesTable" style="width: 100%" header-align="center">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="用户账号" align="center"  prop="loginName"/>
      <el-table-column label="用户姓名" align="center"  prop="name"/>
      <el-table-column label="用户密码" align="center"  prop="password"/>
      <el-table-column label="用户邮箱" align="center" :show-overflow-tooltip="true" prop="email"/>
      <el-table-column label="手机号码" align="center"  prop="phone"/>
      <el-table-column label="用户性别" align="center"  prop="sex" :formatter="formatter"/>
      <el-table-column label="创建时间" align="center"  :show-overflow-tooltip="true"  prop="createTime"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click="handleUpdate(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button type="danger" size="small" icon="el-icon-delete"
                       @click="handleDelete(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageNum"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">  <!--//这是显示总共有多少数据，-->
    </el-pagination>

    <!-- 添加或修改用户信息对话框 :rules="rules"-->
    <el-dialog :title="title" :visible.sync="open">
      <el-row :gutter="15">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-col :span="12">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="form.loginName" placeholder="请输入登录名" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" clearable show-password
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" placeholder="请输入昵称" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" placeholder="请输入Email" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex" size="small">
                <el-radio v-for="(item, index) in staff_sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled" border>{{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="头像上传" prop="head_image">
              <el-upload ref="head_image" action="">
                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "staff",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      delname: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      //第一页
      pageNum: 1,
      //每页显示多少
      pageSize: 5,
      // 用户信息表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        name: undefined,
        sex: undefined
      },
      // 表单参数
      form: {
        staffId: undefined,
        loginName: undefined,
        password: undefined,
        name: undefined,
        email: undefined,
        phone: undefined,
        sex: 0
      },
      // 表单校验
      rules: {
        loginName: [{
          required: true,
          message: '请输入登录名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        email: [
          {required: true, message: "邮箱地址不能为空", trigger: "blur"},
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {required: true, message: "手机号码不能为空", trigger: "blur"},
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      },
      staff_sexOptions: [{
        "label": "男",
        "value": 0
      }, {
        "label": "女",
        "value": 1
      }],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户信息列表 */
    getList() {
      var _this = this;  //将当前vue对象保存到临时变量  _this中
      _this.loading = true;
      /*var params = new URLSearchParams();
      params.append("page", _this.pageNum);
      params.append("rows", _this.pageSize);
      params.append("name",_this.queryParams.name);
      params.append("sex", _this.queryParams.sex);

      this.$axios.post("staff/queryPageVo", params)
        .then(function (result) {   //异步调用成功
          //去结果result中拿数据   data属性
          _this.userList = result.data.records;
          //计算总页数
          _this.total = result.data.total;
        })
        .catch(function (error) {
          alert(error);  //异步调用失败时，执行
        });*/
      _this.$axios({
        url: 'staff/queryPageVo',
        method: 'post',
        params: {
          page: _this.pageNum,
          rows: _this.pageSize,
          sex: _this.queryParams.sex,
          name: _this.queryParams.name
        },
      }).then(function (result) {   //异步调用成功
        //去结果result中拿数据   data属性
        _this.userList = result.data.records;
        _this.total = result.data.total;
        _this.loading = false;
      })
    },
    //格式
    formatter(row, column) {
      return row.sex === 0 ? "男" : "女";
    },

    //表格单击
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      this.getList();
    },

    //分页
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getList();
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getList();
    },

    //取消按钮
    cancel() {
      this.reset();
      this.$refs.moviesTable.clearSelection();
      this.open = false;
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.staffId);
      this.delname = selection.map(item => item.loginName);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //表单重置
    reset() {
      this.form = {};
      this.$refs['form'].resetFields();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加员工信息";
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      let id = row.staffId || this.ids
      let _this = this;
      let params = new URLSearchParams();
      params.append("id", id);
      this.$axios.post("staff/querybid", params)
        .then(function (response) {
          _this.form = response.data;
          _this.open = true;
          _this.title = "修改员工信息";
        })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.staffId != null) {
            this.$axios({
              url: "staff/updata",
              method: "post",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              data: JSON.stringify(
                this.form
              )
            }).then(response => {
              this.$message({showClose: true, message: "修改成功", type: "success"});
              this.reset();
              this.open = false;
              this.pageNum = this.pageNum;
              this.getList();
            });
          } else {
            this.$axios({
              url: "staff/add",
              method: "post",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              data: JSON.stringify(
                this.form
              )
            }).then(response => {
              this.$message({showClose: true, message: "新增成功", type: "success"});
              this.reset()
              this.open = false;
              this.pageNum = this.total%this.pageSize==0?this.total/this.pageSize:Math.floor(this.total/this.pageSize)+1;
              this.getList();
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete: function (row) {
      let staffIds = row.staffId || this.ids;
      let uesrname = row.loginName || this.delname;
      this.$confirm('是否确认删除员工账号为"' + uesrname + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (typeof (staffIds) === "number") {
          staffIds = [staffIds];
        }
        this.$axios({
          url: 'staff/delete',
          method: 'post',
          data: JSON.stringify(staffIds),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
            this.$message({showClose: true, message: "删除成功", type: "success"});
            // let totalPage = Math.ceil((this.total - 1) / this.pageSize); // 总页数
            // let currentPage = this.pageNum > totalPage ? totalPage : this.pageNum;
            // this.pageNum = currentPage < 1 ? 1 : currentPage;
          // if(this.total == (this.pageNum-1)*this.pageSize+1 && this.total != 0){
          //   this.pageNum -= 1
          // }
            this.getList();
          }
        )
      }).catch(() => {
      })
    }

  },
  watch: {
    total (newValue, oldValue) {
      // alert("我total变了")
      // console.log(newValue,oldValue)
      if(newValue != 0 &&  newValue == ((this.pageNum -1)*this.pageSize)){
        // alert("我执行了！！！")
        // console.log("watch生效了")
        this.pageNum -= 1;
        this.getList();
      }
    }
  }
  }
</script>

<style scoped>

</style>
