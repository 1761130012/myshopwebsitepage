<template>
  <div>
    <el-button @click="getData">连接</el-button>
  </div>
</template>

<script>
export default {
  name: "test1",
  methods:{
    getData(){
      this.$axios.get("test/loginTest")
    }
  }
}
</script>

<style scoped>

</style>
