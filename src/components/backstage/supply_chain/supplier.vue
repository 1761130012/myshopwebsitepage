<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应链管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--        查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="供应商名姓名：">
        <el-input v-model="sname" placeholder="请输入供应商名姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click=" addMethod ">
          添加
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small" @click="del" icon="el-icon-delete">批量删除</el-button>
      </el-form-item>

    </el-form>

    <el-table border
              :data="supplierList"
              style="width: 100%;" header-align="center"
              @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        min-width="70"
      >
      </el-table-column>
      <el-table-column
        prop="supId"
        align="center"
        label="供应商id"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="供应商名"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="joinName"
        align="center"
        label="联系人"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="联系电话"
        min-width="150">
      </el-table-column>
      <el-table-column label="供应商地址" align="center">
        <el-table-column
          align="center"
          prop="gpsProvinceVo.name"
          label="省份"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gpsCityVo.name"
          label="市区"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gpsAreaVo.name"
          label="区县"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="详细地址"
          min-width="100">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click=" update(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="delpinlun(scope.row.supId)">
              <el-button type="danger" slot="reference" icon="el-icon-delete" size="small"></el-button>
            </el-popconfirm>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页-->
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


    <my-add ref="addRef" @getData="getData"></my-add>

    <my-update ref="updateRef" @getData="getData"></my-update>

  </div>
</template>

<script>

  import Add from "./supplier/add";
  import Update from "./supplier/update";

  export default {
    name: "supplier",
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        total: 0, //总页数
        sname: "",
        supplierList: [],
        multipleSelection: [],//多选的数据
      }
    },
    methods: {
      addMethod() {
        this.$refs.addRef.dialogVisible2 = true
      },
      handleSizeChange(val) {
        this.pagesize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      del() {
        var _this = this;
        const length = this.multipleSelection.length;

        for (let i = 0; i < length; i++) {
          var params = new URLSearchParams();
          params.append("id", _this.multipleSelection[i]);
          this.$axios.post("/supplier/deleteSupplierVo", params).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: '删除成功',
              type: 'success'
            });

            _this.getData();  //删除操作做完，刷新数据

          }).catch(function (error) { //失败 执行catch方法
            this.$message.error("删除失败");
          });
        }
      },
      //操作多选
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => item.supId);
        console.log(this.multipleSelection)
      },
      getData: function () {
        console.log("刷新")
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        params.append("name", _this.sname);
        this.$axios.post("/supplier/selectSupplierVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.supplierList = result.data.records;
          _this.total = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      delpinlun(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);

        this.$axios.post("/supplier/deleteSupplierVo", params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: '删除成功',
            type: 'success'
          });

          _this.getData();  //删除操作做完，刷新数据

        }).catch(function (error) { //失败 执行catch方法
          this.$message.error("删除失败");
        });

      },
      update(list) {
        this.$refs.updateRef.getData(list);
      }
    },
    components: {
      myAdd: Add,
      myUpdate: Update
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
