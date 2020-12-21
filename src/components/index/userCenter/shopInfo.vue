<template>
  <div class="demo-type">
    <div class="demo-fit">
      <el-avatar shape="circle" style="margin-left: 43%" :size="150" :fit="fits" :src="url"></el-avatar>
      <br>
      <span class="title" style="margin-left: 46.5%">{{ fits }}</span>
    </div>
    <el-form :model="shop" label-width="100px" ref="shop">
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
            <el-form-item label="省:" prop="gpsPName">
              <el-select v-model="shop.gpsPName" :disabled="disabled" @change="getGpsCName" placeholder="请选择省">
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
            <el-form-item label="市:" prop="gpsCName">
              <el-select v-model="shop.gpsCName" :disabled="disabled" @change="getGpsAName" placeholder="请选择市">
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
            <el-form-item label="县:" prop="gpsAName">
              <el-select v-model="shop.gpsAName" :disabled="disabled" placeholder="请选择县">
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
        gpsPName: [],
        gpsCName: [],
        gpsAName: [],
        shop: {
          name: '',
          address: '',
          phone: '',
          joinName: '',
          gpsPName: '',
          gpsCName: '',
          gpsAName: ''
        },
        disabled: true,
        fits: '店铺图片',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    methods: {
      upd(){
        this.disabled = false;
      },
      cancel(){
        this.disabled = true;
      },
      preservation(){
        this.disabled = true;
      },
      getData() {
        var _this = this;
        this.$axios.post("/gpsProvince/gpsProvinceVo").then(function (result) {  //成功  执行then里面的方法
          _this.gpsPName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsCName() {
        this.shop.gpsCName = '';
        this.shop.gpsAName = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("provinceId", _this.shop.gpsPName);
        this.$axios.post("/gpsCity/gpsCityVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.gpsCName = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getGpsAName() {
        this.shop.gpsAName = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("cityId", _this.shop.gpsCName);
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
