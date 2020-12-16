<template>
  <div>
    <!-- 购物单详情框-->
    <el-dialog
      title="购物详情"
      :visible.sync="orderdialogVisible"
      width="43%">
      <el-table
        :data="order_shopList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="id"
          label="编号"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="订单号"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="goodsVo.name"
          label="商品名"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          min-width="100"
          align="center"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="payNumber"
          label="购买数量"
          align="center"
          min-width="100">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orderaddsubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        orderdialogVisible: false,
        order_shopList: [],
      }
    },
    methods: {
      getData(id) {
        this.orderdialogVisible =  true;
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderId", id);
        this.$axios.post("/order/selectOrderShopVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.order_shopList = result.data;
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      orderaddsubmit() {
        this.orderdialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
