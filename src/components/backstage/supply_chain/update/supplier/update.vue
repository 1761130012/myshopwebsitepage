<template>
  <div>
    <!-- 修改框-->
    <el-dialog
      title="商户修改"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="edit" label-width="100px" :rules="rules" ref="edit">
        <el-form-item label="供应商id:" prop="supId" hidden>
          <el-input placeholder="请输入供应商id" v-model="edit.supId"></el-input>
        </el-form-item>
        <el-form-item label="供应商名:" prop="name">
          <el-input placeholder="请输入供应商名" v-model="edit.name"></el-input>
        </el-form-item>

        <el-form-item label="联系人:" prop="joinName">
          <el-input placeholder="请输入供应商联系人" v-model="edit.joinName"></el-input>
        </el-form-item>

        <el-form-item label="供应商电话:" prop="phone">
          <el-input placeholder="请输入供应商电话" v-model="edit.phone"></el-input>
        </el-form-item>
        <el-form-item label="省:" prop="gpsPName">
          <el-select v-model="edit.gpsPName" @change="getGpsCName"  placeholder="请选择省">
            <el-option
              v-for="group in gpsPName"
              :key="group.provinceId"
              :label="group.name"
              :value="group.provinceId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市:" prop="gpsCName">
          <el-select v-model="edit.gpsCName" @change="getGpsAName"  placeholder="请选择市">
            <el-option
              v-for="group in gpsCName"
              :key="group.cityId"
              :label="group.name"
              :value="group.cityId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="县:" prop="gpsAName">
          <el-select v-model="edit.gpsAName"  placeholder="请选择县">
            <el-option
              v-for="group in gpsAName"
              :key="group.areaId"
              :label="group.name"
              :value="group.areaId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址:" prop="address">
          <el-input placeholder="请输入详细地址" v-model="edit.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editsubmit('edit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        gpsPName: [],
        gpsCName: [],
        gpsAName: [],
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          join_name: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
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
        edit: {
          supId: '',
          name: '',
          address: '',
          phone: '',
          joinName: '',
          gpsPName: '',
          gpsCName: '',
          gpsAName: ''
        },
      }
    },
    methods: {

      getData(list) {
        this.dialogVisible = true;
        this.edit.supId = list.supId;
        this.edit.name = list.name;
        this.edit.address = list.address;
        this.edit.phone = list.phone;
        this.edit.joinName = list.joinName;
        this.edit.gpsPName = list.gpsProvinceVo.provinceId;
        this.edit.gpsCName= list.gpsCityVo.cityId;
        this.edit.gpsAName= list.gpsAreaVo.areaId;
        var _this = this;

        this.$axios.post("/gpsProvince/gpsProvinceVo").then(function (result) {  //成功  执行then里面的方法
          _this.gpsPName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        var params = new URLSearchParams();
        params.append("provinceId", _this.edit.gpsPName);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        var params = new URLSearchParams();
        params.append("cityId", _this.edit.gpsCName);
        this.$axios.post("/gpsArea/gpsAreaVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsAName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsCName() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("provinceId", _this.edit.gpsPName);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
        this.edit.gpsCName = '';
        this.edit.gpsAName = '';
      },
      getGpsAName() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("cityId", _this.edit.gpsCName);
        this.$axios.post("/gpsArea/gpsAreaVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsAName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
        this.edit.gpsAName = '';
      },
      editsubmit(formName) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("supId", _this.edit.supId);
        params.append("name", _this.edit.name);
        params.append("address", _this.edit.address);
        params.append("phone", _this.edit.phone);
        params.append("joinName", _this.edit.joinName);
        params.append("provinceId", _this.edit.gpsPName);
        params.append("cityId", _this.edit.gpsCName);
        params.append("areaId", _this.edit.gpsAName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/supplier/updateSupplierVo", params).then(function (result) {  //成功  执行then里面的方法
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.$emit("getData");
            }).catch(function (error) { //失败 执行catch方法
              _this.$message.error("修改失败");
            });
            _this.dialogVisible = false;
          }
        })
      }

    }
  }
</script>

<style scoped>

</style>
