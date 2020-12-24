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
          <div class="info_item ml40"><span>个性签名</span><span>{{ userList.signature }}</span></div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
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
export default {
  data() {
    return {
      open: false,
      title: "",
      userList: [],
      form: {
        userId: undefined,
        name: undefined,
        phone: undefined,
        loginName: undefined,
        signature: undefined,
        img: undefined,
        password:undefined
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
      }
    }
  }, created() {
    this.getlist();
  },
  methods: {
    openUpdateModal() {
      let _this = this;
      let params = new URLSearchParams();
      params.append("id", 1);
      this.$axios.post("user/querybid", params)
        .then(function (response) {
          _this.form = response.data;
          _this.form.img=undefined;
          _this.open = true;
          _this.title = "修改个人信息";
        })
    },
    getlist() {
      let _this = this;
      let params = new URLSearchParams();
      params.append("id", 1);
      this.$axios.post("user/querybid", params)
        .then(function (response) {
          _this.userList = response.data;
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
  }
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
