<template>

  <div align="center">

    <h1 v-if="goods==null" align="center" style="color: silver">你还没有添加任何商品哦 ~</h1>
    <br>

    <el-row>
      <el-card shadow="hover">
        <el-col :span="1" style="padding-top: 10px">
          <el-checkbox v-model="checkAll">全选
          </el-checkbox>
        </el-col>
        <el-col style="padding-top: 10px;padding-right: 40px" :offset="2" :span="2">
          图片
        </el-col>
        <el-col :offset="1" :span="2" style="padding-top: 10px">
          商品名
        </el-col>
        <el-col :offset="1" :span="3" style="padding-top: 10px">
          描述
        </el-col>
        <el-col :offset="1" :span="3" style="padding-top: 10px">
          单价
        </el-col>
        <el-col :offset="1" :span="4" style="padding-top: 10px">
          数量
        </el-col>
        <el-col :span="1" :offset="2">
          <el-tooltip class="item" effect="dark" content="批量删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="deletes()">
              <el-button style="margin-bottom: 30px" slot="reference" type="danger" icon="el-icon-delete"
                         circle></el-button>
            </el-popconfirm>
          </el-tooltip>
        </el-col>
      </el-card>
      <br>
    </el-row>

    <el-row v-for="c in cars">
      <el-card shadow="hover">
        <el-col :span="1">
          <el-checkbox style="padding-top: 60px" v-model="c.checked" @change="che"></el-checkbox>
        </el-col>
        <el-col :offset="1" :span="3">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               style="margin-bottom: 17px" width="150px" height="150px">
        </el-col>
        <el-col style="padding-top: 60px" :offset="1" :span="2">
          {{c.goodsVo.name}}
        </el-col>
        <el-col style="padding-top: 60px" :offset="1" :span="3">
          {{c.goodsVo.remark}}
        </el-col>
        <el-col style="padding-top: 50px" :offset="1" :span="3">
          <span style="color: red;font-size: 25px">￥{{c.goodsVo.price}}</span>
        </el-col>
        <el-col style="padding-top: 60px" :offset="1" :span="4">
          <el-input-number @change="num(c.id,c.goodsCount,c.goodsVo.goodsId)" v-model="c.goodsCount"></el-input-number>
        </el-col>
        <el-col style="padding-top: 50px" :span="1" :offset="2">
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="delpinlun(c.id)">
              <el-button style="margin-bottom: 30px" slot="reference" type="danger" icon="el-icon-delete"
                         circle></el-button>
            </el-popconfirm>
          </el-tooltip>
        </el-col>
      </el-card>
      <br>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <span style="font-size: 25px">总价:</span>
          <span style="color: red;font-size: 25px">￥{{price}}</span>
          <el-button style="margin-left: 200px" type="danger" @click="mai">立即购买</el-button>
        </el-card>
      </el-col>
    </el-row>

    <!--  猜你喜欢  -->
    <el-main>
      <el-row>
        <h1 align="center"><i style="color: #ff0000;">♥</i>&nbsp; 猜你喜欢 &nbsp;<i style="color: red">♥</i></h1>

        <el-col style="height: 300px;width: 270px;margin-left: 36px" v-for="(o, index) in goods" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img @click="details(o.goodsId)"
                 src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                 class="image">
            <div style="text-align:center;padding: 10px;" @click="details(o.goodsId)">
              <span>{{ o.name }}</span>
              <div class="bottom clearfix">
                <span class="price" style="color: #ff0000;margin-right: 10px">${{o.price}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <time class="time">{{o.remark}}</time>
                <el-button type="text" class="button" @click="car(o.goodsId)">加入购物车</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <h3 align="center">已经全部加载完成 -- --</h3>

    <!-- 回到顶部-->
    <el-backtop></el-backtop>

  </div>

</template>

<script>

  export default {
    data() {
      return {
        goods: [],
        currentPage: 1, //初始页
        pagesize: 8,  //  每页的数据
        checkAll: false,
        cars: [],
        price: 0,
      }
    },
    watch: {
      checkAll(newValue) {
        //所有 checked ==true
        this.cars.forEach((item) => {
          item.checked = newValue;
        })
        this.che();
      }
    },
    methods: {
      che() {
        this.price = 0;
        var _this = this;
        this.cars.forEach((item) => {
          if(item.checked == true ){
            _this.price += item.goodsCount*item.goodsVo.price;
          }
        })
        var bool = true;
        this.cars.forEach((item) => {
          if(item.checked == false){
            bool = false;
          }
        })
        if(bool) {
          this.checkAll = true;
        }
      },
      num(id, num, gid) {
        if (num <= 0) {
          var bool = confirm("确定要删除吗？");
          if (bool) {
            this.delpinlun(id);
          }
        }
        var _this = this;
        var params = new URLSearchParams();
        params.append("loginName", sessionStorage.getItem("loginName"));
        params.append("goodsCount", num);
        params.append("goodsId", gid);
        this.$axios.post("/goods/updateCarNum", params).then(function (result) {
          //成功  执行then里面的方法
        }).catch(function (error) { //失败 执行catch方法
          alert(error)
        });
      },
      deletes() {
        var dels = [];
        this.cars.forEach((item) => {
          if (item.checked == true) {
            dels.push(item.id);
          }
        })
        var _this = this;
        dels.forEach((item) => {
          _this.delpinlun(item);
        })
      },
      delpinlun(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);
        this.$axios.post("/goods/deleteCar", params).then(function (result) {
          _this.$message({
            message: '删除成功',
            type: 'success'
          });
          //成功  执行then里面的方法
          _this.getData();
        }).catch(function (error) { //失败 执行catch方法
          alert(error)
        });
      },
      details(id) {
        this.$router.push(
          {
            name: "",
            params: {id: id}
          }
        )
      },
      car(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("goodsId", id);
        params.append("goodsCount", 1);
        params.append("loginName", sessionStorage.getItem("loginName"))
        this.$axios.post("/goods/addCar", params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            message: '添加成功',
            type: 'success'
          });
          _this.getData();
        }).catch(function (error) { //失败 执行catch方法
          _this.$message.error("添加失败");
        });
      },
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        this.$axios.post("/goods/queryGoodsVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data.records;
        }).catch(function () { //失败 执行catch方法
        });

        var params = new URLSearchParams();
        params.append("loginName", sessionStorage.getItem("loginName"))
        this.$axios.post("/goods/queryCar", params).then(function (result) {  //成功  执行then里面的方法
          result.data.forEach((item) => {
            item.checked = false;
          })
          _this.cars = result.data;
        }).catch(function () { //失败 执行catch方法
        });
      },
      addOrderShop(id,car){

        var _this = this;
        var params = new URLSearchParams();
        params.append("orderId", id);
        params.append("goodsId", car.goodsVo.goodsId);
        params.append("goodsPrice", car.goodsVo.price);
        params.append("payNumber", car.goodsCount);
        this.$axios.post("/order/addCarOrderShopVo", params).then(function (result) {  //成功  执行then里面的方法

        }).catch(function () { //失败 执行catch方法
        });
      },
      dele(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);
        this.$axios.post("/goods/deleteCar", params).then(function (result) {

        }).catch(function (error) { //失败 执行catch方法
          alert(error)
        });
      },
      mai(){
        if(this.price!=0){
          var car = [];
          this.cars.forEach((item) => {
            if(item.checked == true){
              car.push(item);
            }
          })
          console.log(car)
          var _this = this;
          var params = new URLSearchParams();
          params.append("loginName", sessionStorage.getItem("loginName"));
          params.append("money", _this.price);
          params.append("price")
          this.$axios.post("/order/addCarOrderVo", params).then(function (result) {
            //成功  执行then里面的方法
            console.log(result.data);
            console.log(car)
            car.forEach((item)=>{
              _this.addOrderShop(result.data,item);
              _this.dele(item.id);
            })
            _this.getData();
          }).catch(function (error) { //失败 执行catch方法
            alert(error)
          });
        }else {
          this.$message.error('请先选择需要购买的商品 ！！！');
        }
        this.checkAll = false;
        this.price = 0;
      }
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>
  .el-link {
    font-size: 20px;
    color: blue;
  }

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

  body {
    margin-bottom: 40px;
  }

</style>
