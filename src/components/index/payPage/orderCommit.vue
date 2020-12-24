<template>
  <div>
    <!-- 订单确认页面  和 确认收货 页面 -->
    <el-row>
      <el-col :offset="9" :span="8">
        <span style="font-size: 20px">总金额:<span style="font-size: 24px;color: red">{{payMoneyComputed}} ￥</span></span>
        <el-button type="primary" plain @click="orderCommit"><i class="el-icon-check"></i>确认订单</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <div style="margin-top: 10px;">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>
                店铺信息
                <el-tag
                  v-if="showDefault"
                  key="shopSelect"
                  size="small"
                  effect="dark">
                 默认
              </el-tag>
                <el-tag
                  v-if="!showDefault"
                  key="shopSelect1"
                  size="small"
                  type="success"
                  effect="dark">
                 选中
              </el-tag>
              </span>
              <el-button style="float: right; padding: 3px 0" type="text"
                         @click=" updateShop ">更换店铺
              </el-button>
            </div>
            <div>
              <p>联系人：{{shopInfo.joinName}}</p>
              <p>联系电话：{{shopInfo.phone}}</p>
              <p>店铺名：{{shopInfo.name}}</p>
              <!-- 防止 深入 嵌套报错 -->
              <p v-if="shopInfo.provinceVo">省：{{shopInfo.provinceVo.name}}</p>
              <p v-if="shopInfo.provinceVo">市：{{shopInfo.cityVo.name}}</p>
              <p v-if="shopInfo.provinceVo">县：{{shopInfo.areaVo.name}}</p>
              <p>详细地址：<span v-html="addressMethod(shopInfo.address)"></span></p>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18" :offset="1" style="text-align: center">
        <div>
          <div style="margin-top: 10px;">
            <el-card shadow="hover" style="padding-bottom: 10px;">
              <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="用于批量删除" placement="top">
                  <el-checkbox v-model="centerChecked">全选</el-checkbox>
                </el-tooltip>
              </el-col>
              <el-col :offset="1" :span="2">
                图片
              </el-col>
              <el-col :offset="1" :span="3">
                商品名
              </el-col>
              <el-col :offset="1" :span="4">
                描述
              </el-col>
              <el-col :offset="1" :span="2">
                单价
              </el-col>
              <el-col :offset="1" :span="4">
                数量
              </el-col>
              <el-col :offset="2" :span="1">
                <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
                  <el-button type="danger" @click=" delGoodsBathByIds " icon="el-icon-delete" circle></el-button>
                </el-tooltip>
              </el-col>
            </el-card>
          </div>
          <div v-for=" goods in orderShopShowData" :key='goods.id' style="margin-top: 10px">
            <el-card shadow="hover">
              <el-col :span="1">
                <el-checkbox v-model="goods.checked"></el-checkbox>
              </el-col>
              <el-col :offset="1" :span="2">
                <el-image style="width: 100px" src="./src/resource/image/drinks/1.jpg"></el-image>
              </el-col>
              <!--style="vertical-align:middle"-->
              <el-col :offset="1" :span="3">
                {{goods.goodsVo.name}}
              </el-col>
              <el-col :offset="1" :span="4">
                <span v-html="remarkHandling(goods.goodsVo.remark)"></span>
              </el-col>
              <el-col :offset="1" :span="2">
                {{goods.goodsVo.price}}
              </el-col>
              <el-col :offset="1" :span="4">
                <el-input-number v-model="goods.payNumber" :min="1" :max="100"></el-input-number>
              </el-col>
              <el-col :offset="2" :span="1">
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-popconfirm
                    icon="el-icon-info"
                    icon-color="red"
                    @confirm="delGoodsById(goods.id)"
                    :title="'要删除 '+goods.goodsVo.name+' 商品吗?'">
                    <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
                  </el-popconfirm>
                </el-tooltip>
              </el-col>
            </el-card>
          </div>
          <div style="margin-top: 20px">
            <el-pagination
              layout="sizes,prev, pager, next"
              :total="orderShopData.length"
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
    <div>
      <el-dialog
        title="批量删除"
        :visible.sync="dialogVisible"
        width="40%">
        <span> 是否要删除 {{delBathName}} 商品? </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click=" deleteBathCommit ">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <select-shop ref="selectShopRef" :orderId="orderId" @getShopInfo="getShopInfo"></select-shop>
  </div>
</template>

<script>
  import OrderCommitSelectShop from "./orderCommitSelectShop";
  import configFn from "../../../configFn";

  export default {
    props: ["orderId"],
    data() {
      return {
        //订单数据
        orderShopData: [],
        orderShopShowData: [],
        //分页
        currentPage: 1,//显示页
        size: 2,
        centerChecked: false,
        //商户
        showDefault: true,//控制 默认标签
        shopInfo: {},
        //显示批量删除
        dialogVisible: false,
        delBathName: "",
        delBathOrderShopIds: [],
      }
    },
    created: async function () {
      //初始化
      this.$emit("handingSteps");
      await this.getOrderShopData();
      await this.getShopInfo();
      //设置 显示 数组
      await this.getOrderShopShowData();
    },
    watch: {
      centerChecked(newValue) {
        if (this.orderShopShowData !== undefined && this.orderShopShowData.length > 0) {
          this.orderShopShowData.forEach((item) => {
            item.checked = newValue
          })
        }
      },
      currentPage() {
        //进行 刷新
        this.getOrderShopShowData();
      },
      size() {
        //进行 刷新
        this.getOrderShopShowData();
      },
      //预备
      orderShopData() {
        /* //先隐藏 加载 好在 显示
         this.showGoodsInfo = false;
         this.$nextTick(() => {
           this.showGoodsInfo = true;
         })*/
      },
    },
    methods: {
      getOrderShopData: async function () {
        await this.$axios({
          url: "order/queryOrderShopById",
          method: "get",
          params: {
            orderId: this.orderId,
          },
        }).then((option) => {
          if (option.data.length === 0) {
            this.$router.push("/index");
            //进行 跳转
            this.$message.error("订单编号错误！跳转首页!")
            return;
          }

          option.data.forEach((item) => {
            item.checked = false;
          })

          this.orderShopData = option.data;
        })
      },
      getShopInfo() {
        let _this = this;
        //为什么 要 shopId 因为 到时候 可以选择
        this.$axios({
          url: 'shop/queryShopVoByLoginName',
          method: 'get',
          params: {loginName: sessionStorage.getItem("loginName"), orderId: this.orderId},
        }).then((option) => {
          _this.shopInfo = option.data.shopVo;
          _this.showDefault = option.data.state;
        })
      },
      getOrderShopShowData() {
        let _this = this;
        //进行 取消选中
        if (_this.orderShopShowData !== undefined && _this.orderShopShowData.length > 0) {
          _this.orderShopShowData.forEach((item) => {
            item.checked = false;
          })
        }

        //取消 全选
        _this.centerChecked = false;

        //需要 把 原先 数据 清空
        _this.orderShopShowData = [];

        //根据 显示条数
        _this.orderShopData.forEach((item, index) => {
          let start = _this.size * (_this.currentPage - 1);
          let end = _this.size + start;
          if (index >= start && index <= end - 1) {
            _this.orderShopShowData.push(item);
          }
        })
      },
      remarkHandling(value) {
        return configFn.addLineBr(value, 10);
      },
      orderCommit() {
        let _this = this
        let arrayOrderShopIdNum = this.orderShopData.map(iterator => {
          return {
            id: iterator.id,
            goodsId: iterator.goodsId,
            payNumber: iterator.payNumber,
          }
        })
        //需要修改 数量
        this.$axios({
          url: 'order/updatePayNumberByOrderShopId',
          method: 'post',
          data: JSON.stringify({
            orderShopVos: arrayOrderShopIdNum,
            shopId: _this.shopInfo.shopId,
            orderId: _this.orderId,
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
          if (option.data) {
            //修改改成功 后 进行 跳转
            _this.$emit("setShowComponent", "payMoneyCommit");
            _this.$message.success("确认订单成功！")
          } else {
            _this.$message.error("确认订单失败！")
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleSizeChange(val) {
        this.size = val;
      },
      addressMethod(address) {
        return configFn.addLineBr(address, 20);
      },
      //进行删除
      delGoodsById: function (orderShopId) {
        let _this = this;
        this.$axios({
          url: 'order/deleteOrderShopById',
          method: "post",
          params: {orderShopId: orderShopId},
        }).then(async function (option) {
          if (option.data) {
            _this.$message.success("删除成功！");
            //进行 刷新
            await _this.getOrderShopData();
            await _this.getOrderShopShowData();
          } else {
            _this.$message.error("删除失败！")
          }
        })
      },
      //进行批量删除
      delGoodsBathByIds() {
        let arrayName = "";
        let arrayOrderShopId = [];
        //进行 循环 找 哪些 是 checked 是 true
        this.orderShopShowData.forEach(item => {
          if (item.checked) {
            arrayName += item.goodsVo.name + "  ";
            arrayOrderShopId.push(item.id);
          }
        })
        this.delBathName = arrayName;
        this.delBathOrderShopIds = arrayOrderShopId;

        //进行 打开
        this.dialogVisible = true;
      },
      //进行 确定 要删除
      deleteBathCommit() {
        let _this = this;
        this.$axios({
          url: 'order/deleteBathOrderShopByIds',
          method: "post",
          data: JSON.stringify(this.delBathOrderShopIds),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then(async function (option) {
          if (option.data) {
            _this.$message.success("批量删除成功！")
            //进行 刷新
            await _this.getOrderShopData();
            await _this.getOrderShopShowData();
          } else {
            _this.$message.error("批量删除失败！")
          }
        })

        this.dialogVisible = false
      },
      updateShop() {
        this.$refs.selectShopRef.getShopData();
        this.$refs.selectShopRef.dialogVisible = true
      }
    },
    computed: {
      payMoneyComputed() {
        let count = 0;
        this.orderShopData.forEach((item) => {
          count += (item.goodsPrice * item.payNumber);
        });
        return parseFloat(count).toFixed(2);
      },
    },
    components: {
      selectShop: OrderCommitSelectShop,
    }
  }
</script>

<style scoped>

</style>
