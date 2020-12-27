<template>
  <div>
    <el-row>
      <el-col :offset="1">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" class="shopOrder" @click="clickButton('allOrder')">全部订单</el-menu-item>
          <el-menu-item index="2" class="shopOrder" @click="clickButton('inOrder')">未支付订单</el-menu-item>
          <el-menu-item index="3" class="shopOrder" @click="clickButton('faOrder')">已发货订单</el-menu-item>
          <el-menu-item index="4" class="shopOrder" @click="clickButton('outOrder')">待提货订单</el-menu-item>
          <el-menu-item index="5" class="shopOrder" @click="clickButton('outOrderCommit')">已提货订单</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1">
        <div style="padding-top: 50px">
          <component :is="showComponent"></component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import allOrder from "./allOrder";
  import inOrder from "./inOrder";
  import outOrder from "./outOrder";
  import outOrderCommit from "./outOrderCommit";
  import faOrder from "./faOrder";

  export default {

    data() {
      return {
        showComponent: "allOrder",
        activeIndex: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      clickButton(componentName) {
        //进行 刷新

        //赋值
        this.showComponent = componentName;
      }
    },
    components: {
      allOrder,inOrder,outOrder,outOrderCommit,faOrder
    }
  }
</script>

<style scoped>
  .shopOrder {
    margin-left: 100px;
    margin-top: 20px;
  }
</style>
