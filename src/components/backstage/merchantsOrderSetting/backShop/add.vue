<template>
  <div>

    <!-- 添加框-->
    <el-dialog
      title="商户添加"
      :visible.sync="shopdialogVisible2"
      width="35%">
      <el-form :model="shopadd" label-width="100px" :rules="shoprulesadd" ref="shopadd">
        <el-form-item label="店铺名:" prop="name">
          <el-input placeholder="请输入店铺名" v-model="shopadd.name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="店铺地址:" prop="address">
          <el-input placeholder="请输入店铺地址" v-model="shopadd.address"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="店铺电话:" prop="phone">
          <el-input placeholder="请输入店铺电话" v-model="shopadd.phone"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="联系人:" prop="join_name">
          <el-input placeholder="请输入店铺联系人" v-model="shopadd.join_name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="店铺状态:" prop="state">
          <el-input placeholder="请输入店铺状态" v-model="shopadd.state"></el-input>
        </el-form-item>
        <br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shopaddresetForm('shopadd')">重置</el-button>
        <el-button type="primary" @click="shopaddsubmit('shopadd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        shopadd: {
          shop_id: '',
          name: '',
          address: '',
          phone: '',
          join_name: '',
          state: '',
        },
        shoprulesadd: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入店铺电话', trigger: 'blur'}
          ],
          join_name: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          state: [
            {required: true, message: '请输入地址状态', trigger: 'blur'}
          ]
        },
        shopdialogVisible2: false,
      }
    },
    methods: {
      shopaddsubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.shopaddresetForm(formName);
            this.shopdialogVisible2 = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      shopaddresetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
