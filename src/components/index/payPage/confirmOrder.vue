<template>
  <div>
    <!-- 确认订单 -->
    <el-row>
      <el-col :span="6" :offset="11">
        <el-button type="primary" @click=" confirmOrderSubmit "><i class="el-icon-check"></i>确认收货</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3" style="text-align: center">
        <div>
          <div style="margin-top: 10px;">
            <el-card shadow="hover" style="padding-bottom: 10px;">

              <el-col :offset="1" :span="2">
                图片
              </el-col>
              <el-col :offset="2" :span="3">
                商品名
              </el-col>
              <el-col :offset="1" :span="5">
                描述
              </el-col>
              <el-col :offset="1" :span="2">
                单价
              </el-col>
              <el-col :offset="1" :span="4">
                数量
              </el-col>
            </el-card>
          </div>
          <div v-for=" goods in orderGoodsData" :key='goods.id' style="margin-top: 10px">
            <el-card shadow="hover">
              <el-col :offset="1" :span="2">
                <el-image style="width: 100px" src="./src/resource/image/drinks/1.jpg"></el-image>
              </el-col>
              <!--style="vertical-align:middle"-->
              <el-col :offset="2" :span="3">
                {{goods.goodsVo.name}}
              </el-col>
              <el-col :offset="1" :span="5">
                <span v-html="remarkHandling(goods.goodsVo.remark)"></span>
              </el-col>
              <el-col :offset="1" :span="2">
                {{goods.goodsVo.price}}
              </el-col>
              <el-col :offset="1" :span="4">
                {{goods.payNumber}}
              </el-col>
            </el-card>
          </div>
          <div style="margin-top: 20px">
            <el-pagination
              layout="sizes,prev, pager, next"
              :total="total"
              :page-sizes="[2, 4, 6]"
              @size-change="handleSizeChange"
              :page-size="size"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import configFn from "../../../configFn";

  export default {
    props: ["orderId"],
    created() {
      //进行 初始化
      this.$emit("handingSteps");
      this.getOrderGoodsData();
    },
    data() {
      return {
        //分页
        currentPage: 1,//显示页
        size: 2,
        total: 0,
        orderGoodsData: [],
      }
    },
    methods: {
      getOrderGoodsData() {
        let _this = this;
        _this.$axios({
          url: 'order/queryPageVoByOrderId',
          method: 'get',
          params: {
            size: _this.size,
            current: _this.currentPage,
            orderId: _this.orderId,
          },
        }).then((option) => {
          let data = option.data;
          _this.orderGoodsData = data.records;
          _this.total = data.total;
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleSizeChange(val) {
        this.size = val;
      },
      remarkHandling(value) {
        return configFn.addLineBr(value, 10);
      },
      confirmOrderSubmit() {
        let _this = this;
        //进行 改变 状态
        this.$axios({
          url: 'order/updateStateByOrderId',
          method: 'post',
          params: {orderId: this.orderId},
        }).then((option) => {
          if (option.data) {
            _this.$emit("setShowComponent", "endOrder");
            _this.$message.success("成功！")
          } else {
            _this.$message.error("失败！")
          }
        })

      },
    },
    watch: {
      currentPage() {
        this.getOrderGoodsData();
      },
      size() {
        this.getOrderGoodsData();
      },
    }
  }
</script>

<style scoped>

</style>
