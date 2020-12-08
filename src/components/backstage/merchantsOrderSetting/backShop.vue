<template>
  <div>
    <h1 align="center" >商户管理</h1>
    <el-input placeholder="请输入店铺名" v-model="dname" style="width: 450px" @input="getData($event)"></el-input>
    <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
      <el-button type="success" style="margin-left: 370px" icon="el-icon-circle-plus" circle></el-button>
    </el-tooltip>
    <el-table style="width: 100%;"
              height="300"
              :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    >
      <el-table-column
        prop="shop_id"
        label="店铺id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商铺名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="address"
        label="店铺地址"
        width="150">
      </el-table-column>
      <el-table-column
        prop="join_name"
        label="联系人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="店铺状态"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="primary" @click="update(scope.row)" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-popconfirm title="确定删除吗？" @confirm="delpinlun(scope.row.shop_id)">
              <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
            </el-popconfirm>
          </el-tooltip>
        </template>


      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userList.length">  <!--//这是显示总共有多少数据，-->
    </el-pagination>

    <el-dialog
      title="商户修改"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <el-input placeholder="请输入店铺id" v-model="shop_id">
        <template slot="prepend">&nbsp;&nbsp;店铺id：&nbsp;&nbsp;&nbsp;</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺名" v-model="name">
        <template slot="prepend">&nbsp;&nbsp;店铺名：&nbsp;&nbsp;</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺地址" v-model="address">
        <template slot="prepend">店铺地址：</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺电话" v-model="phone">
        <template slot="prepend">店铺电话：</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺联系人" v-model="join_name">
        <template slot="prepend">&nbsp;&nbsp;联系人：&nbsp;&nbsp;</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺状态" v-model="state">
        <template slot="prepend">店铺状态：</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      title="商户修改"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input placeholder="请输入店铺id" v-model="shop_id">
        <template slot="prepend">&nbsp;&nbsp;店铺id：&nbsp;&nbsp;&nbsp;</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺名" v-model="name">
        <template slot="prepend">&nbsp;&nbsp;店铺名：&nbsp;&nbsp;</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺地址" v-model="address">
        <template slot="prepend">店铺地址：</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺电话" v-model="phone">
        <template slot="prepend">店铺电话：</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺联系人" v-model="join_name">
        <template slot="prepend">&nbsp;&nbsp;联系人：&nbsp;&nbsp;</template>
      </el-input>
      <br><br>
      <el-input placeholder="请输入店铺状态" v-model="state">
        <template slot="prepend">店铺状态：</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>


</template>

<script>
  export default {
    name: "test1",
    methods: {
      getData: function () {
        //在数组的新的方法里面，使用this获取data中的数据  获取不到得
        //在外层定义变量接收
        var row2 = [];
        this.userList = this.userList2;
        var dname2 = this.dname;
        //数据查询
        //将满足查询条件的数据保留,不满足的删除
        this.userList.forEach(function (item, index) {
          //条件
          if (item.name.indexOf(dname2) != -1) {
            row2.push(item);
          }
        })

        this.userList = row2;

      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
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
      handleUserList() {
        this.$http.get('http://localhost:3000/userList').then(res => { //这是从本地请求的数据接口，
          this.userList = res.body
        })
      },
      delpinlun(id) {


        var _this = this;
        var params = new URLSearchParams();
        params.append("id", id);


        this.$axios.post("deletePingLun.do", params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: result.data,
            type: 'success'
          });

          _this.getdata();  //删除操作做完，刷新数据

        }).catch(function (error) { //失败 执行catch方法
          alert(error)
        });


      },
      update(list) {
        this.dialogVisible = true;
        this.shop_id = list.shop_id;
        this.name = list.name;
        this.address = list.address;
        this.phone = list.phone;
        this.join_name = list.join_name;
        this.state = list.state;
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogVisible2: false,
        currentPage: 1, //初始页
        pagesize: 5,  //  每页的数据
        dname: "",
        shop_id: '',
        name: '',
        address: '',
        phone: '',
        join_name: '',
        state: '',
        userList: [
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
          }],
        userList2: [
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
          }]
      }
    },
    created() {
      this.handleUserList()
    }
  }
</script>

<style scoped>

</style>
