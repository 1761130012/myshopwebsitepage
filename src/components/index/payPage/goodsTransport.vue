<template>
  <div>
    <!-- 订单运输 -->
    <el-row>
      <el-col :span="14" :offset="5">
        <el-alert
          center
          type="success"
          :closable="false"
          show-icon>
          <template slot="title">
            <h2>订单：<span>{{orderId}}</span> <i class="el-icon-shopping-cart-full"></i>运输中............</h2>
          </template>
        </el-alert>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: ["orderId"],
  }
</script>

<style scoped>

</style>
