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
          node-key="id"
          highlight-current
          show-checkbox
          ref="tree">
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
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
          },
        ],
        menuData: [
          {
            id: 1,
            name: '一级 1',
            children: [{
              id: 4,
              name: '二级 1-1',
              children: [{
                id: 9,
                name: '三级 1-1-1'
              }, {
                id: 10,
                name: '三级 1-1-2'
              }]
            }]
          },
          {
            id: 2,
            name: '一级 1',
            children: [{
              id: 3,
              name: '二级 1-1',
              children: [{
                id: 8,
                name: '三级 1-1-1'
              }, {
                id: 11,
                name: '三级 1-1-2'
              }]
            }]
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      roleClickMethod(row, column) {
        console.log(row)

        //进行 模拟后台响应
        this.$refs.tree.setCheckedKeys([1, 11]);
      },
      getHalfAndCheckedKeys() {
        let tree = this.$refs.tree;

        //获取 选中的 key
        console.log(tree.getCheckedKeys());
        //获取 半选中的 key
        console.log(tree.getHalfCheckedKeys())
        //进行拼装
        console.log(tree.getCheckedKeys().concat(tree.getHalfCheckedKeys())  )
      },
    },
  }
</script>

<style scoped>

</style>
