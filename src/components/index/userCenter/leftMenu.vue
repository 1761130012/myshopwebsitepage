<template>
  <div>
    <el-tabs tab-position="left" @tab-click="handleClick">
      <el-tab-pane
        :key="item.id"
        v-for="(item) in leftMenuData"
        :label="item.title"
        :name="item.url"
      >
        <router-view :name="item.url"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showComponent: "",
        leftMenuData: [
          {id: "1", title: "个人信息", icon: "el-icon-date", url: "userInfo"},
          {id: "2", title: "我的订单", icon: "el-icon-date", url: "shopCar"},
          {id: "3", title: "商户信息", icon: "el-icon-date", url: "shopInfo"},
          // {id: "4", title: "商户订单管理", icon: "el-icon-date", url: "shopOrderIndex"},
          {id: "5", title: "商户营收统计", icon: "el-icon-date", url: "shopIncome"},

        ],
      };
    },
    methods: {
      handleClick(tab, event) {
        this.showComponent = tab.name;
      },
    },
  };
</script>
<style>
</style>
