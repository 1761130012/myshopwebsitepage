<template>
  <div style="width: 100%;height: 100%">
    <div class="login_box">
      <div class="login_content">
        <h1>用户登录</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="65px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="loginName">
            <el-input type="text" v-model="ruleForm.loginName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="$router.push('/indexRegister')" class="testRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          loginName: "",
          password: ""
        },
        rules: {
          loginName: [
            {required: true, message: "请输入用户名", trigger: "blur"},
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
          ]
        }
      };
    },
    methods: {
      async submitForm() {
        let _this = this;
        //进行 登录
        this.$axios({
          url: 'user/userLogin',
          params: this.ruleForm,
        }).then((option) => {
          if (option.data) {
            _this.$message.success("登录成功")
            sessionStorage.setItem("loginName", _this.ruleForm.loginName);

            setTimeout(() => {
              _this.$router.push("/index");
            }, 2000)
          } else {
            _this.$message.error("登录失败！")
          }
        })
      },
    }
  }
</script>

<style scoped>
  .login_box {
    background: #324152;
    width: 100%;
    height: 100%;
    position: relative;

  }

  .login_content {

    width: 35%;
    height: 350px;

    background-color: white;
    border-radius: 10px;
    position: relative;
    /*overflow: hidden;*/
    /*position: absolute;*/
    top: 25%;
    left: 30%;
  }

  h1 {
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .demo-ruleForm {
    padding: 30px;
  }

  .testRegister {
    background-color: #999;
    color: white;
  }

</style>
