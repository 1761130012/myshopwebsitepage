<template>
  <div style="margin-top: 50px">
    <!-- 商品详情页面 -->
    <el-row>
      <el-col :span="8">
        <!-- 幻灯片 -->
        <el-carousel height="400px">
          <div v-for="image in images">
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
        images: [],
        goodsVo: undefined,
        num: 1,
        max: 10,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let goodsId = this.$route.params.goodsId;
        console.log(goodsId)
        this.images = [
          {adders: "/drinks/1.jpg"},
          {adders: "/drinks/2.jpg"},
          {adders: "/drinks/3.jpg"},
          {adders: "/drinks/4.jpg"},
          {adders: "/drinks/5.jpg"},
        ];
        this.goodsVo = {
          name: "可乐",
          price: "9.9",
          remark: "快乐肥宅水",
        };
      },
      //支付商品
      payGoods() {
        console.log("支付商品");
      },
      //购物车
      addShopCart() {
        console.log("购物车");
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
