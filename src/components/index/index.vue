<template>
  <div style="margin-top: 20px">
    <!-- 设置了 自动的 登录 init -->
    <el-row>
      <el-col :span="20" :offset="2">
        <my-top-menu ref="topMenu"></my-top-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div>
          <router-view/>
        </div>
      </el-col>
    </el-row>
    <!-- 添加 个 需要 登录 是否 登录 -->
    <el-dialog
      title="登录提示"
      :visible.sync="$store.getters.getDialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>当前操作需要登录！是否登录</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click=" cancelMethod ">取 消</el-button>
    <el-button type="primary" @click=" loginCommit ">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>


<script>
  import TopMenu from "./indexTopMenu";

  export default {
    data() {
      return {
        dialogVisible: false,
      }
    },
    created() {
      //sessionStorage.setItem("loginName", "admin");
      this.$router.push("/index/indexPage");
    },
    methods: {
      cancelMethod() {
        this.$refs.topMenu.activeIndex = this.$refs.topMenu.oldIndex;
        this.$store.commit('setDialogVisible', false)
      },
      loginCommit() {
        this.$refs.topMenu.oldIndex = this.$refs.topMenu.activeIndex;
        //关闭
        this.$store.commit('setDialogVisible', false)
        this.$router.push("/indexLogin");
      },
      handleClose(done) {
        this.$store.commit('setDialogVisible', false)
      }
    },
    components: {
      myTopMenu: TopMenu,
    },
  };
</script>

<style>

</style>
