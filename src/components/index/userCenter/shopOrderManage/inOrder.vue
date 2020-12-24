<template>
  <div>
    <!-- 待收货订单 -->
    <el-row>
      <el-col :span="6">
        <el-input v-model="selectOrderId" placeholder="订单号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="getData">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <!-- 所有订单 -->
        <el-table
          :data="tableData"
          border
          width="100%">
          <el-table-column
            prop="orderId"
            label="订单编号">
          </el-table-column>
          <el-table-column
            label="收货人">
            <template slot-scope="params">
              <span>{{params.row.userVo.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收货人电话">
            <template slot-scope="params">
              <span>{{params.row.userVo.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总金额">
            <template slot-scope="params">
              <span>{{params.row.money}}￥</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注">
            <template slot-scope="params">
              <span v-html="remarkHandling(params.row.remark)"></span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="params">
              <span v-if="params.row.state===1">待取货</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="280px">
            <template slot-scope="params">
              <el-button type="primary" @click="commitOrder(params.row.orderId)">确认收货</el-button>
              <el-button type="primary" @click="queryGoodsByOrderId(params.row.orderId)">点击查询商品</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5,10, 20]"
          :page-size="size"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <all-order-show-goods ref="showGoodsRef"></all-order-show-goods>
  </div>
</template>

<script>
  import allOrderShowGoods from "./allOrderShowGoods";
  import configFn from "../../../../configFn";

  export default {
    data() {
      return {
        selectOrderId: undefined,
        currentPage: 1,
        total: 0,
        size: 5,
        tableData: [],
      }
    },
    created() {
      this.getData();
    },
    watch: {
      size() {
        this.getData();
      },
      currentPage() {
        this.getData();
      },
    },
    methods: {
      getData() {
        this.$axios({
          url: 'order/queryAllOrderByShopId',
          params: {
            current: this.currentPage,
            size: this.size,
            orderId: this.selectOrderId,
            state: 1,//等待收货
            loginName: sessionStorage.getItem("loginName"),
          },
        }).then((option) => {
          this.tableData = option.data.records;
          this.total = option.data.total;
        })
      },
      remarkHandling(value) {
        return configFn.addLineBr(value, 10);
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      commitOrder(orderId) {
        this.$axios({
          url: 'order/updateShopCommitStateByOrderId',
          method: 'post',
          params: {
            orderId: orderId,
          },
        }).then((option) => {
          if (option.data) {
            this.$message.success("确认收货成功！");
          } else {
            this.$message.error("确认收货失败！");
          }
          this.getData();
        })
      },
      queryGoodsByOrderId(orderId) {
        this.$refs.showGoodsRef.dialogVisible = true;
        this.$refs.showGoodsRef.getData(orderId);
      },
    },
    components: {
      allOrderShowGoods,
    }
  }
</script>

<style scoped>

</style>
