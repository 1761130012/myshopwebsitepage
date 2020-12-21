<template>
  <div>
    <el-button @click="getData">链接</el-button>
  </div>
</template>

<script>
    export default {
      methods:{
        getData(){
          this.$axios.post("test/loginTest").catch((option)=>{
              console.log(option.data)
          }).then()
        }
      }
    }
</script>

<style scoped>

</style>
