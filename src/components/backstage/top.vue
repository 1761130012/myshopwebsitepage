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
      >欢迎您：{{showNameOrLoginName}}
      </el-menu-item>
      <el-menu-item @click=" exitMethod " index="2"
      > 退出
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showNameOrLoginName: sessionStorage.getItem("loginName"),
        activeIndex: "1",
      };
    },
    created() {
      this.getNameOrLoginName();
    },
    methods: {
      exitMethod() {
        sessionStorage.clear();
        this.$router.push("/backstageLogin");
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getNameOrLoginName() {
        let _this = this;
        //根据
        this.$axios({
          url: 'staff/queryStaffNameByLoginName',
          params: {
            loginName: sessionStorage.getItem("loginName")
          }
        }).then((option) => {
          if (option.data === null && option.data === 'null') {
            _this.showNameOrLoginName = option.data;
          }
        })
      }
    },
  };
</script>

<style>
  #backstagetop {
    /*margin-top: 10px;
    margin-right: -20px;*/
  }

</style>
