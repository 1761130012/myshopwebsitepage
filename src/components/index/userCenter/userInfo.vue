<template>
  <div>
    <div id="personal">
      <div class="self-info center">
        <div class="intro fr">
          <div class="grzlbt ml40">我的资料 <a href="javascript:" @click="openUpdateModal" style="color:#1baeae;margin-left: 600px;">更改个人信息</a>
          </div>
          <div class="info_item ml40"><span>昵称</span><span
            >newbee-mall</span>
          </div>
          <div class="info_item ml40"><span>手机号</span><span
            >newbee-mall</span>
          </div>
          <div class="info_item ml40"><span>密码</span><span>******</span>
          </div>
          <div class="info_item ml40"><span>个性签名</span><span
            >newbee-mall</span>
          </div>
          <div class="info_item ml40"><span>收货信息</span><span>newbee-mall</span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- 对话框-->
    <el-dialog :title="title" :visible.sync="open">
      <el-form :model="form" label-width="80px" :rules="rules" ref="form">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="dizhi">
          <el-input v-model="form.dizhi"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">确 定</el-button>
        <el-button @click="">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      open:false,
      title:"",
      userList: [],
      form:{
        userId:undefined,
        name:undefined,
        phone:undefined,
        dizhi:undefined
      }
    }
  },
  methods:{
    openUpdateModal(){
      this.open = true;
      this.title = "修改个人信息";
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
  margin-top: -50px;
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
