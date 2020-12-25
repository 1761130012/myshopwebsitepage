<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="买家姓名：">
        <el-input v-model="oname" placeholder="请输入买家姓名"></el-input>
      </el-form-item>
      <el-select v-model="ostate" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      &nbsp;&nbsp;
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" size="small">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="orderList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        type="selection"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="订单id"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="userVo.name"
        label="用户姓名"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        min-width="100"
        sortable
        align="center"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="money"
        sortable
        label="订单总金额"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        min-width="100"
        align="center"
        label="物流状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==0">未发货</span>
          <span v-if="scope.row.state==1">已发货</span>
          <span v-if="scope.row.state==2">到达商户</span>
          <span v-if="scope.row.state==3">已收货</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        min-width="100"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="发货" placement="top-start">
            <el-popconfirm title="确定发货吗？" @confirm="update(scope.row.orderId)">
              <el-button type="warning" slot="reference" icon="el-icon-edit" size="small"></el-button>
            </el-popconfirm>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="delpinlun(scope.row.orderId)">
              <el-button type="danger" slot="reference" icon="el-icon-delete" size="small"></el-button>
            </el-popconfirm>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
            <el-button type="primary" icon="el-icon-search" @click="details(scope.row.orderId)" size="small"></el-button>
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

    <my-select ref="selectRef"></my-select>
  </div>
</template>

<script>
  import Select from "./backOrder/select";

  export default {
    name: "backOrder",
    methods: {

      getData: function () {
        var _this = this;
        console.log("刷新")
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        params.append("name", _this.oname);
        params.append("state", _this.ostate);
        this.$axios.post("/order/selectOrderVo",params).then(function (result) {  //成功  执行then里面的方法
          _this.orderList = result.data.records;
          _this.total = result.data.total;

        }).catch(function () { //失败 执行catch方法
        });
      },
      delpinlun(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);

        this.$axios.post("/order/deleteOrderVo", params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: '删除成功',
            type: 'success'
          });

          _this.getData();  //删除操作做完，刷新数据

        }).catch(function (error) { //失败 执行catch方法
          this.$message.error("删除失败");
        });

      },
      update(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderId", id);
        params.append("state",1)
        this.$axios.post("/order/updateOrderVo", params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: '发货成功',
            type: 'success'
          });

          _this.getData();  //删除操作做完，刷新数据

        }).catch(function (error) { //失败 执行catch方法
          this.$message.error("发货失败");
        });
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
          this.$axios.post("/order/deleteOrderVo", params).then(function (result) {  //成功  执行then里面的方法

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
        this.multipleSelection = val.map(item => item.orderId);
        console.log(this.multipleSelection)
      },
      details(id) {
        this.$refs.selectRef.getData(id);
      }
    },
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        total: 0, //总页数
        oname: "",
        ostate: "",
        multipleSelection: [],//多选的数据
        options: [
          {
            value: '0',
            label: '未发货'
          }, {
            value: '1',
            label: '已发货'
          }, {
            value: '2',
            label: '到达商户'
          }, {
            value: '3',
            label: '已收货'
          }
        ],
        orderList: [],
      }
    }
    ,
    components: {
      mySelect: Select
    }
    ,
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
