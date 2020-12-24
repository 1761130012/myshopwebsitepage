<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>审批管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购审批</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    表格"-->
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="采购主题:">
        <el-input v-model="queryParams.name" placeholder="主题" clearable></el-input>
      </el-form-item>
      <el-form-item label="日期查询:">
        <el-date-picker type="date" v-model="queryParams.date1" value-format="yyyy-MM-dd" aria-placeholder="日期"></el-date-picker>
        <i class="el-icon-right"></i>
        <el-date-picker type="date" v-model="queryParams.date2" value-format="yyyy-MM-dd" aria-placeholder="日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>
      </el-form-item>


    </el-form>
    <el-table
      :data="purchaseList"
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
        prop="purId"
        label="采购单编号"
        min-width="80">
      </el-table-column>

      <el-table-column
        prop="title"
        label="采购主题"
        min-width="120">
      </el-table-column>


      <el-table-column
        label="采购员工"
        min-width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.purStaff.loginName}}</span>
        </template>
      </el-table-column>


      <el-table-column
        prop="dataTime"
        label="采购日期"
        min-width="120">
      </el-table-column>


      <el-table-column
        prop="money"
        label="采购总金额"
        min-width="120">
      </el-table-column>


      <el-table-column
        label="状态"
        min-width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.state==0">未审批</span>
          <span style="margin-left: 10px" v-if="scope.row.state==1">已通过</span>
          <span style="margin-left: 10px" v-if="scope.row.state==2">未通过</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="通过" placement="top-start">
            <el-button type="success" icon="el-icon-edit" @click="handlePass(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="驳回" placement="top-end">
            <el-button type="danger" size="small" icon="el-icon-delete" @click="handleReject(scope.row)"></el-button>
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
  </div>
</template>

<script>
  export default {
    name: "purchase_examine",
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
        purchaseList: [],

        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          name: undefined,
          date1: undefined,
          date2: undefined,
        },
        //表格数据
        form: {
          purId: undefined,
          title: undefined,
          purStaffId: undefined,
          dataTime: undefined,
          money: undefined,
          state: undefined,
        },
        vo: {
          purStaff: undefined,
          aprStaff: undefined,
        }
      }
    }, methods: {
      //驳回的方法
      handleReject: function (row) {
        alert(row.purId)
      },
      //点击通过的方法
      handlePass: function (row) {
        var _this=this;
        let url=new URLSearchParams();
        url.append('purId',row.purId)
        this.$axios.post('',url).then(function (result) {

        })
        alert(row.purId)
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
      //获取数据
      getList() {
        var _this = this;  //将当前vue对象保存到临时变量  _this中
        _this.loading = true;
        _this.$axios({
          url: 'purchase/queryshenpiPageVo',
          method: 'post',
          params: {
            page: _this.pageNum,
            rows: _this.pageSize,
            title: _this.queryParams.name,
            startDataTime: _this.queryParams.date1,
            endDataTime: _this.queryParams.date2,
          },
        }).then(function (result) {   //异步调用成功
          //去结果result中拿数据   data属性
          _this.purchaseList = result.data.records;
          //计算总页数
          _this.total = result.data.total;
          //反入vo对象
          _this.vo = result.data.records;
          _this.loading = false;
        })
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.warehouseId)
        this.single = selection.length !== 1
        this.multiple = !selection.length;
      },
      //表格单击
      clickRow(row) {
        this.$refs.moviesTable.toggleRowSelection(row);
      },
      // 查询的方法
      handleQuery() {
        this.pageNum = 1;
        this.getList();
      },

    }, created() {
      this.getList();
    }
  }
</script>

<style scoped>

</style>
