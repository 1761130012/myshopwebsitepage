<template>
  <div>
    <div id="personal">
      <div class="self-info center">
        <div class="intro fr">
          <div class="grzlbt ml40">我的资料 <a href="javascript:" @click="openUpdateModal"
                                           style="color:#1baeae;margin-left: 600px;">更改个人信息</a></div>

          <div style="position:absolute;left:590px;top: 90px"><img :src="userList.picture"
                                                                   style="width: 427px;height: 217px"/></div>

          <div class="info_item ml40"><span>昵称</span><span>{{ userList.name }}</span></div>
          <div class="info_item ml40"><span>手机号</span><span>{{ userList.phone }}</span></div>
          <div class="info_item ml40"><span>账号</span><span>{{ userList.loginName }}</span></div>
          <div class="info_item ml40"><span>密码</span><span>******</span></div>
          <div class="info_item ml40"><span>个性签名</span><span>&nbsp;{{ userList.signature }}</span></div>
          <div class="info_item ml40"><span>详细地址</span>
            <span>{{ shops.provinceVo.name }}&nbsp;{{ shops.cityVo.name }}&nbsp;{{ shops.cityVo.name }}&nbsp;{{ shops.address }}</span>
            <el-link type="primary" @click="address">更改收货地址</el-link>
          </div>
          <el-button v-if="shop.length==0" style="width: 100px;height: 30px;margin-left: 100px;margin-top: 50px"
                     @click="apply"
                     type="primary">申请商户
          </el-button>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <el-drawer
      align="center"
      title="选择地址"
      :visible.sync="drawer"
      direction="btt"
      size="80%"
      :before-close="handleClose">
      <el-button style="width: 100px;height: 30px;"
                 @click="addShop"
                 type="primary">添加商铺
      </el-button>
      <el-table border
                style="width: 100%;" header-align="center"
                :data="shopAddress">
        <el-table-column
          type="selection"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          v-if="false"
          prop="shopVo.shopId"
          align="center"
          label="店铺id"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="shopVo.name"
          align="center"
          label="商铺名"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="shopVo.joinName"
          align="center"
          label="联系人"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="shopVo.phone"
          align="center"
          label="联系电话"
          min-width="100">
        </el-table-column>
        <el-table-column label="店铺地址" align="center">
          <el-table-column
            align="center"
            prop="shopVo.provinceVo.name"
            label="省份"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="shopVo.cityVo.name"
            label="市区"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="shopVo.areaVo.name"
            label="区县"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="shopVo.address"
            label="详细地址"
            min-width="100">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">

            <el-tooltip v-if="scope.row.state==0" class="item" effect="dark" content="设置" placement="top-start">
              <el-popconfirm title="确定要设置吗？" @confirm="update(scope.row.shopVo.shopId)">
                <el-button type="primary" style="width: 50px;height: 30px" slot="reference" icon="el-icon-check"
                           size="small"></el-button>
              </el-popconfirm>
            </el-tooltip>
            <el-tag v-if="scope.row.state==1">默认地址</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <my-add ref="addRef" ></my-add>
    <my-shop-add ref="shopAddRef" @address="address"></my-shop-add>
    <!-- 对话框-->
    <el-dialog :title="title" :visible.sync="open">
      <el-row :gutter="15">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
          <el-col :span="12">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" placeholder="请输入昵称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号" prop="loginName">
              <el-input v-model="form.loginName" placeholder="请输入账号" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" clearable show-password
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="头像上传">
              <input type="file" @change="getFile($event)">
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个性签名">
              <el-input v-model="form.signature" type="textarea" placeholder="请输入个性签名"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Add from "./userInfoAdd/add";
  import ShopAdd from "./userInfoAdd/shopAdd"

  export default {
    data() {
      return {
        drawer: false,
        open: false,
        title: "",
        userList: [],
        shop: [],
        shopAddress: [],
        shops: [],
        form: {
          userId: undefined,
          name: undefined,
          phone: undefined,
          loginName: undefined,
          signature: undefined,
          img: undefined,
          password: undefined
        },
        rules: {
          name: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          loginName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
      }
    },
    created() {
      this.getlist();
    },
    methods: {
      update(id) {
        console.log(id)
        console.log(this.shopAddress)

        let _this = this;
        let params = new URLSearchParams();
        params.append("shopId", id);
        params.append("loginName", sessionStorage.getItem("loginName"))
        this.$axios.post("user/updateUserShopState", params)
          .then(function (response) {
            if (response.data == 1) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.getlist();
              _this.drawer = false;
            }else {
              _this.$message.error("修改失败");
            }
          }).catch(function (error) { //失败 执行catch方法
          _this.$message.error("error");
        });
      },
      address() {
        this.drawer = true;
        let _this = this;
        let params = new URLSearchParams();
        console.log(this.userList);
        params.append("userId", this.userList.userId);
        this.$axios.post("user/queryUserShop", params)
          .then(function (response) {
            _this.shopAddress = response.data;
          })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      apply() {
        this.$refs.addRef.getData(this.userList, true);
      },
      addShop(){
        this.$refs.shopAddRef.getData(this.userList,true);
      },
      openUpdateModal() {
        let _this = this;
        let params = new URLSearchParams();
        params.append("id", 1);
        this.$axios.post("user/querybid", params)
          .then(function (response) {
            _this.form = response.data;
            _this.form.img = undefined;
            _this.open = true;
            _this.title = "修改个人信息";
          })
      },
      getlist() {
        console.log("sdf")
        let _this = this;
        var params = new URLSearchParams();
        params.append("id", 1);
        this.$axios.post("user/querybid", params)
          .then(function (response) {
            _this.userList = response.data;
          })
        var param = new URLSearchParams();
        param.append("userId", 1);
        this.$axios.post("shop/selectShopVoId", param)
          .then(function (response) {
            _this.shop = response.data;
          })

        var param = new URLSearchParams();
        params.append("loginName", sessionStorage.getItem("loginName"))
        this.$axios.post("shop/queryShopId", params)
          .then(function (response) {
            _this.shops = response.data;
          })
      },
      submitForm(event) {
        event.preventDefault();
        let _this = this;
        let formData = new FormData();
        Object.keys(_this.form).forEach((key) => {
          formData.append(key, _this.form[key]);
        });
        _this.$axios({
          url: "user/edit",
          method: "post",
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          _this.$message({showClose: true, message: "修改成功", type: "success"});
          _this.form = {};
          _this.$refs['form'].resetFields();
          _this.open = false;
          _this.getlist();
        });
      },
      getFile: function (event) {
        this.form.img = event.target.files[0];
        console.log(this.form.img);
      },
      cancel() {
        this.form = {};
        this.$refs['form'].resetFields();
        this.open = false;
      },
    },
    components: {
      myAdd: Add,
      myShopAdd: ShopAdd,
    },
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style-type: none;
    font-family: Microsoft Yahei;
  }

  #personal {
    width: 100%;
    height: auto;
    background: #f5f5f5;
    padding-bottom: 20px;
    padding-top: 20px;
    margin-top: 0px;
  }

  .center {
    margin: 0 75px;
  }

  #personal .self-info {
    width: 1226px;
  }

  #personal .self-info {
    width: 234px;
    height: 500px;
    background: #fff;
  }

  #personal .self-info .lfnav .nav_title {
    width: 234px;
    height: 40px;
    line-height: 40px;
    font-size: 19px;
    margin: 30px 20px 10px 40px;
    color: #333;
  }

  #personal .self-info .lfnav .title_list ul li {
    display: block;
    width: 194px;
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
  }

  #personal .self-info .lfnav .title_list ul li .active {
    color: #1baeae;
    font-weight: bold;
  }

  #personal .self-info .lfnav .title_list ul li a {
    color: #757575;
  }

  #personal .self-info .lfnav .title_list ul li a:hover {
    color: #333;
  }

  #personal .self-info .intro {
    width: 978px;
    height: 500px;
    background: #fff;
  }

  .fr {
    float: left;
  }

  .ml40 {
    margin-left: 40px;
  }

  #personal .self-info .intro .grzlbt {
    width: 938px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: #757575;
  }

  #personal .self-info .intro .info_item {
    height: 45px;
    line-height: 45px;
    width: 900px;
    background: #fdfdfd;
    border: 1px solid #aaa;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
  }

  #personal .self-info .intro .info_item span:nth-of-type(1) {
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    color: #757575;
    width: 70px;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }

  #personal .self-info .intro .info_item span:nth-of-type(2) {
    display: inline-block;
    font-size: 15px;
    color: #757575;
    width: 480px;
    height: 45px;
    line-height: 45px;
    padding-left: 120px;
  }

  #personal .self-info .intro .info_item span:nth-of-type(3) {
    display: inline-block;
    font-size: 15px;
    width: 160px;
    height: 45px;
    line-height: 45px;
    text-align: right;
  }

  #personal .self-info .intro .info_item span a {
    color: #008080;
  }

  #personal .self-info .intro .info_item span a:hover {
    color: #1baeae;
  }
</style>
