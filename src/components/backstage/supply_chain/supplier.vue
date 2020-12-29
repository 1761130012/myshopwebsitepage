<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应链管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <el-row>
      <el-col :span="12">
        <div style="width: 650px">
          <!--        查询表单-->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="供应商名姓名：">
              <el-input v-model="sname" style="width: 150px" placeholder="请输入供应商姓名"></el-input>
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
                    @row-click="supShop"
                    :data="supplierList"
                    style="width: 570px;" header-align="center"
                    @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              align="center"
              min-width="30"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="供应商名"
              min-width="30">
            </el-table-column>
            <el-table-column
              prop="joinName"
              align="center"
              label="联系人"
              min-width="30">
            </el-table-column>
            <el-table-column
              prop="phone"
              align="center"
              label="联系电话"
              min-width="30">
            </el-table-column>
            <el-table-column label="供应商地址" align="center">
              <el-table-column
                align="center"
                prop="gpsProvinceVo.name"
                label="省份"
                min-width="30">
              </el-table-column>
              <el-table-column
                align="center"
                prop="gpsCityVo.name"
                label="市区"
                min-width="30">
              </el-table-column>
              <el-table-column
                align="center"
                prop="gpsAreaVo.name"
                label="区县"
                min-width="30">
              </el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="详细地址"
                min-width="30">
              </el-table-column>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              min-width="70">
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
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-left:10px;">
          <!--          表单查询-->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品名称：">
              <el-input v-model="gname" style="width: 150px" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="goods" size="small">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click=" addGoods ">
                添加
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="delShop" icon="el-icon-delete">批量删除</el-button>
            </el-form-item>
          </el-form>
          <el-table border
                    :data="supplierShopList"
                    style="width: 570px;" header-align="center"
                    @selection-change="handleSelectionChangeShop"
          >
            <el-table-column
              type="selection"
              align="center"
              min-width="50"
            >
            </el-table-column>
            <el-table-column
              prop="goodsVo.name"
              align="center"
              label="商品名称"
              min-width="50">
            </el-table-column>
            <el-table-column
              prop="supplierVo.name"
              align="center"
              label="供应商名称"
              min-width="50">
            </el-table-column>
            <el-table-column
              prop="factoryPrice"
              align="center"
              label="进价"
              min-width="50">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                  <el-button type="warning" icon="el-icon-edit" @click="updateGoods(scope.row)"
                             size="small"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                  <el-popconfirm title="确定删除吗？" @confirm="delGoods(scope.row.id)">
                    <el-button type="danger" slot="reference" icon="el-icon-delete" size="small"></el-button>
                  </el-popconfirm>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页-->
          <el-pagination
            align="center"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total2">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <my-shopAdd ref="addGoodsRef" @goods="goods"></my-shopAdd>

    <my-shopUpdate ref="updateGoodsRef" @goods="goods"></my-shopUpdate>

    <my-add ref="addRef" @getData="getData"></my-add>

    <my-update ref="updateRef" @getData="getData"></my-update>
  </div>
</template>

<script>

  import Add from "./update/supplier/add";
  import Update from "./update/supplier/update";
  import AddShop from "./update/suplierShop/add";
  import UpdateShop from "./update/suplierShop/update";

  export default {
    name: "supplier",
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        total: 0, //总页数
        currentPage2: 1, //初始页
        pagesize2: 5,  //  每页的数据
        total2: 0, //总页数
        sId: 0,
        goodsname: '',
        sname: "",
        gname: "",
        supplierList: [],
        supplierShopList: [],
        multipleSelection: [],//多选的数据
        multipleSelectionShop: [],
      }
    },
    methods: {
      supShop(row) {
        this.goodsname = row.name;
        this.sId = row.supId;
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        params.append("supId", row.supId);
        params.append("name", this.gname);
        this.$axios.post("/supplier/selectSupplierShopVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.supplierShopList = result.data.records;
          _this.total2 = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      addMethod() {
        this.$refs.addRef.dialogVisible2 = true
      },
      addGoods() {
        if (this.goodsname == '') {
          return this.$message({
            message: '请先选择供应商',
            type: 'warning'
          });
        }
        this.$refs.addGoodsRef.getData(this.sId, this.goodsname);
        this.$refs.addGoodsRef.dialogVisible2 = true
      },
      handleSizeChange(val) {
        this.pagesize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      handleSizeChange2(val) {
        this.pagesize2 = val;
        this.goods();
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.goods();
      },
      del() {
        if (this.multipleSelection[0] == null) {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delShop() {
        if (this.multipleSelectionShop[0] == null) {
          return this.$message({
            message: '请选择需要删除的供应商商品',
            type: 'warning'
          });
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          const length = this.multipleSelectionShop.length;

          for (let i = 0; i < length; i++) {
            var params = new URLSearchParams();
            params.append("id", _this.multipleSelectionShop[i]);
            this.$axios.post("/supplier/deleteSupplierGoodsVo", params).then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: '删除成功',
                type: 'success'
              });

              _this.goods();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              this.$message.error("删除失败");
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //操作多选供应商
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => item.supId);
        console.log(this.multipleSelection)
      },
      //操作多选供应商商品
      handleSelectionChangeShop(val) {
        this.multipleSelectionShop = val.map(item => item.id);
        console.log(this.multipleSelectionShop)
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
      },
      delGoods(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);

        this.$axios.post("/supplier/deleteSupplierGoodsVo", params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: '删除成功',
            type: 'success'
          });
          _this.goods();
        }).catch(function (error) { //失败 执行catch方法
          _this.$message.error("删除失败");
        });
      },
      goods() {
        if (this.goodsname == '') {
          return this.$message({
            message: '请先选择供应商',
            type: 'warning'
          });
        }
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.currentPage2);
        params.append("rows", _this.pagesize2);
        params.append("supId", this.sId);
        params.append("name", this.gname);
        this.$axios.post("/supplier/selectSupplierShopVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.supplierShopList = result.data.records;
          _this.total2 = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      updateGoods(list) {

        this.$refs.updateGoodsRef.getData(list);
      },
    },
    components: {
      myAdd: Add,
      myUpdate: Update,
      myShopAdd: AddShop,
      myShopUpdate: UpdateShop
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
