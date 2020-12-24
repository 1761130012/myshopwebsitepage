<template>
  <div>
    <!-- 支付页面 -->
    <el-row>
      <el-col :offset="9" :span="7">
        <span>订单号：<span>{{orderId}}</span></span>
        <el-divider direction="vertical"></el-divider>
        <span>支付金额：<span style="font-size: 24px;color: red">{{countMoney}}￥</span></span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :offset="11" :span="6">
        <el-button type="primary" plain @click="payMoneyCommit">
          <i class="el-icon-circle-check"></i>点击支付
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: ["orderId"],
    data() {
      return {
        countMoney: 0.0,
      }
    },
    created() {
      this.$emit("handingSteps");
      this.getCountMoney();
    },
    methods: {
      getCountMoney() {
        let _this = this;
        this.$axios({
          url: 'order/queryCountMoneyByOrderId',
          params: {orderId: _this.orderId},
        }).then((option) => {
          if (option.data > 0) {
            _this.countMoney = parseFloat(option.data).toFixed(2);
          } else {
            _this.$message.error("错误！")
          }
        })
      },
      payMoneyCommit() {
        //进行 支付
        this.$axios({
          url: 'alipay/payUrl',
          method: 'post',
          params: {orderId: this.orderId},
        }).then((option) => {
          //进行输出 页面
          document.write(option.data);
        })
        //this.$emit("setShowComponent", "confirmOrder");
      },
    }
  }
</script>

<style scoped>

</style>
