<template>
  <div style="width: 100%;height: 100%">
    <div class="login_box">
      <div class="login_content">
        <h1>用户注册</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="75px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="loginName">
            <el-input type="text" v-model="ruleForm.loginName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="towPassword">
            <el-input type="password" v-model="ruleForm.towPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      let loginNameRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.loginName !== '') {
            let _this = this;
            //进行 查询 用户id 异常
            this.$axios({
              url: 'user/queryUserIdError',
              params: {loginName: _this.ruleForm.loginName},
            }).then((option) => {
              if (option.data) {
                callback(new Error("用户名重名！"));
              } else {
                callback();
              }
            })
          }
        }
      };
      let passwordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.towPassword !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let towPasswordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          loginName: "",
          password: "",
          towPassword: "",
        },
        rules: {
          loginName: [
            {validator: loginNameRule, trigger: "blur"},
          ],
          password: [
            {validator: passwordRule, trigger: 'blur'}
          ],
          towPassword: [
            {validator: towPasswordRule, trigger: 'blur'},
          ]
        }
      };
    },
    methods: {
      async submitForm() {
        let _this = this;
        //进行 登录
        this.$axios({
          url: 'user/register',
          params: this.ruleForm,
        }).then((option) => {
          if (option.data) {
            _this.$message.success("注册成功")
            setTimeout(() => {
              _this.$router.push("/indexLogin");
            }, 1000)
          } else {
            _this.$message.error("注册失败!")
            _this.resetForm();
          }
        })
      }
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
</style>
