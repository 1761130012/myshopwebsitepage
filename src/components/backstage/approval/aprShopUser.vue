<template>
  <div>
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="30%">
      <el-card shadow="hover">
        <h3>登录名：<span>{{userVo.loginName}}</span></h3>
        <h3>名称：<span>{{userVo.name}}</span></h3>
        <h3>电话：<span>{{userVo.phone}}</span></h3>
        <h3>创建时间：<span>{{userVo.createTime}}</span></h3>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        userVo: {
          loginName: "",
          name: "",
          phone: "",
          createTime: "",
        },
      }
    },
    methods: {
      getData(shopId) {
        let _this = this;
        this.$axios({
          url: "shop/queryUserVoByShopId",
          params: {
            shopId: shopId,
          },
        }).then((option) => {
          _this.userVo = option.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
