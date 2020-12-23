<template>
  <div>
    <el-dialog :title="title" :visible.sync="particularsVisible">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">

        <el-form-item label="仓库名称:">
          <el-input v-model="queryParams.name" placeholder="商品名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>
        </el-form-item>

      </el-form>
      <!--    表格"-->
      <el-table
        @size-change="handleSizeChange"
        :data="particularsList"
        v-loading="loading"
        ref="moviesTable"
        border
        style="width: 100%" header-align="center">

        <el-table-column
          prop="id"
          label="编号"
          min-width="80">
        </el-table-column>


        <el-table-column
          prop="goodsVo.name"
          label="商品名称"
          min-width="120">
        </el-table-column>

        <el-table-column
          prop="factoryPrice"
          label="商品出厂价"
          min-width="120">
        </el-table-column>


        <el-table-column
          prop="goodsCount"
          label="商品库存"
          min-width="120">
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


    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "particulars",
    data() {
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
        particularsList: [],

        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          name: undefined
        },
        form: {
          id:undefined,
          warehouseId:undefined,
          factoryPrice:undefined,
          goodsVo: {name:undefined,remark:undefined},
          warehouseVo: {name:"",maxCount:undefined},
        },
        particularsVisible: false,
        title: "",
        wid:1,
      }
    }, methods: {
      //初始化数据
      getList(){
        this.title="仓库详情";
        var _this = this;  //将当前vue对象保存到临时变量  _this中
        _this.loading = false;
        _this.$axios({
          url: 'warehouse/particulars',
          method: 'post',
          params: {
            page: _this.pageNum,
            rows: _this.pageSize,
            name: _this.queryParams.name,
            warehouseId:_this.wid,
          },
        }).then(function (result) {   //异步调用成功
          //去结果result中拿数据   data属性
          _this.particularsList = result.data.records;
          //计算总页数
          _this.total = result.data.total;
          // alert(_this.form.warehouseVo.name);
          _this.loading = false;

        })

      },
      //分页
      handleCurrentChange: function (pageNum) {
        this.pageNum = pageNum;
        this.getList();
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.getList();
      },
      getData(id) {
        this.queryParams.name=undefined;
        this.particularsVisible = true;
        this.wid=id;
        this.getList()
      }, handleQuery() {
        this.getList();
      }
    }, created() {
      // this.getList();
    }
  }
</script>

<style scoped>

</style>
