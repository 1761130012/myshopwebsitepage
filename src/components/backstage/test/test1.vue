<template>
  <div>
    <el-button @click="clickButton">点击测试</el-button>
  </div>
</template>

<script>
    export default {
      methods:{
        clickButton(){
          this.$axios({
            url:'test/loginTest',
            method:'post',
          }).then((option) => {
            console.log(option.data)
          }).catch((option)=>{
            console.log(option);
          })
        },
      }
    }
</script>
<style>
</style>
