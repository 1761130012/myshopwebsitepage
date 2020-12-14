<template>
  <div style="margin-top: 50px">
    <!-- 支付页面 -->
    <el-row>
      <el-col :span="6" :offset="9">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="确认订单"></el-step>
          <el-step title="支付订单"></el-step>
        </el-steps>

      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>

<style scoped>

</style>
