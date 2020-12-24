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
      <el-table-column prop="orderId" label="订单号" min-width="80" align="center"></el-table-column>
      <el-table-column  label="收货人" min-width="50" align="center">
        <template slot-scope="params">
          <span>{{ params.row.userVo.name }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="收货人电话" min-width="70" align="center">
        <template slot-scope="params">
          <span>{{params.row.userVo.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="总金额" min-width="60" align="center">
        <template slot-scope="params">
          <span>{{params.row.money}}￥</span>
        </template>
      </el-table-column>
      <el-table-column  label="支付状态" min-width="60" align="center">
        <template slot-scope="params">
          <span v-if="params.row.payState===0">未支付</span>
          <span v-if="params.row.payState===1">已支付</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="60" align="center">
        <template slot-scope="params">
          <span v-if="params.row.state===1">已发货</span>
          <span v-else-if="params.row.state===2">待提货</span>
          <span v-else-if="params.row.state===3">已提货</span>
          <span v-else>未发货</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="params">
          <el-button type="primary" size="small" @click="queryGoodsByOrderId(params.row)">详情</el-button>
          <el-button type="primary" size="small" v-if="params.row.payState===0" @click="handlePay(params.row.orderId)">去支付</el-button>
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

    <el-dialog title="提示" :visible.sync="OpenAllOrder" width="60%">
      <el-table :data="allOrderData" width="100%">
        <el-table-column label="商品名称">
          <template slot-scope="params">
            <span>{{params.row.goodsVo.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品售价">
          <template slot-scope="params">
            <span>{{params.row.goodsVo.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品描述">
          <template slot-scope="params">
            <span>{{params.row.goodsVo.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payNumber" label="购买数量"></el-table-column>
      </el-table>
      <el-row :gutter="15">
        <el-col :span="6">
          <el-pagination background @size-change="handleSizeChange1"
                         @current-change="handleCurrentChange1"
                         :current-page="currentPage1"
                         :page-sizes="[5, 10, 20, 40]"
                         :page-size="size1"
                         layout="sizes, prev, pager, next"
                         :total="total1">
          </el-pagination>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button type="primary" size="small" @click="handlePay" v-if="pay==0">去支付</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "allOrder",
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
      OpenAllOrder:false,
      allOrderData:[],
      currentPage1: 1,
      total1: 0,
      size1: 5,
      id:undefined,
      pay:undefined
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
      params.append("orderId",_this.queryParams.orderId);
      params.append("loginName", sessionStorage.getItem("loginName"));
      _this.$axios.post("order/queryAllOrderByUserId", params).then((response) => {
        _this.orderData = response.data.records;
        _this.total = response.data.total;
        _this.loading=false;

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
    queryGoodsByOrderId(row) {
      let _this=this;
      _this.OpenAllOrder=true;
      _this.id=row.orderId;
      _this.pay=row.payState;
      console.log(_this.pay)
      let params = new URLSearchParams();
      params.append("current", _this.currentPage1);
      params.append("size", _this.size1);
      params.append("orderId",row.orderId);
      _this.$axios({url:"order/queryOrderShopByOrderId",method:"post",data:params}).then(response=>{
        _this.allOrderData=response.data.records;
        _this.total1=response.data.total;
      })
    },
    handleSizeChange1(val) {
      this.size1 = val;
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
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
