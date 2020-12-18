<template>
  <div>
    <!-- 结束页面显示 -->
    <el-row>
      <el-col :span="12" :offset="6">
        <el-alert
          center
          type="success"
          :closable="false"
          show-icon>
          <template slot="title">
            <h2>订单:<span>{{orderId}}</span> 完成!!!</h2>
          </template>
        </el-alert>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="6" :offset="11">
        <el-button type="primary" @click=" $router.push('/index/indexPage') ">
          <i class="el-icon-s-home"></i>主页
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: ["orderId"],
    created() {
      this.$emit("handingSteps");
    },
    data() {
      return {}
    },
  }
</script>

<style scoped>

</style>
