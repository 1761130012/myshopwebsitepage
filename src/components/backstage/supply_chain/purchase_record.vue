<template>
  <div>

      <el-button @click="dialogVisible = true" type="primary">采购单申请</el-button>
<!--      采购记录-->


<!--    采购单申请-->
    <div>
      <el-dialog title="采购单申请"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleClose">
        <el-input  placeholder="请输入内容" v-model="input" clearable>
          <template slot="prepend">采购主题</template>
        </el-input>
        <el-input  placeholder="请输入内容" v-model="input" clearable>
          <template slot="prepend">采购日期</template>
        </el-input>


        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        data(){

          return {
            input:"",
            dialogVisible: false
          };
        },methods:{
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    }
</script>

<style scoped>

</style>
