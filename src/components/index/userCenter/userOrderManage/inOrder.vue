<template>
  <div>
    <el-form :inline="true" :model="queryParams">
      <el-form-item label="订单号">
        <el-input v-model="queryParams.orderId" placeholder="请输入订单号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="orderData" v-loading="loading" width="100%" header-align="center">
      <el-table-column prop="orderId" label="订单号" min-width="90" align="center"></el-table-column>
      <el-table-column label="收货人" min-width="60" align="center">
        <template slot-scope="params">
          <span>{{ params.row.userVo.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货人电话" min-width="80" align="center">
        <template slot-scope="params">
          <span>{{ params.row.userVo.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额" min-width="60" align="center">
        <template slot-scope="params">
          <span>{{ params.row.money }}￥</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" min-width="60" align="center">
        <template slot-scope="params">
          <span v-if="params.row.payState===0">未支付</span>
          <span v-if="params.row.payState===1">已支付</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="params">
          <el-button type="primary" size="small" @click="queryGoodsByOrderId4(params.row.orderId)">详情</el-button>
          <el-button type="primary" size="small" @click="handlePay(params.row.orderId)">去支付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="size"
                   layout="sizes, prev, pager, next"
                   :total="total">
    </el-pagination>

    <el-dialog title="提示" :visible.sync="OpeninOrder" width="60%">
      <el-table :data="payData" width="100%">
        <el-table-column label="商品名称">
          <template slot-scope="params">
            <span>{{ params.row.goodsVo.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品售价">
          <template slot-scope="params">
            <span>{{ params.row.goodsVo.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品描述">
          <template slot-scope="params">
            <span>{{ params.row.goodsVo.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payNumber" label="购买数量"></el-table-column>
      </el-table>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-pagination background @size-change="handleSizeChange4"
                         @current-change="handleCurrentChange4"
                         :current-page="currentPage4"
                         :page-sizes="[5, 10, 20, 40]"
                         :page-size="size4"
                         layout="sizes, prev, pager, next"
                         :total="total4">
          </el-pagination>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button type="primary" size="small" @click="handlePay">去支付</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "inOrder",
  data() {
    return {
      queryParams: {
        orderId: "",
      },
      currentPage: 1,
      total: 0,
      size: 5,
      orderData: [],
      loading: true,
      OpeninOrder: false,
      payData: [],
      currentPage4: 1,
      total4: 0,
      size4: 5,
      id:undefined
    }
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      let _this = this;
      _this.loading = true;
      let params = new URLSearchParams();
      params.append("current", _this.currentPage);
      params.append("size", _this.size);
      params.append("orderId", _this.queryParams.orderId);
      params.append("loginName", sessionStorage.getItem("loginName"));
      _this.$axios.post("order/queryAllOrderByUserIdshou", params).then((response) => {
        _this.orderData = response.data.records;
        _this.total = response.data.total;
        _this.loading = false;
      })
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleQuery() {
      this.currentPage = 1;
      this.getlist();
    },

    queryGoodsByOrderId4(orderId) {
      let _this = this;
      _this.OpeninOrder = true;
      _this.id=orderId;
      let params = new URLSearchParams();
      params.append("current", _this.currentPage4);
      params.append("size", _this.size4);
      params.append("orderId", orderId);
      _this.$axios({url: "order/queryOrderShopByOrderId", method: "post", data: params}).then(response => {
        _this.payData = response.data.records;
        _this.total4 = response.data.total;
      })
    },
    handleSizeChange4(val) {
      this.size4 = val;
    },
    handleCurrentChange4(val) {
      this.currentPage4 = val;
    },


    handlePay(orderId) {
      let id=this.id ||orderId;
      alert(id);
    }
  }
}
</script>

<style scoped>

</style>
