<template>
  <div>
    <!-- 进行修改 -->
    <el-dialog
      title="员工信息修改"
      :visible.sync="dialogVisible"
      width="60%">
      <!-- 添加或修改用户信息对话框 :rules="rules"-->
      <el-row :gutter="15">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-col :span="12">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="form.loginName" placeholder="登录名" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="密码" clearable show-password
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" placeholder="昵称" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" placeholder="Email" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="联系电话" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex" size="small">
                <el-radio v-for="(item, index) in staff_sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled" border>{{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="commitUpdate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      let loginNameRef = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          //进行 联系数据库
          this.$axios({
            url: 'staff/queryIsExistByLoginName',
            params: {loginName: value}
          }).then((option) => {
            if (option.data) {
              callback(new Error("登录名重名！！！"));
            }
            callback();
          })
        }
      };
      return {
        dialogVisible: false,
        // 表单参数
        form: {
          loginName: undefined,
          password: undefined,
          name: undefined,
          email: undefined,
          phone: undefined,
          sex: 0
        },
        // 表单校验
        rules: {
          loginName: [{validator: loginNameRef, trigger: 'blur'}],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          email: [
            {required: true, message: "邮箱地址不能为空", trigger: "blur"},
            {
              type: "email",
              message: "'请输入正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          phone: [
            {required: true, message: "手机号码不能为空", trigger: "blur"},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ]
        },
        staff_sexOptions: [{
          "label": "男",
          "value": 0
        }, {
          "label": "女",
          "value": 1
        }],
      }
    },
    methods: {
      setStaffVo({id, loginName, password, name, email, phone, sex}) {
        this.form = {
          id: id,
          loginName: loginName,
          password: password,
          name: name,
          email: email,
          phone: phone,
          sex: sex
        };
      },
      commitUpdate() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let vo = this.form;
            this.$emit("passApproveById", {
              id: vo.id,
              loginName: vo.loginName,
              password: vo.password,
              name: vo.name,
              email: vo.email,
              phone: vo.phone,
              sex: vo.sex
            });
            this.resetForm();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['form'].resetFields();
        this.dialogVisible = false
      },
    }
  }
</script>

<style scoped>

</style>
