<template>
  <div>
    <el-menu
       :default-active="activeIndex" 
       class="el-menu-demo" 
       mode="horizontal"
        @select="handleSelect"
       id="backstagetop"
    >
      <el-menu-item index="3"
        >欢迎您：管理员 </el-menu-item>
      <el-menu-item index="2"
        > 退出</el-menu-item
      >
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style >
#backstagetop{
    margin-top: 10px;
    margin-right: -20px;
}

</style>