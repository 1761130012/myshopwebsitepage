<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%">
      <el-row>
        <el-col :span="22">
          <!-- 所有订单 -->
          <el-table
            :data="tableData"
            border
            width="100%">
            <el-table-column
              label="商品名称">
              <template slot-scope="params">
                <span>{{params.row.goodsVo.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品售价">
              <template slot-scope="params">
                <span>{{params.row.goodsVo.price}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品描述">
              <template slot-scope="params">
                <span>{{params.row.goodsVo.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="payNumber"
              label="购买数量">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[5,10, 20]"
            :page-size="size"
            layout="sizes, prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        orderId: undefined,
        currentPage: 1,
        total: 0,
        size: 5,
        tableData: [],
      };
    },
    watch: {
      size() {
        this.getData(this.orderId);
      },
      currentPage() {
        this.getData(this.orderId);
      },
    },
    methods: {
      getData(orderId) {
        if (this.orderId === undefined) {
          this.orderId = orderId;
        }
        this.$axios({
          url: 'order/queryOrderShopByOrderId',
          params: {
            current: this.currentPage,
            size: this.size,
            orderId: orderId,
          },
        }).then((option) => {
          this.tableData = option.data.records;
          this.total = option.data.total;
        })
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
    },
  }
</script>

<style scoped>

</style>
