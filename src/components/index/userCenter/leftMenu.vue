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
export default {
  data() {
    return {
      leftMenuData: [
        { id: "1a", title: "个人信息", icon: "el-icon-date", url: "/index/leftMenu/userInfo" },
        { id: "2", title: "我的订单", icon: "el-icon-date", url: "" },
        { id: "3", title: "商户订单管理", icon: "el-icon-date", url: "" },
        { id: "4", title: "营收统计", icon: "el-icon-date", url: "" },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name);
      this.$router.push(tab.name);
    },
  },
};
</script>
<style>
</style>