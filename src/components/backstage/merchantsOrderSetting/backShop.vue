<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="店铺名">
        <el-input v-model="dname" placeholder="请输入店铺名"></el-input>
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
              style="width: 100%;" header-align="center"
              :data="shopList"
              @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        v-if="false"
        prop="shopId"
        align="center"
        label="店铺id"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="商铺名"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="joinName"
        align="center"
        label="联系人"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="联系电话"
        min-width="100">
      </el-table-column>
      <el-table-column label="店铺地址" align="center">
        <el-table-column
          align="center"
          prop="provinceVo.name"
          label="省份"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cityVo.name"
          label="市区"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="areaVo.name"
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
        align="center"
        label="店铺状态"
        min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.state==0">未审核</span>
          <span v-if="scope.row.state==1">通过</span>
          <span v-if="scope.row.state==2">驳回</span>
          <span v-if="scope.row.state==3">上线</span>
          <span v-if="scope.row.state==4">下线</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click=" update(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="delpinlun(scope.row.shopId)">
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
  import Add from "./backShop/add";
  import Update from "./backShop/update";

  export default {
    name: "backShop",
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
        if(this.multipleSelection[0]==null){
          return this.$message({
            message: '请选择需要删除的供应商',
            type: 'warning'
          });
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          const length = _this.multipleSelection.length;

          for (let i = 0; i < length; i++) {
            var params = new URLSearchParams();
            params.append("id", _this.multipleSelection[i]);
            this.$axios.post("/shop/deleteShopVo", params).then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: '删除成功',
                type: 'success'
              });

              _this.getData();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              _this.$message.error("删除失败");
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //操作多选
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => item.shopId);
        console.log(this.multipleSelection)
      },
      getData: function () {
        console.log("刷新")
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        params.append("name", _this.dname);
        this.$axios.post("/shop/selectShopVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.shopList = result.data.records;
          _this.total = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      delpinlun(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);

        this.$axios.post("/shop/deleteShopVo", params).then(function (result) {  //成功  执行then里面的方法

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
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        total: 0, //总页数
        dname: "",
        shopList: [],
        multipleSelection: [],//多选的数据
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
