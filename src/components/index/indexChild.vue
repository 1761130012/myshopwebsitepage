<template>
  <div>
    <el-container>
      <el-aside width="200px" style="height: 640px">
        <el-row class="tac">
          <el-col style="background-color: #D3DCE6">
            <el-menu
              default-active="0"
              class="el-menu-vertical-demo"
            >
              <el-menu-item @click="goodAll" :index="(0).toString()">
                <span slot="title">全部</span>
              </el-menu-item>
              <el-menu-item v-for="type in shopType" @click="good(type.typeId)" :index="(type.typeId).toString()">
                <span slot="title">{{type.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-input placeholder="请输入内容" v-model="name" style="width: 500px;padding-top: 10px">
            <el-button slot="append" icon="el-icon-search" @click="goodTypes"></el-button>
          </el-input>
        </el-header>
        <el-main>
          <el-row>
            <el-col style="height: 300px;width: 270px;margin-left: 55px" v-for="(o, index) in goods" :key="index">
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
          <!-- 分页-->
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[6, 12, 24, 48]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-main>
      </el-container>
    </el-container>

  </div>


</template>

<script>
  export default {
    data() {
      return {
        shopType: [],
        goods: [],
        typeId: 0,
        name: "",
        currentPage: 1, //初始页
        pagesize: 6,  //  每页的数据
        total: 0, //总页数
      }
    },
    methods: {
      details(id) {
        this.$router.push(
          {
            name: "",
            params:{id:id}
          }
        )
      },
      car(id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("goodsId", id);
        params.append("goodsCount", 1)
        this.$axios.post("/goods/addCar", params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            message: '添加成功',
            type: 'success'
          });
        }).catch(function (error) { //失败 执行catch方法
          this.$message.error("添加失败");
        });
      },
      goodAll() {
        this.typeId = '';
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        this.$axios.post("/goods/queryGoodsVo").then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data.records;
          _this.total = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      good(id) {
        this.typeId = id;
        var _this = this;
        var params = new URLSearchParams();
        params.append("typeId", id);
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        this.$axios.post("/goods/queryGoodsVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data.records;
          _this.total = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      goodTypes() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("typeId", _this.typeId);
        params.append("name", _this.name);
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        this.$axios.post("/goods/queryGoodsVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data.records;
          _this.total = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      getData() {
        var _this = this;
        this.$axios.post("/goods/queryGoodsTypeVo").then(function (result) {  //成功  执行then里面的方法
          _this.shopType = result.data;
        }).catch(function () { //失败 执行catch方法
        });
        var params = new URLSearchParams();
        params.append("page", _this.currentPage);
        params.append("rows", _this.pagesize);
        this.$axios.post("/goods/queryGoodsVo", params).then(function (result) {  //成功  执行then里面的方法
          _this.goods = result.data.records;
          _this.total = result.data.total;
        }).catch(function () { //失败 执行catch方法
        });
      },
      handleSizeChange(val) {
        this.pagesize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
    },
    created: function () {
      this.getData();
    }
  };
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
