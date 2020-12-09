<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" @click=" $router.push('/index/indexPage') "
      >
        <span style="font-size: 20px">兴盛优选</span>
      </el-menu-item
      >
      <el-menu-item index="2" style='margin-left:350px'
      >
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </el-menu-item
      >
      <el-menu-item index="3" style='margin-left:100px'>
        <i class="el-icon-shopping-cart-full"></i>
        <el-badge :value="shoppingCartNumber" :max="99">
          购物车
        </el-badge>
      </el-menu-item>
      <el-menu-item index="4" @click=" $router.push('/index/leftMenu') " style='margin-left:100px'
      ><i class="el-icon-user-solid"></i>
        <span>个人中心</span>
      </el-menu-item
      >
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: "1",
        shoppingCartNumber: 100,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<style scoped>
  .el-link {
    font-size: 20px
  }
</style>
