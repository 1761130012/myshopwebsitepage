<template>
  <div>
    <!-- 修改框-->
    <el-dialog
      title="商户修改"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="edit" label-width="100px" :rules="shoprules" ref="shopedit">
        <el-form-item label="店铺id:" prop="shopId">
          <el-input placeholder="请输入店铺id" v-model="edit.shopId" ></el-input>
        </el-form-item>
        <el-form-item label="店铺名:" prop="name">
          <el-input placeholder="请输入店铺名" v-model="edit.name"></el-input>
        </el-form-item>

        <el-form-item label="店铺电话:" prop="phone">
          <el-input placeholder="请输入店铺电话" v-model="edit.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="joinName">
          <el-input placeholder="请输入店铺联系人" v-model="edit.joinName"></el-input>
        </el-form-item>

        <el-form-item label="用户:" prop="userId">
          <el-select v-model="edit.userId" clearable placeholder="请选择店铺状态">
            <el-option
              v-for="item in user"
              :key="item.userId"
              :label="item.name"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="店铺状态:" prop="state">
          <el-select v-model="edit.state" placeholder="请选择店铺状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="editsubmit('shopedit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        options: [
          {
            value: 0,
            label: '未审核'
          }, {
            value: 1,
            label: '通过'
          }, {
            value: 2,
            label: '驳回'
          }, {
            value: 3,
            label: '上线'
          }, {
            value: 4,
            label: '下线'
          }
        ],
        user:[],
        gpsPName: [],
        gpsCName: [],
        gpsAName: [],
        dialogVisible: false,
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
          joinName: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          userId: [
            {required: true, message: '请选择用户', trigger: 'blur'}
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
        edit: {
          shopId: '',
          name: '',
          address: '',
          phone: '',
          joinName: '',
          state: '',
          userId:'',
          gpsPName: '',
          gpsCName: '',
          gpsAName: ''
        },
      }
    },
    methods: {

      getData(list) {
        this.dialogVisible = true;
        this.edit.shopId = list.shopId;
        this.edit.name = list.name;
        this.edit.address = list.address;
        this.edit.phone = list.phone;
        this.edit.state = list.state;
        this.edit.userId = list.userId;
        this.edit.joinName = list.joinName;
        this.edit.gpsPName = list.provinceVo.provinceId;
        this.edit.gpsCName= list.cityVo.cityId;
        this.edit.gpsAName= list.areaVo.areaId;
        var _this = this;

        this.$axios.post("/user/queryList").then(function (result) {  //成功  执行then里面的方法
          _this.user = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        this.$axios.post("/gpsProvince/gpsProvinceVo").then(function (result) {  //成功  执行then里面的方法
          _this.gpsPName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        var params = new URLSearchParams();
        params.append("provinceId", this.edit.gpsPName);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        var params = new URLSearchParams();
        params.append("cityId", this.edit.gpsCName);
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
        params.append("shopId", _this.edit.shopId);
        params.append("name", _this.edit.name);
        params.append("address", _this.edit.address);
        params.append("phone", _this.edit.phone);
        params.append("joinName", _this.edit.joinName);
        params.append("userId", _this.edit.userId);
        params.append("state", _this.edit.state);
        params.append("provinceId", _this.edit.gpsPName);
        params.append("cityId", _this.edit.gpsCName);
        params.append("areaId", _this.edit.gpsAName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/shop/updateShopVo", params).then(function (result) {  //成功  执行then里面的方法
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.$emit("getData");
            }).catch(function (error) { //失败 执行catch方法
              _this.$message.error("修改失败");
            });
            this.dialogVisible = false;
            _this.editresetForm(formName);
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
