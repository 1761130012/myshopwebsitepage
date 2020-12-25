<template>
  <div class="backstage_auto_height">
    <el-row class="backstage_auto_height">
      <el-col :span="22" :offset="1" class="backstage_auto_height">
        <el-container class="backstage_auto_height" direction="vertical">
          <el-header>
            <el-col :span="5" :offset="19">
              <my-top></my-top>
            </el-col>
          </el-header>
          <el-container>
            <el-aside width="200px">
              <my-left @addTable='addTable'></my-left>
            </el-aside>
            <el-main>
              <my-right ref="rightRef"></my-right>
            </el-main>
          </el-container>
          <el-footer>
            <h4>XXX 有限公司</h4>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Top from "./top";
  import Left from './left';
  import Right from './right'

  export default {
    created() {
      //进行 设置登录 名
      //sessionStorage.setItem("loginName", "staff_admin");
      //进行 设置 权限
      this.$store.commit("setMenuPerms", "staff_admin");
    },
    methods: {
      addTable(target) {
        this.$refs.rightRef.addTab(target);
      },
    },
    components: {
      myTop: Top,
      myLeft: Left,
      myRight: Right,
    },
  };
</script>

<style scoped>
  .backstage_auto_height {
    height: 100%;
  }

  .el-header {
    border-bottom: 1px #e6e6e6 solid;
  }

  .el-aside {
  }

  .el-main {
    border-left: 1px #e6e6e6 solid;
    border-right: 1px #e6e6e6 solid;
  }

  .el-footer {
    border-top: 1px #e6e6e6 solid;

  }
</style>
