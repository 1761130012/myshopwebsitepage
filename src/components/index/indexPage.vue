<template>
  <div>
    <el-row>
      <el-col>
        <el-carousel height="400px">
          <div v-for="image in images">
            <el-carousel-item>
              <el-image style="width: 100%; height: 100%;cursor:pointer"
                        :src="'./src/resource/image/'+image.adders"></el-image>
            </el-carousel-item>
          </div>
        </el-carousel>
      </el-col>
    </el-row>

    <el-divider/>
    <el-divider content-position="left"><span style="font-size: 25px">热销商品：</span></el-divider>
    <el-row>
      <el-col :span="4" v-for="(o, index) in goodsUpFive" :key="o.goodsId"
              :offset="index > 0 ? 1 : 0">
        <div @click="toGoodsInfo(o.goodsId)">
          <el-card :body-style="{ padding: '0px',cursor:'pointer'}">
            <el-image style="width: 100%; height: 100%"
                      src="./src/resource/image/drinks/1.jpg"></el-image>
            <div style="text-align:center;padding: 10px;">
              <span>{{ o.name }}</span>
              <div class="bottom clearfix">
                <span class="price" style="color: #ff0000;margin-right: 10px">${{o.price}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="text" class="button" @click.stop="car(o.goodsId)">加入购物车</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsUpFive: [],
        images: [
          {adders: "/indexPage/1.jpg"},
          {adders: "/indexPage/2.jpg"},
          {adders: "/indexPage/3.jpg"},
          {adders: "/indexPage/4.jpg"},
        ]
      }
    },
    created() {
      this.getGoodsUpFiveData();
    },
    methods: {
      getGoodsUpFiveData() {
        this.$axios.get("order/queryGoodsUpdateFive").then((option) => {
          this.goodsUpFive = option.data;
        });
      },
      car(id) {
        let _this = this;
        this.$store.getters.isIndexLoginName(this.$router, function () {
          var params = new URLSearchParams();
          params.append("goodsId", id);
          params.append("goodsCount", 1);
          params.append("loginName", sessionStorage.getItem("loginName"))
          _this.$axios.post("/goods/addCar", params).then(function (result) {  //成功  执行then里面的方法
            _this.$message({
              message: '添加成功',
              type: 'success'
            });
          }).catch(function (error) { //失败 执行catch方法
            _this.$message.error("添加失败");
          });
        })
      },
      toGoodsInfo(goodsId) {
        let routeUrl = this.$router.resolve({path: `/index/shoInfoPage/${goodsId}`})
        window.open(routeUrl.href, '_blank');
      },
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .price {
    font-size: 25px;
    float: left;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 300px;
    height: 200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-header, .el-footer {
    text-align: center;
  }

  body {
    margin-bottom: 40px;
  }

</style>
