<template>
  <!-- 权限管理 -->
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="getHalfAndCheckedKeys">授权</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <!-- 左边所有角色 -->
      <el-col :span="8">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          @row-click="roleClickMethod"
        >
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

      <!--  右边 是 所有的 权限 -->
      <el-col :span="8" :offset="2">
        <el-tree
          class="filter-tree"
          :data="menuData"
          :props="defaultProps"
          node-key="menuId"
          highlight-current
          show-checkbox
          ref="tree">
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import main from "../../../main"

  export default {
    data() {
      return {
        tableData: undefined,
        menuData: undefined,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        selectRoleId: undefined,
      }
    },
    created() {
      this.getRoleData();
      this.getMenuData();
    },
    mounted() {
      let aa = this.$store.getters.getMenuPerms("system");
      console.log(aa)
    },
    methods: {
      getRoleData() {
        let _this = this;
        this.$axios({
          url: 'role/queryAll',
          methods: "get",
        }).then((option) => {
          _this.tableData = option.data;
        })
      },
      getMenuData() {
        let _this = this;
        this.$axios({
          url: 'menu/queryAll',
          methods: "get",
        }).then((option) => {
          _this.menuData = option.data;
        })
      },
      getMenuIdsByRoleId: async function (roleId) {
        let menuIds = undefined;
        await this.$axios({
          url: 'menu/queryMenuIdsByRoleId',
          method: "get",
          params: {roleId: roleId},
        }).then((option) => {
          menuIds = option.data;
        })
        return menuIds;
      },
      roleClickMethod: async function (row, column) {
        this.selectRoleId = row.roleId;

        let arrayIds = await this.getMenuIdsByRoleId(row.roleId);
        //进行 模拟后台响应
        if (arrayIds !== undefined && arrayIds.length > 0) {
          let _this = this;

          //进行 全不选
          _this.$refs.tree.setCheckedKeys([]);

          arrayIds.forEach((item) => {
            let node = _this.$refs.tree.getNode(item);
            if (node.isLeaf) {
              _this.$refs.tree.setChecked(node, true)
            }
          })

        } else {
          this.$refs.tree.setCheckedKeys([]);
        }
      },
      getHalfAndCheckedKeys() {
        let tree = this.$refs.tree;
        let menus = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys());
        this.$axios({
          url: 'role/updateRoleMenuId',
          method: "post",
          data: JSON.stringify({roleId: this.selectRoleId, menus: menus}),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
          if (option.data === true) {
            this.$message.success("授权成功！")
          } else {
            this.$message.error("授权失败！")
          }

        }).catch((option) => {
          this.$message.error("错误！" + option)
        })
      },
    },
  }
</script>

<style scoped>

</style>
