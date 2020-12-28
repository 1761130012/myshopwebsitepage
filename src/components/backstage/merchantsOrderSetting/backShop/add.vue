<template>
  <div>

    <!-- 添加框-->
    <el-dialog
      title="商户添加"
      :visible.sync="dialogVisible2"
      width="35%">
      <el-form :model="shopadd" label-width="100px" :rules="shoprulesadd" ref="shopadd">
        <el-form-item label="店铺名:" prop="name">
          <el-input placeholder="请输入店铺名" v-model="shopadd.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺电话:" prop="phone">
          <el-input placeholder="请输入店铺电话" v-model="shopadd.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="joinName">
          <el-input placeholder="请输入店铺联系人" v-model="shopadd.joinName"></el-input>
        </el-form-item>
        <el-form-item label="用户:" prop="userId">
          <el-select v-model="shopadd.userId" clearable placeholder="请选择店铺状态">
            <el-option
              v-for="item in user"
              :key="item.userId"
              :label="item.name"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺状态:" prop="state">
          <el-select v-model="shopadd.state" clearable placeholder="请选择店铺状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省:" prop="gpsPName">
          <el-select v-model="shopadd.gpsPName" @change="getGpsCName" placeholder="请选择省">
            <el-option
              v-for="group in gpsPName"
              :key="group.provinceId"
              :label="group.name"
              :value="group.provinceId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市:" prop="gpsCName">
          <el-select v-model="shopadd.gpsCName" @change="getGpsAName" placeholder="请选择市">
            <el-option
              v-for="group in gpsCName"
              :key="group.cityId"
              :label="group.name"
              :value="group.cityId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="县:" prop="gpsAName">
          <el-select v-model="shopadd.gpsAName" placeholder="请选择县">
            <el-option
              v-for="group in gpsAName"
              :key="group.areaId"
              :label="group.name"
              :value="group.areaId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址:" prop="address">
          <el-input placeholder="请输入详细地址" v-model="shopadd.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addresetForm('shopadd')">重置</el-button>
        <el-button type="primary" @click="shopaddsubmit('shopadd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: '0',
            label: '未审核'
          }, {
            value: '1',
            label: '通过'
          }, {
            value: '2',
            label: '驳回'
          }, {
            value: '3',
            label: '上线'
          }, {
            value: '4',
            label: '下线'
          }
        ],
        user: [],
        gpsPName: [],
        gpsCName: [],
        gpsAName: [],
        shopadd: {
          name: '',
          address: '',
          phone: '',
          joinName: '',
          state: '',
          userId: '',
          gpsPName: '',
          gpsCName: '',
          gpsAName: ''
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
          joinName: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          userId: [
            {required: true, message: '请选择用户', trigger: 'blur'}
          ],
          state: [
            {required: true, message: '请输入店铺状态', trigger: 'blur'}
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
      shopaddsubmit(formName) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("name", _this.shopadd.name);
        params.append("address", _this.shopadd.address);
        params.append("phone", _this.shopadd.phone);
        params.append("joinName", _this.shopadd.joinName);
        params.append("state", _this.shopadd.state);
        params.append("userId", _this.shopadd.userId);
        params.append("provinceId", _this.shopadd.gpsPName);
        params.append("cityId", _this.shopadd.gpsCName);
        params.append("areaId", _this.shopadd.gpsAName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/shop/addShopVo", params).then(function (result) {  //成功  执行then里面的方法
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
      getData() {
        var _this = this;
        this.$axios.post("/gpsProvince/gpsProvinceVo").then(function (result) {  //成功  执行then里面的方法
          _this.gpsPName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
        this.$axios.post("/user/queryList").then(function (result) {  //成功  执行then里面的方法
          _this.user = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsCName() {
        this.shopadd.gpsCName = '';
        this.shopadd.gpsAName = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("provinceId", _this.shopadd.gpsPName);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsAName() {
        this.shopadd.gpsAName = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("cityId", _this.shopadd.gpsCName);
        this.$axios.post("/gpsArea/gpsAreaVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsAName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
