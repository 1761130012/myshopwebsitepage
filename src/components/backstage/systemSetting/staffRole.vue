<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="updateStaffRole">赋予</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="margin-top: 20px">
      <!-- 左边所有用户 -->
      <el-col :span="12">
        <el-table
          :data="staffData"
          border
          highlight-current-row
          @row-click="staffClickMethod"
          ref="staffTable"
        >
          <el-table-column
            prop="staffId"
            label="编号"
          ></el-table-column>

          <el-table-column
            prop="loginName"
            label="账户"
          ></el-table-column>

          <el-table-column
            prop="name"
            label="名称"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="入职时间"
          >
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 右边所有角色 -->
      <el-col :span="8" :offset="2">
        <el-table
          :data="roleData"
          border
          @selection-change="handleSelectionChange"
          ref="roleTable"
        >
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            prop="roleId"
            label="角色编号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        staffData: [],
        roleData: [],
        selectStaffId: undefined,
        multipleSelection: [],//数据结构 {row} 行
      };
    },
    created() {
      this.staffData = this.getAllStaff();
      this.roleData = this.getAllRole();
    },

    methods: {
      getAllStaff() {
        return [
          {
            staffId: 1,
            loginName: "admin",
            name: "XXX",
            phone: "12345",
            createTime: "2020-12-10",
          },
          {
            staffId: 2,
            loginName: "zhagns",
            name: "XXX",
            phone: "12345",
            createTime: "2020-12-10",
          },
        ];
      },
      getAllRole() {
        return [
          {
            roleId: '1',
            name: '管理员',
            remark: '不知道'
          }, {
            roleId: '2',
            name: '老板',
            remark: '不知道'
          }, {
            roleId: '3',
            name: '经理',
            remark: '不知道'
          }
        ];
      },
      //根据 用户id 获取 角色 id
      getRoleIdDataByStaffId(staffId) {
        return [this.roleData[0], this.roleData[1]];
      },
      staffClickMethod(row) {
        //更改
        this.selectStaffId = row.staffId;

        //进行 选中
        this.setCheckedRoleByRole(this.getRoleIdDataByStaffId(row.staffId));
      },
      //进行赋值 复选框的 行对象
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      updateStaffRole() {
        let _this = this;

        console.log(_this.getMultipleSelectionId(_this.multipleSelection));
      },
      //解析 multipleSelection 提取 id
      getMultipleSelectionId(multipleSelection) {
        let arrayId = [];
        multipleSelection.forEach((item) => {
          arrayId.push(item.roleId);
        });
        return arrayId;
      },
      //进行 选中 有 什么 角色
      setCheckedRoleByRole(roles) {
        //需要 先请清除 在选中
        this.$refs.roleTable.clearSelection();

        roles.forEach(role => {
          this.$refs.roleTable.toggleRowSelection(role);
        })
      },
    },
  }
</script>

<style scoped>

</style>
