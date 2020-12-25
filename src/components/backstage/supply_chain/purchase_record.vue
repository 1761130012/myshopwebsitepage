<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应链管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    查询-->
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="采购主题:">
        <el-input v-model="queryParams.name" placeholder="采购主题" clearable></el-input>
      </el-form-item>
      <!--      日期选择-->
      <el-form-item label="日期查询:">
        <el-date-picker type="date" v-model="queryParams.date1" value-format="yyyy-MM-dd"
                        aria-placeholder="日期"></el-date-picker>
        <i class="el-icon-right"></i>
        <el-date-picker type="date" v-model="queryParams.date2" value-format="yyyy-MM-dd"
                        aria-placeholder="日期"></el-date-picker>
      </el-form-item>
      <!--    查询按钮-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>

              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="handleAdd"
              >采购单申请
              </el-button>
      <!--        <el-button-->
      <!--          type="warning"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="small"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--        >修改-->
      <!--        </el-button>-->
      <!--        <el-form-item>-->
      <!--          <el-button-->
      <!--            type="danger"-->
      <!--            icon="el-icon-delete"-->
      <!--            size="small"-->
      <!--            :disabled="multiple"-->
      <!--            @click="handleDelete"-->
      <!--          >删除-->
      <!--          </el-button>-->
      <!--        </el-form-item>-->
      <!--      </el-form-item>-->
      </el-form-item>
    </el-form>
    <!--      采购记录-->
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
        label="审批人"
        min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.aprStaff==null">无</span>
          <span v-if="scope.row.aprStaff!=null">
                      <span v-if="scope.row.aprStaff.loginName!=null" style="margin-left: 10px">{{scope.row.aprStaff.loginName}}</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="采购单详情" placement="top-start">
            <el-button type="success" icon="el-icon-edit" @click="handlePass(scope.row)" size="small"></el-button>
          </el-tooltip>

          <span v-if="scope.row.state==2"><el-tooltip class="item" effect="dark" content="重构采购单" placement="top-end">
                      <el-button type="danger" size="small" icon="el-icon-delete"
                                 @click="handleReject(scope.row)"></el-button>
                    </el-tooltip></span>
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


        <my-add ref="addPurchaseRef" @handleQuery="handleQuery"></my-add>
    <my-purchase ref="purchaseParticularsRef"></my-purchase>
  </div>
</template>

<script>
  import Add from "./purchase/add";
  import PurchaseParticulars from "./purchase/particulars";

  export default {
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
        //二个用户对象
        vo: {
          purStaff: [],
          aprStaff: [],
        }
      }
    }, methods: {
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
          url: 'purchase/queryPageVo',
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
        this.ids = selection.map(item => item.purId)
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
      //点击采购单详情
      handlePass(row) {

        let id = row.purId;
        this.$refs.purchaseParticularsRef.getData(id);

      },
      //点击采购单申请的方法
      handleAdd() {
        this.$refs.addPurchaseRef.getData();
      },
      handleReject(row){
        alert(row.purId)
      }
    }, created() {
      this.getList();
    },
    components: {
      myAdd: Add,
      myPurchase: PurchaseParticulars,
    }
  }
</script>

<style scoped>

</style>
