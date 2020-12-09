<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商户订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="店铺名">
        <el-input v-model="dname" placeholder="请输入店铺名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click=" addMethod ">
          添加
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table border
              style="width: 100%;" header-align="center"
              :data="shopList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    >
      <el-table-column
        type="selection"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="shop_id"
        align="center"
        label="店铺id"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="商铺名"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="店铺地址"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="join_name"
        align="center"
        label="联系人"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="联系电话"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        align="center"
        label="店铺状态"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="150">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click=" update(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="delpinlun(scope.row.shop_id)">
              <el-button type="danger" slot="reference" icon="el-icon-delete" size="small"></el-button>
            </el-popconfirm>
          </el-tooltip>
        </template>


      </el-table-column>
    </el-table>

    <!-- 分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="shopList.length">  <!--//这是显示总共有多少数据，-->
    </el-pagination>


    <my-add ref="addRef"></my-add>

    <my-update ref="updateRef"></my-update>

  </div>


</template>

<script>
  import Add from "./backShop/add";
  import Update from "./backShop/update";

  export default {
    name: "test1",
    methods: {
      addMethod(){
        this.$refs.addRef.shopdialogVisible2=true
      },
      getData: function () {
        //在数组的新的方法里面，使用this获取data中的数据  获取不到得
        //在外层定义变量接收
        var row2 = [];
        this.shopList = this.shopList2;
        var dname2 = this.dname;
        //数据查询
        //将满足查询条件的数据保留,不满足的删除
        this.shopList.forEach(function (item, index) {
          //条件
          if (item.name.indexOf(dname2) != -1) {
            row2.push(item);
          }
        })

        this.shopList = row2;

      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
      handleshopList() {
        // this.$http.get('http://localhost:3000/shopList').then(res => { //这是从本地请求的数据接口，
        //   this.shopList = res.body
        // })
      },
      delpinlun(id) {


        // var _this = this;
        // var params = new URLSearchParams();
        // params.append("id", id);
        //
        //
        // this.$axios.post("deletePingLun.do", params).then(function (result) {  //成功  执行then里面的方法
        //
        //   _this.$message({
        //     message: result.data,
        //     type: 'success'
        //   });
        //
        //   _this.getdata();  //删除操作做完，刷新数据
        //
        // }).catch(function (error) { //失败 执行catch方法
        //   alert(error)
        // });


      },
      update(list) {
        this.$refs.updateRef.getData(list);
      }
    },
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        dname: "",
        shopList: [
          {
            shop_id: '1',
            name: '无上至尊1',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '2',
            name: '无上至尊2',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '3',
            name: '无上至尊3',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '4',
            name: '无上至尊4',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '5',
            name: '无上至尊5',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '6',
            name: '无上至尊6',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '7',
            name: '无上至尊7',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }
        ],
        shopList2: [
          {
            shop_id: '1',
            name: '无上至尊1',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '2',
            name: '无上至尊2',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '3',
            name: '无上至尊3',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '4',
            name: '无上至尊4',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '5',
            name: '无上至尊5',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          },
          {
            shop_id: '6',
            name: '无上至尊6',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }, {
            shop_id: '7',
            name: '无上至尊7',
            address: '上海',
            phone: '123456',
            join_name: '谭洋',
            state: '上线'
          }
        ]
      }
    },
    components: {
      myAdd: Add,
      myUpdate: Update
    }
  }
</script>

<style scoped>

</style>
