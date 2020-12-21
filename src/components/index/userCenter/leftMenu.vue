<template>
  <div>
    <el-tabs tab-position="left" @tab-click="handleClick">
      <el-tab-pane
        :key="item.id"
        v-for="(item) in leftMenuData"
        :label="item.title"
        :name="item.url"
      >
        <router-view/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import ShopIncome from "./shopIncome";

  export default {
    data() {
      return {
        showComponent: "",
        leftMenuData: [
          {id: "1", title: "个人信息", icon: "el-icon-date", url: "userInfo"},
          {id: "2", title: "我的订单", icon: "el-icon-date", url: "shopCar"},
          {id: "3", title: "商户订单管理", icon: "el-icon-date", url: ""},
          {id: "4", title: "商户营收统计", icon: "el-icon-date", url: "shopIncome"},
          {id: "1", title: "个人信息", icon: "el-icon-date", url: "/index/userInfoLeftMenu/userInfo"},
          {id: "2", title: "我的订单", icon: "el-icon-date", url: "/index/userInfoLeftMenu/shopCar"},
          {id: "3", title: "店铺信息", icon: "el-icon-date", url: "/index/userInfoLeftMenu/shopInfo"},
          {id: "4", title: "商户订单管理", icon: "el-icon-date", url: ""},
          {id: "5", title: "商户营收统计", icon: "el-icon-date", url: "/index/userInfoLeftMenu/shopIncome"},
        ],
      };
    },
    methods: {
      handleClick(tab, event) {
        this.showComponent = tab.name;
      },
    },
    components: {
      shopIncome: ShopIncome,
    }
  };
</script>
<style>
</style>
