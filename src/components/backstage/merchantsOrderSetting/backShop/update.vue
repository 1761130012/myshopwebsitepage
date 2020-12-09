<template>
  <div>
    <!-- 修改框-->
    <el-dialog
      title="商户修改"
      :visible.sync="shopdialogVisible"
      width="30%">
      <el-form :model="shopedit" label-width="100px" :rules="shoprules" ref="shopedit">
        <el-form-item label="店铺名:" prop="name">
          <el-input placeholder="请输入店铺名" v-model="shopedit.name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="店铺地址:" prop="address">
          <el-input placeholder="请输入店铺地址" v-model="shopedit.address"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="店铺电话:" prop="phone">
          <el-input placeholder="请输入店铺电话" v-model="shopedit.phone"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="联系人:" prop="join_name">
          <el-input placeholder="请输入店铺联系人" v-model="shopedit.join_name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="店铺状态:" prop="state">
          <el-input placeholder="请输入店铺状态" v-model="shopedit.state"></el-input>
        </el-form-item>
        <br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shopeditresetForm('shopedit')">重置</el-button>
        <el-button type="primary" @click="shopeditsubmit('shopedit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        shopdialogVisible: false,
        shoprules: {
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
        shopedit: {
          shop_id: '',
          name: '',
          address: '',
          phone: '',
          join_name: '',
          state: '',
        },
      }
    },
    methods: {

      getData(list){
        this.shopdialogVisible=true;
        this.shopedit.shop_id = list.shop_id;
        this.shopedit.name = list.name;
        this.shopedit.address = list.address;
        this.shopedit.phone = list.phone;
        this.shopedit.join_name = list.join_name;
        this.shopedit.state = list.state;
      },

    shopeditsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.shopeditresetForm(formName);
          this.shopdialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    shopeditresetForm(formName) {
      this.$refs[formName].resetFields();
    },

    }
  }
</script>

<style scoped>

</style>
