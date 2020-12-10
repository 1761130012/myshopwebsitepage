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
      <el-form-item>
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline">
          添加
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="orderList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        type="selection"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单id"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="用户姓名"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        min-width="100"
        align="center"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="money"
        label="订单总金额"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="state"
        min-width="100"
        align="center"
        label="物流状态">
      </el-table-column>
      <el-table-column
        prop="remark"
        min-width="100"
        align="center"
        label="备注">
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderList.length">  <!--//这是显示总共有多少数据，-->
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "backOrder",
    methods: {
      getData: function () {
        //在数组的新的方法里面，使用this获取data中的数据  获取不到得
        //在外层定义变量接收
        var order = [];
        this.orderList = this.orderList2;
        var oname2 = this.oname;
        var ostate2 = this.ostate;
        //数据查询
        //将满足查询条件的数据保留,不满足的删除
        this.orderList.forEach(function (item, index) {
          //条件
          if (item.user_id.indexOf(oname2) != -1) {
            if (item.state.indexOf(ostate2) != -1) {
              order.push(item);
            }
          }
        })

        this.orderList = order;

      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
    },
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        oname: "",
        ostate: "",
        options: [
          {
            value: '未发货',
            label: '未发货'
          }, {
            value: '已发货',
            label: '已发货'
          }, {
            value: '到达商户',
            label: '到达商户'
          }, {
            value: '已收货',
            label: '已收货'
          }
        ],
        orderList: [
          {
            order_id: 1,
            user_id: "谭洋",
            time: '2016-05-02',
            money: 200,
            remark: "",
            state: "未发货"
          }, {
            order_id: 2,
            user_id: "周涛",
            time: '2016-05-02',
            money: 300,
            remark: "",
            state: "已发货"
          }, {
            order_id: 3,
            user_id: "赵明",
            time: '2016-05-02',
            money: 200,
            remark: "",
            state: "到达商户"
          }, {
            order_id: 4,
            user_id: "刘洋",
            time: '2016-05-02',
            money: 200,
            remark: "",
            state: "已收货"
          }
        ],
        orderList2: [
          {
            order_id: 1,
            user_id: "谭洋",
            time: '2016-05-02',
            money: 200,
            remark: "",
            state: "未发货"
          }, {
            order_id: 2,
            user_id: "周涛",
            time: '2016-05-02',
            money: 300,
            remark: "",
            state: "已发货"
          }, {
            order_id: 3,
            user_id: "赵明",
            time: '2016-05-02',
            money: 200,
            remark: "",
            state: "到达商户"
          }, {
            order_id: 4,
            user_id: "刘洋",
            time: '2016-05-02',
            money: 200,
            remark: "",
            state: "已收货"
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
