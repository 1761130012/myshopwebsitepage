<template>
  <div>
    <el-dialog
      align="center"
      title="添加地址"
      :visible.sync="dialogVisible"
      width="60%">
      <el-table border
                style="width: 100%;" header-align="center"
                :data="shop">
        <el-table-column
          type="selection"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          v-if="false"
          prop="shopId"

          align="center"
          label="店铺id"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商铺名"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="joinName"
          align="center"
          label="联系人"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="联系电话"
          min-width="100">
        </el-table-column>
        <el-table-column label="店铺地址" align="center">
          <el-table-column
            align="center"
            prop="provinceVo.name"
            label="省份"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="cityVo.name"
            label="市区"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="areaVo.name"
            label="区县"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="详细地址"
            min-width="100">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="add(scope.row.shopId)">
              添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "shopAdd",
    data() {
      return {
        shop: [],
        dialogVisible: false,
      }
    },
    methods: {
      add(id){
        var _this = this;
        var param = new URLSearchParams();
        param.append("loginName", sessionStorage.getItem("loginName"))
        param.append("shopId", id)
        this.$axios.post("shop/addUserShop", param)
          .then(function (response) {
            _this.$message({
              message: '添加成功',
              type: 'success'
            });
            _this.dialogVisible = false;
            _this.$emit("address");
          }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      getData(list, bool) {
        var _this = this;
        this.dialogVisible = bool;
        console.log(list)
        var param = new URLSearchParams();
        param.append("loginName", sessionStorage.getItem("loginName"))
        this.$axios.post("shop/updateErrorStateByLoginName", param)
          .then(function (response) {
            _this.shop = response.data;
          }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
