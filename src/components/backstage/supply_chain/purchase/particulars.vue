<template>
  <div>
    <el-dialog :title="title" :visible.sync="purchaseParticularsVisible" :before-close="handleClose">
      <!--      查询-->
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="商品名称:">
          <el-input v-model="queryParams.name" placeholder="商品名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>
        </el-form-item>
      </el-form>
      <!--      表格-->
      <el-table
        @size-change="handleSizeChange" :data="purchaseList" v-loading="loading" ref="moviesTable" border
        style="width: 100%"  header-align="center">

        <el-table-column
          prop="id"
          label="编号"
          min-width="80">
        </el-table-column>

        <el-table-column
          label="供应商"
          min-width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.supplierVo.name!=null">{{scope.row.supplierVo.name}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="商品名称"
          min-width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.goodsVo.name!=null">{{scope.row.goodsVo.name}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="商品单价"
          min-width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.factoryPrice!=null">{{scope.row.factoryPrice}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="goodsCount"
          label="商品数量"
          min-width="120">
        </el-table-column>


        <el-table-column
          prop="createTime"
          label="商品生成日期"
          min-width="120">
        </el-table-column>

        <el-table-column
          label="商品保质日期"
          min-width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.saveTime!=null">{{scope.row.saveTime}}个月</span>
          </template>
        </el-table-column>


      </el-table>
      <el-row >
        <el-col :span="24">
          <el-card shadow="hover">
            <span style="font-size: 25px">总价格:</span>
            <span style="color: red;font-size: 25px">￥{{form.money}}</span>
          </el-card>
        </el-col>
      </el-row>

      <!--      分页-->
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
        purchaseList: [],

        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          name: undefined,
        },
        //表格数据
        form: {
          id: undefined,
          purId: undefined,
          supId: undefined,
          goodsCount: undefined,
          factoryPrice: undefined,
          createTime: undefined,
          saveTime: undefined,
          money: 0,
        },
        purchaseParticularsVisible: false,
        title: undefined,
        vo: {
          supplierVo: [],
          goodsVo: {},
        },
      }
    },
    methods: {
      //获取到初始化数据
      getList() {
        var _this = this;  //将当前vue对象保存到临时变量  _this中
        _this.loading = false;
        _this.$axios({
          url: 'purchase/selectShopPageVo',
          method: 'post',
          params: {
            page: _this.pageNum,
            rows: _this.pageSize,
            name: _this.queryParams.name,
            purId: _this.form.supId,
          },
        }).then(function (result) {   //异步调用成功
          //去结果result中拿数据   data属性
          _this.purchaseList = result.data.records;
          //计算总页数
          _this.total = result.data.total;
          _this.loading = false;
          _this.vo = result.data.records;
          _this.form.money = 0;
          // var money1=0;
          _this.purchaseList.forEach((item) => {
            _this.form.money +=Number(item.factoryPrice)*Number(item.goodsCount);
          })

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
      //打开方法
      getData(pur_id) {
        this.title = "采购单详情";
        this.queryParams.name = undefined;
        this.purchaseParticularsVisible = true;
        this.form.supId = pur_id;
        this.getList()
      },
      //查询的方法
      handleQuery() {
        this.pageNum = 1;
        this.getList();
      },//关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    }
  }
</script>

<style scoped>

</style>
