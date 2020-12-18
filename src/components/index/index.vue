<template>
  <div style="margin-top: 20px">
    <!-- 设置了 自动的 登录 init -->
    <el-row>
      <el-col :span="20" :offset="2">
        <my-top-menu></my-top-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div>
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import TopMenu from "./indexTopMenu";

  export default {
    created() {
      sessionStorage.setItem("loginName", "admin");
    },
    components: {
      myTopMenu: TopMenu,
    },
  };
</script>

<style>

</style>
