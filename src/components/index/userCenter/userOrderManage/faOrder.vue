<template>
  <div>
    <el-card class="order-item-box" v-for="(item,index) in list" :key="index">
      <div slot="header" class="clearfix">
        <span>订单：{{ item.orderId }}</span>
        <el-button style="margin-left: 760px; padding: 3px 0" type="text" v-if="item.state===1"
                   >已发货
        </el-button>
      </div>

      <div v-for="one in item.goodsVoList" class="text item order-item-header">
        <img src="http://localhost:8080/maven_custom_web_war_exploded/resource/image/drinks/1.jpg" style="width: 100px;height: 100px"/>
        <ul>
          <ol>{{ one.goodsVo.name }}</ol>
        </ul>
        <ul>
          <ol>￥{{ one.goodsVo.price }} *   {{ one.payNumber }}</ol>
        </ul>
      </div>
      <el-button style="margin-left: 920px; padding: 3px 0" type="text" @click="queryallOrder(item.orderId)">详情
      </el-button>
      <hr>
      <el-row type="flex" justify="end">
        <el-col :span="4"><span>实付:￥{{ item.money }}</span></el-col>
      </el-row>
    </el-card>
    <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[3, 5, 7, 9]"
                   :page-size="size"
                   layout="sizes, prev, pager, next"
                   :total="total">
    </el-pagination>


    <el-dialog title="收货信息" :visible.sync="OpenAllOrder" width="60%">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24"><span>收货人:{{ listuser.userVo.name }}</span></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24"><span>收货电话:{{ listuser.userVo.phone }}</span></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24"><span>收货店铺:{{listuser.shopVo.name}}</span></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24"><span>收货地址:{{listuser.shopVo.provinceVo.name}}{{listuser.shopVo.cityVo.name}}{{listuser.shopVo.areaVo.name}}{{listuser.shopVo.address}}</span></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24"><span>店铺联系电话:{{listuser.shopVo.phone}}</span></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      list: [],
      listuser: {
        userVo:{
          name:"",
          phone:"",
        },
        shopVo:{
          name:"",
          phone: "",
          provinceVo:{
            name:"",
          },
          cityVo:{
            name:""
          },
          areaVo:{naem:""},
          address:"",
        }
      },
      OpenAllOrder: false,
      currentPage: 1,
      total: 0,
      size: 3,
    }
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      let _this = this;
      let params = new URLSearchParams();
      params.append("page", _this.currentPage);
      params.append("rows", _this.size);
      params.append("loginName", sessionStorage.getItem("loginName"));
      _this.$axios({url: "order/queryAllOrderByUserIdfa", method: "post", data: params}).then(response => {
        _this.list = response.data.list;
        _this.total = response.data.total;
      })
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    queryallOrder(id) {
      let _this = this;
      let params = new URLSearchParams();
      params.append("orderId", id);
      _this.$axios({url: "order/queryAllOrder12", method: "post", data: params}).then(({data}) => {
        _this.listuser = data;
        _this.OpenAllOrder = true;
      })
    },
    handlePay(orderId) {
      let id = orderId;
      alert(id);
    }
  }
}
</script>

<style scoped>
.order-item-box {
  margin: 15px -10px;

}

.order-item-header {
  padding: 10px 20px 0 20px;
  display: flex;

}

.text {
  font-size: 18px;
}

.item {
  margin-bottom: 18px;
}

</style>
