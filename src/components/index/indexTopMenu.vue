<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1" @click=" $router.push('/index/indexPage') "
      >
        <span style="font-size: 20px">兴盛优选</span>
      </el-menu-item
      >
      <el-menu-item index="2" @click=" $router.push('/index/goodsPage') " style='margin-left:500px'>
        <i class="el-icon-shopping-cart-full"></i>
        商品中心
      </el-menu-item>
      <el-menu-item index="3" @click=" toGoodsCar " style='margin-left:100px'>
        <i class="el-icon-shopping-cart-full"></i>
        购物车
      </el-menu-item>
      <el-menu-item index="4" @click=" toUserPath " style='margin-left:100px'
      ><i class="el-icon-user-solid"></i>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: "1",
      };
    },
    methods: {
      toUserPath() {
        let _this = this;
        this.$store.getters.isIndexLoginName(this,function () {
          _this.$router.push('/index/userInfo/show')
        })
      },
      toGoodsCar() {
        let _this = this;
        this.$store.getters.isIndexLoginName(this,function () {
          _this.$router.push('/index/shopCar');
        })
      }
    },
  };
</script>

<style scoped>
  .el-link {
    font-size: 20px
  }
</style>
