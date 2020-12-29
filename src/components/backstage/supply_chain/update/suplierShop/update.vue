<template>
  <div>
    <!-- 修改框-->
    <el-dialog
      title="商户修改"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="edit" label-width="100px" :rules="rules" ref="edit">
        <el-form-item label="供应商商品id:" hidden>
          <el-input placeholder="请输入供应商商品id" v-model="edit.id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称:" prop="goodsId">
          <el-select v-model="edit.goodsId"   placeholder="请选择商品">
            <el-option
              v-for="g in goods"
              :key="g.goodsId"
              :label="g.name"
              :value="g.goodsId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名:" prop="supId">
          <el-input placeholder="请输入供应商名" disabled v-model="edit.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="factoryPrice">
          <el-input placeholder="请输入价格" v-model="edit.factoryPrice"></el-input>
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
        goods: [],
        rules: {
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
        edit: {
          id: 0,
          goodsId: 0,
          factoryPrice: '',
          supId: 0,
          goodsname: "",
        },
      }
    },
    methods: {

      getData(list) {
        this.dialogVisible = true;
        this.edit.id = list.id;
        this.edit.goodsId = list.goodsVo.goodsId;
        this.edit.goodsname = list.supplierVo.name;
        this.edit.factoryPrice = list.factoryPrice;
        this.edit.supId = list.supplierVo.supId;
        var _this = this;
        this.$axios.post("/goods/queryGoodList").then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      editsubmit(formName) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", _this.edit.id);
        params.append("goodsId", _this.edit.goodsId);
        params.append("factoryPrice", _this.edit.factoryPrice);
        params.append("supId", _this.edit.supId);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/supplier/updateSupplierGoodsVo", params).then(function (result) {  //成功  执行then里面的方法
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.$emit("goods");
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
