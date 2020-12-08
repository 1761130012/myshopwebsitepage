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
            url:'test/setList',
            method:'post',
            data: JSON.stringify({
              array:[[1,2,3,4]],
              name:"张三",
            } ),
            headers:{
              "Content-Type":"application/json;charset=utf-8"
            },
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
