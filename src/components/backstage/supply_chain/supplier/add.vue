<template>
  <div>
    <!-- 添加框-->
    <el-dialog
      title="商户添加"
      :visible.sync="dialogVisible2"
      width="35%">
      <el-form :model="supadd" label-width="100px" :rules="rulesadd" ref="add">
        <el-form-item label="供应商名:" prop="name">
          <el-input placeholder="请输入供应商名" v-model="supadd.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="joinName">
          <el-input placeholder="请输入供应商联系人" v-model="supadd.joinName"></el-input>
        </el-form-item>
        <el-form-item label="供应商电话:" prop="phone">
          <el-input placeholder="请输入供应商电话" v-model="supadd.phone"></el-input>
        </el-form-item>
        <el-form-item label="省:" prop="gpsPName">
          <el-select v-model="supadd.gpsPName" @change="getGpsCName"  placeholder="请选择省">
            <el-option
              v-for="group in gpsPName"
              :key="group.provinceId"
              :label="group.name"
              :value="group.provinceId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市:" prop="gpsCName">
          <el-select v-model="supadd.gpsCName" @change="getGpsAName"  placeholder="请选择市">
            <el-option
              v-for="group in gpsCName"
              :key="group.cityId"
              :label="group.name"
              :value="group.cityId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="县:" prop="gpsAName">
          <el-select v-model="supadd.gpsAName"  placeholder="请选择县">
            <el-option
              v-for="group in gpsAName"
              :key="group.areaId"
              :label="group.name"
              :value="group.areaId">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="详细地址:" prop="address">
          <el-input placeholder="请输入信息地址" v-model="supadd.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addresetForm('add')">重置</el-button>
        <el-button type="primary" @click="addsubmit('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        gpsPName: [],
        gpsCName: [],
        gpsAName: [],
        supadd: {
          name: '',
          address: '',
          phone: '',
          joinName: '',
          gpsPName: '',
          gpsCName: '',
          gpsAName: ''
        },
        rulesadd: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          joinName: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          state: [
            {required: true, message: '请输入地址状态', trigger: 'blur'}
          ],
          gpsPName: [
            {required: true, message: '请选择省', trigger: 'blur'}
          ],
          gpsCName: [
            {required: true, message: '请选择市', trigger: 'blur'}
          ],
          gpsAName: [
            {required: true, message: '请选择县', trigger: 'blur'}
          ]
        },
        dialogVisible2: false,
      }
    },
    methods: {
      getData() {
        var _this = this;
        this.$axios.post("/gpsProvince/gpsProvinceVo").then(function (result) {  //成功  执行then里面的方法
          _this.gpsPName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsCName() {
        this.supadd.gpsCName = '';
        this.supadd.gpsAName = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("provinceId", _this.supadd.gpsPName);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsAName() {
        this.supadd.gpsAName = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("cityId", _this.supadd.gpsCName);
        this.$axios.post("/gpsArea/gpsAreaVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsAName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      addsubmit(formName) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("name", _this.supadd.name);
        params.append("address", _this.supadd.address);
        params.append("phone", _this.supadd.phone);
        params.append("joinName", _this.supadd.joinName);
        params.append("provinceId", _this.supadd.gpsPName);
        params.append("cityId", _this.supadd.gpsCName);
        params.append("areaId", _this.supadd.gpsAName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/supplier/addSupplierVo", params).then(function (result) {  //成功  执行then里面的方法
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
              _this.$emit("getData");
            }).catch(function (error) { //失败 执行catch方法
              this.$message.error("添加失败");
            });
            _this.addresetForm(formName);
            this.dialogVisible2 = false;
          }
        });
      },
      addresetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
