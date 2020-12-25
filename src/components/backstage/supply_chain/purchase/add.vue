<template>
  <div>
    <!--    采购单申请-->
    <el-dialog :title="title"
               :visible.sync="addPurchaseVisible"
               width="80%"
               :before-close="handleClose">
      <el-row :gutter="15">
        <!--      外部需要数据-->
        <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="100px"
                 label-position="left">
          <el-col :span="13">
            <el-form-item label="采购主题" prop="title">
              <el-input v-model="form.title" type="textarea" placeholder="请输入采购主题" show-word-limit
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="日期选择" prop="dataTime">
              <el-date-picker v-model="form.dataTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!--      表格-->


      <div slot="footer">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "add",
    data() {
      return {
        // 弹出层标题
        title: "",
        input: "",
        addPurchaseVisible: false,
        form: {
          title: undefined,
          dataTime: undefined,
        },
        rules: {
          title: [{
            required: true,
            message: '请输入采购主题',
            trigger: 'blur'
          }],
          dataTime: [{
            required: true,
            message: '请选择日期选择',
            trigger: 'change'
          }]
        },
      };
    }, methods: {
      //初始化数据获取
      getList(){

      },
      //打开模态框后执行的方法
      getData() {
        this.title = '采购单申请';
        this.addPurchaseVisible = true;
        this.getList();
      },
      //模态框关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      reset() {
        this.$refs['form'].resetFields()
      },
      handelConfirm() {
        this.$refs['form'].validate(valid => {
          if (!valid) return
          this.reset()
        })
      },
    }
  }
</script>

<style scoped>

</style>
