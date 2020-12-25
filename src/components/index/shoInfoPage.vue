<template>
  <div style="margin-top: 50px">
    <!-- 商品详情页面 -->
    <el-row>
      <el-col :span="8">
        <!-- 幻灯片 -->
        <el-carousel height="400px">
          <div v-for="image in goodsVo.images">
            <el-carousel-item>
              <el-image :src="'./src/resource/image/'+image.adders"></el-image>
            </el-carousel-item>
          </div>
        </el-carousel>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-card class="box-card">
          <h1>{{goodsVo.name}}</h1>
          <h3>{{goodsVo.remark}}</h3>
          <el-divider></el-divider>
          <h3>单价：<span style="font-size: 24px;color: red">{{goodsVo.price}}￥</span></h3>
          <div>
            <el-input-number v-model="num" :min="1" :max="max"></el-input-number>&emsp;
            <span style="font-size: 24px;color: red">{{countPrice }}￥</span>
          </div>
          <el-divider></el-divider>
          <el-button type="success" @click="payGoods" plain>
            <i class="el-icon-check"></i>
            立即支付
          </el-button>
          <el-button type="danger" @click="addShopCart" plain>
            <i class="el-icon-shopping-cart-2"></i>
            加入购物车
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsId: this.$route.params.goodsId,
        goodsVo: {
          name: "",
          remark: "",
          price: "",
          images: []
        },
        num: 1,
        max: 10,
      }
    },
    watch: {
      goodsId() {
        console.log(this.goodsId)
      }
    },
    async created() {
      await this.getData();
    },
    methods: {
      async getData() {
        let _this = this;
        await this.$axios({
          url: 'goods/queryGoodsVoByGoodId',
          params: {
            goodsId: _this.goodsId,
          }
        }).then(function (option) {
          option.data.images = [
            {adders: "/drinks/1.jpg"},
            {adders: "/drinks/2.jpg"},
            {adders: "/drinks/3.jpg"},
            {adders: "/drinks/4.jpg"},
            {adders: "/drinks/5.jpg"},
          ];
          _this.goodsVo = option.data;
        })
      },
      //支付商品 需要获取 orderId
      payGoods() {
        let _this = this;
        this.$axios({
          url: 'order/insertOrderByOneGoods',
          params: {
            goodsId: this.goodsId,
            num: this.num,
            loginName: sessionStorage.getItem("login_name"),
          }
        }).then(function (option) {
          //进行 跳转
          _this.$router.push({path: `/index/payMoney/${option.data}`});
        })
      },
      //购物车
      addShopCart() {
        let _this = this;
        this.$axios({
          url: 'user/insertUserGoodsByInfo',
          params: {
            goodsId: this.goodsId,
            goodsCount: this.num,
            loginName: sessionStorage.getItem("loginName"),
          }
        }).then(function (option) {
          if (option.data) {
            _this.$message.success("加入成功！");
          } else {
            _this.$message.success("加入失败！");
          }
        })
      },
    },
    computed: {
      countPrice() {
        //设置 精度
        return parseFloat((this.num * this.goodsVo.price) + "").toFixed(2);
      }
    },
  }
</script>

<style scoped>
</style>
