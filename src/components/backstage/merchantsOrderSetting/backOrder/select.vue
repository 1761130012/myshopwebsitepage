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
          prop="orderId"
          label="订单号"
          align="center"
          min-width="150">
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
        <el-table-column
          v-if="order.state==0"
          prop="warehouse"
          label="发货仓库"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-select v-if="scope.row.warehousesVo.length!=0" v-model="scope.row.warehouse" clearable
                       placeholder="请选择">
              <el-option
                v-for="item in scope.row.warehousesVo"
                :key="item.id"
                :label="item.warehouseVo.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span style="color: red" v-if="scope.row.warehousesVo.length==0">
              仓库货物不足
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="order.state==0" type="primary" @click="orderaddsubmit()">发 货</el-button>
        <el-button v-if="order.state!=0" type="primary" @click="closes()">确 定</el-button>
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
        warehouses: [],
        order: []
      }
    },
    methods: {
      closes() {
        this.orderdialogVisible = false;
      },
      warehouse() {
        var _this = this;
        this.order_shopList.forEach((item) => {
          var params = new URLSearchParams();
          params.append("goodsId", item.goodsVo.goodsId);
          params.append("goodsCount", item.payNumber);
          _this.$axios.post("/warehouse/queryWarehouse", params).then(function (result) {  //成功  执行then里面的方法
            console.log("加载")
            item.warehousesVo = result.data;
          }).catch(function (error) { //失败 执行catch方法
            _this.$message.error(error);
          });
        });
      },
      getData(row) {
        this.order = row;
        this.orderdialogVisible = true;
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderId", row.orderId);

        this.$axios.post("/order/selectOrderShopVo", params).then((result) => {  //成功  执行then里面的方法
            result.data.forEach((item) => {
              item.warehouse = null;
              item.warehousesVo = [];
            });
            _this.order_shopList = result.data;
            _this.warehouse();
          }
        ).catch(function (error) { //失败 执行catch方法
          this.$message.error(error);
        });
      },
      orderaddsubmit() {
        var _this = this;
        var bool = true;
        this.order_shopList.forEach((item) => {
          if (item.warehouse == null) {
            bool = false;
          }
        })
        if (bool) {
          var params = new URLSearchParams();
          params.append("orderId", this.order_shopList[0].orderId);
          this.$axios.post("/order/updateDeliver", params).then(function (result) {  //成功  执行then里面的方法
            _this.$message({
              message: '发货成功',
              type: 'success'
            });
            console.log(_this.order_shopList)
            var param = new URLSearchParams();

            var counts = '';
            var ids = '';
            _this.order_shopList.forEach((item) => {
              counts += item.payNumber + ","
              ids += item.warehouse + ","
            })
            param.append("counts", counts);
            param.append("ids", ids);
            console.log(counts + "----" + ids)
            _this.$axios.post("/warehouse/updateWarehouse", param).then(function (result) {  //成功  执行then里面的方法
              _this.$emit("getData");
            }).catch(function (error) { //失败 执行catch方法
              this.$message.error(error);
            });
            _this.orderdialogVisible = false;
          }).catch(function (error) { //失败 执行catch方法
            this.$message.error(error);
          });
        } else {
          this.$message.error('请先选择发货仓库');
        }


      }
    }
  }
</script>

<style scoped>

</style>
