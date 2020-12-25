<template>
  <div>
    <!-- 添加框-->
    <el-dialog
      title="供应商商品添加"
      :visible.sync="dialogVisible2"
      width="35%">
      <el-form :model="shopadd" label-width="100px" :rules="rulesadd" ref="add">
        <el-form-item label="商品名称:" prop="goodsId">
          <el-select v-model="shopadd.goodsId"   placeholder="请选择商品">
            <el-option
              v-for="g in goods"
              :key="g.goodsId"
              :label="g.name"
              :value="g.goodsId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名:" prop="supId">
          <el-input placeholder="请输入供应商名" disabled v-model="shopadd.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="factoryPrice">
          <el-input placeholder="请输入价格" v-model="shopadd.factoryPrice"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addsubmit('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goods:[],
        shopadd: {
          goodsId: '',
          factoryPrice: '',
          supId: '',
          goodsname: "",
        },
        rulesadd: {
          goodsId: [
            {required: true, message: '请选择商品名称', trigger: 'blur'},
          ],
          factoryPrice: [
            {required: true, message: '请输入商品进价', trigger: 'blur'}
          ],
          supId: [
            {required: true, message: '请输入供应商名字', trigger: 'blur'}
          ]
        },
        dialogVisible2: false,
      }
    },
    methods: {
      getData(id,name) {
        this.shopadd.supId = id;
        this.shopadd.goodsname = name;
        var _this = this;
        this.$axios.post("/goods/queryGoodList").then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      addsubmit(formName) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("goodsId", _this.shopadd.goodsId);
        params.append("factoryPrice", _this.shopadd.factoryPrice);
        params.append("supId", _this.shopadd.supId);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/supplier/addSupplierGoodsVo", params).then(function (result) {  //成功  执行then里面的方法
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
              _this.$emit("goods");
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
