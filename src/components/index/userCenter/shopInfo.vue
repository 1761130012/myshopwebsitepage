<template>
  <div class="demo-type">
<!--    <div class="demo-fit">-->
<!--      <el-avatar shape="circle" style="margin-left: 43%" :size="150" :fit="fits" :src="url"></el-avatar>-->
<!--      <br>-->
<!--      <span class="title" style="margin-left: 46.5%">{{ fits }}</span>-->
<!--    </div>-->

    <el-form :model="shop" :rules="shoprules" label-width="100px" ref="shop">
      <br>
      <el-form-item label="店铺名:" prop="name">
        <el-input placeholder="请输入店铺名" :disabled="disabled" v-model="shop.name"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="店铺电话:" prop="phone">
        <el-input placeholder="请输入店铺电话" :disabled="disabled" v-model="shop.phone"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="联系人:" prop="joinName">
        <el-input placeholder="请输入店铺联系人" :disabled="disabled" v-model="shop.joinName"></el-input>
      </el-form-item>
      <br>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="省:" prop="provinceId">
              <el-select v-model="shop.provinceId" :disabled="disabled" @change="getGpsCName" placeholder="请选择省">
                <el-option
                  v-for="group in gpsPName"
                  :key="group.provinceId"
                  :label="group.name"
                  :value="group.provinceId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="市:" prop="cityId">
              <el-select v-model="shop.cityId" :disabled="disabled" @change="getGpsAName" placeholder="请选择市">
                <el-option
                  v-for="group in gpsCName"
                  :key="group.cityId"
                  :label="group.name"
                  :value="group.cityId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="县:" prop="areaId">
              <el-select v-model="shop.areaId" :disabled="disabled" placeholder="请选择县">
                <el-option
                  v-for="group in gpsAName"
                  :key="group.areaId"
                  :label="group.name"
                  :value="group.areaId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <br>
      <el-form-item label="详细地址:" prop="address">
        <el-input placeholder="请输入详细地址" :disabled="disabled" v-model="shop.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button style="margin-left: 45%" v-if="disabled!=false" @click="upd" type="primary">编辑信息</el-button>
      <el-button @click="cancel" style="margin-left: 42%" v-if="disabled!=true">取消</el-button>
      <el-button v-if="disabled!=true" @click="preservation" type="primary">保存</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "shopInfo",
    data() {
      return {
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
          state: [
            {required: true, message: '请输入地址状态', trigger: 'blur'}
          ],
          provinceId: [
            {required: true, message: '请选择省', trigger: 'blur'}
          ],
          cityId: [
            {required: true, message: '请选择市', trigger: 'blur'}
          ],
          areaId: [
            {required: true, message: '请选择县', trigger: 'blur'}
          ]
        },
        gpsPName: [],
        gpsCName: [],
        gpsAName: [],
        shop: {},
        disabled: true,
        fits: '店铺图片',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    methods: {
      upd() {
        this.disabled = false;
      },
      editresetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancel() {
        this.editresetForm("shop");
        this.getData();
        this.disabled = true;
      },
      preservation() {
        this.$refs["shop"].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("loginName", sessionStorage.getItem("loginName"))
            params.append("shopId", this.shop.shopId);
            params.append("name", this.shop.name);
            params.append("provinceId", this.shop.provinceId);
            params.append("cityId", this.shop.cityId);
            params.append("areaId", this.shop.areaId);
            params.append("address", this.shop.address);
            params.append("phone", this.shop.phone);
            params.append("joinName", this.shop.joinName);
            params.append("state", this.shop.state);

            this.$axios.post("/shop/updateShopVo", params).then(function (result) {  //成功  执行then里面的方法
              _this.$message({
                message: '保存成功',
                type: 'success'
              });
              _this.getData();
              _this.disabled = true;
            }).catch(function (error) { //失败 执行catch方法
              this.$message.error(error);
            });
          }
        })
      },
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("loginName", sessionStorage.getItem("loginName"))
        this.$axios.post("/shop/queryShopVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.shop = result.data;
          _this.gps();
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      }
      ,
      gps() {
        var _this = this;
        this.$axios.post("/gpsProvince/gpsProvinceVo").then(function (result) {  //成功  执行then里面的方法
          _this.gpsPName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        var params = new URLSearchParams();
        params.append("provinceId", this.shop.provinceId);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });

        var params = new URLSearchParams();
        params.append("cityId", this.shop.cityId);
        this.$axios.post("/gpsArea/gpsAreaVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsAName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      }
      ,
      getGpsCName() {
        this.shop.cityId = '';
        this.shop.areaId = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("provinceId", _this.shop.provinceId);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      }
      ,
      getGpsAName() {
        this.shop.areaId = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("cityId", _this.shop.cityId);
        this.$axios.post("/gpsArea/gpsAreaVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsAName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      }
      ,
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
