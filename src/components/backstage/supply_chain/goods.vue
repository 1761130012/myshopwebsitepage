<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应链管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询-->
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="商品名称:">
        <el-input v-model="queryParams.name" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品类型:">
        <el-select v-model="queryParams.typeId" placeholder="请选择">
          <el-option :key="select.value" :label="select.name" :value="select.value"></el-option>
          <el-option v-for="g in goodsTypeVo" :key="g.typeId" :label="g.name" :value="g.typeId"></el-option>
        </el-select>
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
        <el-button
          type="warning"
          icon="el-icon-edit"
          size="small"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
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
      </el-form-item>
      <!--    表格"-->
      <el-table
        :data="goodsList"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        @row-click="clickRow"
        ref="moviesTable"
        border
        style="width: 100%" header-align="center">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="goodsId"
          label="商品编号"
          min-width="80">
        </el-table-column>

        <el-table-column
          prop="name"
          label="商品名称"
          min-width="120">
        </el-table-column>

        <el-table-column
          label="商品类型"
          min-width="120">
          <template slot-scope="scope">
          <span style="margin-left: 10px">
          <span v-if="scope.row.goodsTypeVo.name!=null">  {{scope.row.goodsTypeVo.name}}</span>
          </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="price"
          label="商品价格"
          min-width="120">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="商品描述"
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
            <el-tooltip class="item" effect="dark" content="添加商品图片" placement="top-end">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="particulars(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--   分页-->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNum"
                     :page-sizes="[5, 10, 20, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">  <!--//这是显示总共有多少数据，-->
      </el-pagination>
    </el-form>
<!--    <my-add ref="addGoodsRef" @handleQuery="handleQuery"></my-add>-->
<!--    <my-update ref="updGoodsRef" @handleQuery="handleQuery"></my-update>-->

  </div>
</template>

<script>
  // import Add from "./goods/add";
  // import Update from "./goods/update";
  import Particulars from "./goods/particulars";
  export default {
    name: "goods",
    data: function () {
      return {
        // 遮罩层
        loading: false,
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
        //初始化数据
        goodsList: [],

        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          name: undefined,
          typeId: undefined,
        },
        // 表单参数
        form: {
          goodsId: undefined,
          name: undefined,
          typeId: undefined,
          price: undefined,
          remark: undefined,
        },
        select: {name: '全部', value: 0},
        goodsTypeVo: [],
      }
    }, methods: {
      //分页
      handleCurrentChange(pageNum) {
        this.pageNum = pageNum;
        this.getList();
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange(pageSize) {

        this.pageSize = pageSize;
        this.getList();
      },
      //初始化数据
      getList() {
        var _this = this;  //将当前vue对象保存到临时变量  _this中
        _this.loading = true;
        //初始化表格数据
        _this.$axios({
          url: 'goods/queryPageVo',
          method: 'post',
          params: {
            page: _this.pageNum,
            rows: _this.pageSize,
            name: _this.queryParams.name,
            typeId: _this.queryParams.typeId,
          },
        }).then(function (result) {
          _this.goodsList = result.data.records;
          //计算总页数
          _this.total = result.data.total;
          _this.loading = false;
        })
        //加载下拉框
        _this.$axios({
          url: 'goods/queryGoodsTypeVo',
          method: 'post',
        }).then(function (result) {
          _this.goodsTypeVo = result.data;
        })

      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.goodsId)
        this.single = selection.length !== 1
        this.multiple = !selection.length;
      },
      //表格单击
      clickRow(row) {
        this.$refs.moviesTable.toggleRowSelection(row);
      },
      //查询的方法
      handleQuery() {
        this.pageNum = 1;
        this.getList();
      },
      //添加的方法
      handleAdd() {
        this.$refs.addGoodsRef.getData();
      },
      //修改的方法
      handleUpdate(row) {
        let id = row.goodsId || this.ids
        this.$refs.updGoodsRef.getData(id);
      },
      //添加商品图片的按钮
      particulars(row){
        let id = row.goodsId;
        this.$refs.addParticularsRef.getData(id);
      },
      //删除
      handleDelete(row) {
        var _this = this;
        let id = row.goodsId || this.ids;
        //提示信息
        this.$confirm('是否确认删除用户信息编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = new URLSearchParams();
          params.append('ids', id);
          this.$axios.post("goods/delGoogsGyId", params).then(function (result) {
            if (result) {
              _this.$message({message: '恭喜你，删除成功', type: 'success'});
              _this.handleQuery();
            } else {
              _this.$message({message: '删除失败', type: 'success'});
            }

          })
        })

      }

    },
    //组件创建成功调用
    created: function () {
      this.getList();
    },
    //导入外部vue
    components: {
      // myAdd: Add,
      // myUpdate: Update,
      myParticulars:Particulars,
    }

  }
</script>

<style scoped>

</style>
