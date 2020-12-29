<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="updateStaffRole">赋予</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <el-input v-model="value" placeholder="关键字"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="getAllStaff" type="primary"><i class="el-icon-search"></i>查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <!-- 左边所有用户 -->
      <el-col :span="12">
        <el-table
          :data="staffData"
          border
          highlight-current-row
          ref="staffTable"
          @row-click="staffClickMethod"
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
    <el-row>
      <el-col :span="12">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="size"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        staffData: [],
        currentPage: 1,
        size: 5,
        total: 0,
        value: "",

        roleData: [],
        selectStaffId: undefined,//选中的 员工Id
        multipleSelection: [],//数据结构 {row} 行
        selectRolesId: [],
      };
    },
    created() {
      this.getAllStaff();
      this.getAllRole();
    },
    watch: {
      currentPage() {
        this.getAllStaff();
      },
      size() {
        this.getAllStaff();
      },
      selectStaffId: async function () {
        //更改
        await this.getSelectRoleByStaffId();
        //进行 选中
        await this.setCheckedRoleByRole();
      },
    },
    methods: {
      getAllStaff() {
        let _this = this
        this.$axios({
          url: 'staff/queryAllPageVo',
          method: 'get',
          params: {
            current: _this.currentPage,
            size: _this.size,
            value: _this.value,
          },
        }).then((option) => {
          _this.staffData = option.data.records;
        })
      },
      getAllRole() {
        let _this = this;
        this.$axios.get("role/queryAll").then((option) => {
          _this.roleData = option.data;
        })
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      getSelectRoleByStaffId: async function () {
        let _this = this;
        await this.$axios({
          url: "role/queryRoleVoByStaffId",
          method: 'get',
          params: {staffId: this.selectStaffId},
        }).then((option) => {
          _this.selectRolesId = option.data;
        })
      },
      staffClickMethod: async function (row) {
        this.selectStaffId = row.staffId;
      },
      //进行赋值 复选框的 行对象
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      updateStaffRole() {
        let _this = this;
        let roleIds = _this.getMultipleSelectionId(_this.multipleSelection);
        let staffId = this.selectStaffId;
        if (staffId === undefined || roleIds.length === 0) {
          _this.$message.error("请选中！")
          return;
        }
        //进行 修改
        this.$axios({
          url: 'staff/updateStaffRoleIds',
          method: 'post',
          data: JSON.stringify({
            roleIds: roleIds,
            staffId: staffId
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
          if (option.data) {
            _this.$message.success("成功！");
            _this.getAllStaff();
            _this.getAllRole();
          } else {
            _this.$message.success("失败！")
          }
        })

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
      setCheckedRoleByRole() {
        //需要 先请清除 在选中
        this.$refs.roleTable.clearSelection();
        let _this = this;
        this.selectRolesId.forEach(roleId => {
          _this.$refs.roleTable.toggleRowSelection(_this.roleData.find(role => role.roleId === roleId));
        })
      },
    },
  }
</script>

<style scoped>

</style>
