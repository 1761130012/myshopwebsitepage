<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="员工名">
        <el-input v-model="queryParams.name" placeholder="角色名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
        >新增
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="warning"
          icon="el-icon-edit"
          size="small"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-form-item>
    </el-form>

    <!--    表格"-->
    <el-table
      :data="roleList"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @row-click="clickRow"
      ref="moviesTable"
      style="width: 100%" header-align="center">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="角色序号"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="name"
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
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click="handleUpdate(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
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

    <!-- 添加或修改角色信息对话框 -->
    <el-dialog :title="title" :visible.sync="open">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
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
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        name: undefined
      },
      // 表单参数
      form: {
        roleId: undefined,
        name: undefined,
        remark: undefined
      },
      // 表单校验
      rules: {
        name: [{
          required: true,
          message: '请输入角色名',
          trigger: 'blur'
        }]
      },
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
      _this.$axios({
        url: 'role/queryPageVo',
        method: 'post',
        params: {
          page: _this.pageNum,
          rows: _this.pageSize,
          name: _this.queryParams.name
        },
      }).then(function (result) {   //异步调用成功
        //去结果result中拿数据   data属性
        _this.roleList = result.data.records;
        //计算总页数
        _this.total = result.data.total;

        _this.loading = false;
      })
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
      this.open = false;
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId)
      this.single = selection.length !== 1
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
      this.title = "添加用户信息";
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      let id = row.roleId || this.ids
      let _this = this;
      let params = new URLSearchParams();
      params.append("id", id);
      this.$axios.post("role/querybid", params)
        .then(function (response) {
          _this.form = response.data;
          _this.open = true;
          _this.title = "修改用户信息";
        })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != null) {
            this.$axios({
              url: "role/updata",
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
              this.getList();
            });
          } else {
            this.$axios({
              url: "role/add",
              method: "post",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              data: JSON.stringify(
                this.form
              )
            }).then(response => {
              this.$message({showClose: true, message: "新增成功", type: "success"});
              this.reset();
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete: function (row) {
      let userIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色信息编号为"' + userIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (typeof (userIds) === "number") {
          userIds = [userIds];
        }
        this.$axios({
          url: 'role/delete',
          method: 'post',
          data: JSON.stringify(userIds),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
            this.$message({showClose: true, message: "删除成功", type: "success"});
            this.getList();
          }
        )
      }).catch(()=>{})
    }

  },
}
</script>

<style scoped>

</style>
