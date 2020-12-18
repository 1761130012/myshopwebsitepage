<template>
    <div>
      <el-dialog :title="title" :visible.sync="wareUpdVisible">
        <el-form :model="form" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="仓库驻地" prop="areaId">
            <el-select @change="cityList()" v-model="select.select1" placeholder="请选择">
              <el-option v-for="p in provinceVo" :key="p.provinceId" :label="p.name" :value="p.provinceId"></el-option>
            </el-select>
            <el-select @change="areaList()" v-model="select.select2" placeholder="请选择">
              <el-option v-for="c in cityVo" :key="c.cityId" :label="c.name" :value="c.cityId"></el-option>
            </el-select>
            <el-select v-model="select.select3" placeholder="请选择">
              <el-option v-for="a in areaVo" :key="a.areaId" :label="a.name" :value="a.areaId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="仓库地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="现有库存" prop="newCount">
            <el-input v-model="form.newCount"></el-input>
          </el-form-item>
          <el-form-item label="最大库存" prop="maxCount">
            <el-input v-model="form.maxCount"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
<!--          <el-button @click="reset()">重置</el-button>-->
<!--          <el-button type="primary" @click="submitForm()">确 定</el-button>-->
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "update",
      data(){
          return{
            title:"",
            wareUpdVisible:false,
            select: {select1: "", select2: "", select3: ""},
            //初始化数据
            form: {
              warehouseId: undefined,
              name: undefined,
              provinceId: undefined,
              cityId: undefined,
              areaId: undefined,
              address: undefined,
              newCount: undefined,
              maxCount: undefined,
            },
            provinceVo: undefined,
            cityVo: undefined,
            areaVo: undefined,
            // 表单校验
            rules: {
              name: [{
                required: true,
                message: '请输入仓库名',
                trigger: 'blur'
              }], areaId: [{
                required: false,
                message: '请选择驻地',
                trigger: 'blur'
              }], address: [{
                required: true,
                message: '请输入仓库地址',
                trigger: 'blur'
              }], newCount: [{
                required: true,
                message: '请输入仓库现有库存',
                trigger: 'blur'
              }], maxCount: [{
                required: true,
                message: '请输入仓库最大库存',
                trigger: 'blur'
              }],

            },
          }
      },methods:{
        //初始化获取到数据
        getData(id) {
          this.wareUpdVisible = true;
          this.title = "修改仓库";
          //获取到省市区
          var _this = this;  //将当前vue对象保存到临时变量  _this中
          _this.loading = true;
          //根据id获取到数据
          let url=new URLSearchParams();
          url.append('id',id[0]);
          _this.$axios.post('warehouse/queryWarehouseById').then(function (result) {
            console.log(result);
          })

          //获取到省
          _this.$axios({
            url: "gpsProvince/selectAllProvince",
            method: 'post'
          }).then(function (result) {
            // alert(1)
            _this.provinceVo = result.data;

            _this.reset();
          })
          //this.reset();
        },
        //表单重置
        reset() {
          this.select.select1 = "";
          this.select.select2 = "";
          this.select.select3 = "";
          this.cityVo = [];
          this.areaVo = [];
          this.$refs.form.resetFields();
        },cityList() {
          var _this = this;
          // this.select.select1
          _this.$axios({
            url: "gpsCity/selectAllCity",
            method: "post",
            params: {provinceId: _this.select.select1}
          }).then(function (result) {
            _this.select.select2 = "";
            _this.select.select3 = "";
            _this.areaVo = [];
            _this.cityVo = result.data;
          })
        },areaList() {
          var _this = this;
          _this.$axios({
            url: "gpsArea/queryAreaAllByCityId",
            method: "post",
            params: {cityId: _this.select.select2}
          }).then(function (result) {
            _this.select.select3 = "";
            _this.areaVo = result.data;
          })
        },
      }
    }
</script>

<style scoped>

</style>
