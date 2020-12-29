<template>
  <div>
    <el-drawer
      title="批量添加员工信息"
      :visible.sync="drawer"
      size="80%"
      :direction="direction">
      <!-- 员工 -->
      <el-divider content-position="left">批量添加员工信息(需审批完才可以批量添加)</el-divider>
      <el-row>
        <el-col :span="20">
          <el-table :data="showData"
                    ref="moviesTable" style="width: 100%" header-align="center">
            <el-table-column label="账号" align="center" prop="loginName"/>
            <el-table-column label="姓名" align="center" prop="name"/>
            <el-table-column label="密码" align="center" prop="password"/>
            <el-table-column label="邮箱" align="center" :show-overflow-tooltip="true" prop="email"/>
            <el-table-column label="手机号码" align="center" prop="phone"/>
            <el-table-column label="性别" align="center" prop="sex">
              <template slot-scope="params">
                <span v-if="params.row.sex===1">女</span>
                <span v-else>男</span>
              </template>
            </el-table-column>
            <el-table-column label="审批状态">
              <template slot-scope="params">
                <span v-if="params.row.state===0">
                  <el-tag
                    :key="params.row.loginName"
                    type="primary"
                    effect="dark">
                    未审批
                  </el-tag>
                </span>
                <span v-if="params.row.state===1">
                  <el-tag
                    :key="params.row.loginName"
                    type="success"
                    effect="dark">
                    审批结束
                  </el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="审批" placement="top-start">
                  <el-button type="success" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                             size="small"></el-button>
                </el-tooltip>
                <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row)">
                  <el-tooltip class="item" slot="reference" effect="dark" content="删除" placement="top-end">
                    <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
      <el-divider content-position="left">只会批量添加审批过的</el-divider>
      <el-row>
        <el-col>
          <el-col :span="2">
            <el-button type="primary" @click="bathPassAddStaff" icon="el-icon-plus">批量添加</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <staff-update ref="staffUpdateRef" @passApproveById="passApproveById"></staff-update>
  </div>
</template>

<script>
  import staffUpdate from "./staffUpdate";

  export default {
    data() {
      return {
        drawer: false,
        direction: 'btt',
        staffVos: [],
        showData: [],

        currentPage: 1,
        size: 5,
        total: 0,
      }
    },
    watch: {
      currentPage() {
        this.getShowData();
      },
      size() {
        this.getShowData();
      },
    },
    methods: {
      setData(data) {
        data.forEach((item, index) => {
          item.id = index + 1;
          item.state = 0;
        })
        this.staffVos = data;
        //进行 获取 展示数据
        this.getShowData();
      },
      getShowData() {
        let showData = [];
        let _this = this;
        this.staffVos.forEach((item, index) => {
          if (index >= (_this.currentPage - 1) * _this.size && index < ((_this.currentPage - 1) * _this.size) + _this.size) {
            showData.push(item);
          }
        })
        this.total = this.staffVos.length;
        this.showData = showData;
      },
      //修改
      handleUpdate(row) {
        let updateRef = this.$refs.staffUpdateRef;
        updateRef.dialogVisible = true;
        updateRef.setStaffVo(row);
      },
      handleDelete: function (row) {
        let _this = this;
        this.staffVos.forEach((item, index) => {
          if (item.id === row.id) {
            _this.staffVos.splice(index, index + 1);
          }
        })
        _this.getShowData();
      },
      bathPassAddStaff() {
        //获取 审批完成的
        let data = this.staffVos.filter((item) => item.state === 1)

        //进行 批量 添加
        this.$axios({
          url: 'staff/insertBathStaffVo',
          method: 'post',
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
          if (option.data) {
            this.$message.success("成功！");
            //进行删除
            this.staffVos = this.staffVos.filter((item) => item.state !== 1)
            //调用
            this.getShowData();
          } else {
            this.$message.success("失败！")
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleSizeChange(val) {
        this.size = val;
      },
      passApproveById({id, loginName, password, name, email, phone, sex}) {
        this.showData.forEach((item) => {
          if (item.id === id) {
            item.loginName = loginName
            item.password = password
            item.name = name
            item.email = email
            item.phone = phone
            item.sex = sex
            item.state = 1
          }
        })
      }
    },
    components: {
      staffUpdate,
    }
  }
</script>

<style scoped>

</style>
