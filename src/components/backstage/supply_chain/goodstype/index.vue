<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应链管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="类型名">
        <el-input v-model="queryParams.name" placeholder="请输入类型名" clearable></el-input>
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
      :data="typeList"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @row-click="clickRow"
      ref="moviesTable"
      style="width: 100%" header-align="center">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="类型名" min-width="120" align="center"></el-table-column>
      <el-table-column label="操作" min-width="130" align="center">
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

    <!-- 添加或修改类型信息对话框 -->
    <el-dialog :title="title" :visible.sync="open">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="form.name"></el-input>
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
  name: "index",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      delname:[],
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
      typeList: [],
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
        typeId: undefined,
        name: undefined,
      },
      // 表单校验
      rules: {
        name: [{
          required: true,
          message: '请输入类型名',
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
        url: 'goods/queryTypeAll',
        method: 'post',
        params: {
          current: _this.pageNum,
          size: _this.pageSize,
          name: _this.queryParams.name
        },
      }).then(function (result) {   //异步调用成功
        //去结果result中拿数据   data属性
        _this.typeList = result.data.records;
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
      this.$refs.moviesTable.clearSelection();
      this.open = false;
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.typeId);
      this.delname=selection.map(item=>item.name);
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
      this.title = "添加商品类型信息";
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      let id = row.typeId || this.ids
      let _this = this;
      let params = new URLSearchParams();
      params.append("id", id);
      this.$axios.post("goods/queryByTypeId", params)
        .then(function (response) {
          _this.form = response.data;
          _this.open = true;
          _this.title = "修改商品类型信息";
        })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.typeId != null) {
            this.$axios({
              url: "goods/updateType",
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
              url: "goods/addType",
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
              this.pageNum = this.total%this.pageSize==0?this.total/this.pageSize:Math.floor(this.total/this.pageSize)+1;
              this.getList();
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete: function (row) {
      let typeIds = row.typeId || this.ids;
      let typename=row.name||this.delname;
      this.$confirm('是否确认删除角色名为"' + typename + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params=new URLSearchParams();
        params.append("ids",typeIds);
        this.$axios.post("goods/deleteType",params).then((option) => {
            this.$message({showClose: true, message: "删除成功", type: "success"});
            this.getList();
          }
        )
      }).catch(()=>{})
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
