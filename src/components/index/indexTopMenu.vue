<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" 
        ><span style="font-size: 20px">兴盛优选</span></el-menu-item
      >
      <el-menu-item index="2" style='margin-left:350px'
        ><i class="el-icon-s-shop"></i><router-link to="/index/child">所有商品</router-link> </el-menu-item
      >
      <el-menu-item index="3" style='margin-left:100px'>
        <i class="el-icon-shopping-cart-full"></i>
        <el-badge :value="shoppingCartNumber" :max="99" >
            购物车 
        </el-badge>
      </el-menu-item>
      <el-menu-item index="4" style='margin-left:100px'
        ><i class="el-icon-user-solid"></i> <router-link to="/index/leftMenu">个人中心</router-link> </el-menu-item
      >
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      shoppingCartNumber:100,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>