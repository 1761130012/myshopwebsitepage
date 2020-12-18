<template>
  <div style="margin-top: 50px">
    <!-- 支付页面 -->
    <el-row>
      <el-col :span="6" :offset="9">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="确认订单">
            <slot slot="description">{{message.one}}</slot>
          </el-step>
          <el-step title="支付订单">
            <slot slot="description">{{message.tow}}</slot>
          </el-step>
          <el-step title="确认收货">
            <slot slot="description">{{message.three}}</slot>
          </el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div style="padding-top: 50px">
          <component :is="showComponent"
                     @handingSteps="handingSteps"
                     @setShowComponent="setShowComponent"
                     :orderId="orderId">
          </component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import OrderCommit from "./orderCommit";
  import PayMoneyCommit from "./payMoneyCommit";
  import GoodsTransport from "./goodsTransport";
  import ConfirmOrder from "./confirmOrder";
  import EndOrder from "./endOrder";

  export default {

    data() {
      return {
        orderId: this.$route.params.orderId,
        active: -1,
        message: {
          one: "等待中",
          tow: "等待中",
          three: "等待中",
        },
        showMessage: ["等待中", "进行中", "完成"],
        showComponent: "",
      };
    },
    created: async function () {
      //进行 连接数据库 进行 确定 位置
      await this.getOrderState();
      await this.handingSteps();
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      getOrderState: async function () {
        let _this = this;
        await this.$axios({
          url: 'order/queryPayStateByOrderId',
          method: "get",
          params: {orderId: this.orderId},
        }).then((option) => {
          let data = option.data;
          if (data.payState === 1) {
            //已支付
            //判断 是否 收货 等于2  就是 说明 到了 商户
            if (data.state === 2) {
              //确认 收货
              _this.showComponent = "confirmOrder";
            } else if (data.state === 3) {
              //确认 已经收货
              _this.showComponent = "endOrder";
            } else {
              //确认 在物流
              _this.showComponent = "goodsTransport";
            }

          } else {
            _this.showComponent = "orderCommit";
          }
        })
      },
      handingSteps: function () {
        //处理 步骤条
        let path = this.showComponent;

        // 在根据 地址 名 进行 判断 步骤条 到哪
        //特殊 是 已支付 就到
        if (path.indexOf("orderCommit") > -1) {
          this.active = 0;
        }
        if (path.indexOf("payMoneyCommit") > -1) {
          this.active = 1;
        }
        if (path.indexOf("goodsTransport") > -1 || path.indexOf("confirmOrder") > -1) {
          this.active = 2;
        }
        if (path.indexOf("endOrder") > -1) {
          this.active = 3;
        }
      },
      setShowComponent(componentName) {
        this.showComponent = componentName;
      },
    },
    watch: {
      active(newIndex, oldIndex) {
        if (newIndex === 0) {
          this.message.one = this.showMessage[1];
          this.message.tow = this.showMessage[0];
          this.message.three = this.showMessage[0];
        }
        if (newIndex === 1) {
          this.message.one = this.showMessage[2];
          this.message.tow = this.showMessage[1];
          this.message.three = this.showMessage[0];
        }

        if (newIndex === 2) {
          this.message.one = this.showMessage[2];
          this.message.tow = this.showMessage[2];
          this.message.three = this.showMessage[1];
        }

        if (newIndex === 3) {
          this.message.one = this.showMessage[2];
          this.message.tow = this.showMessage[2];
          this.message.three = this.showMessage[2];
        }
      },
    },
    components: {
      orderCommit: OrderCommit,
      payMoneyCommit: PayMoneyCommit,
      goodsTransport: GoodsTransport,
      confirmOrder: ConfirmOrder,
      endOrder: EndOrder,
    }
  }
</script>

<style scoped>

</style>
