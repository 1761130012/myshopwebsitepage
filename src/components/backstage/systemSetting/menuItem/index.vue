<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询表单-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="菜单名">
        <el-input v-model="queryParams.name" placeholder="菜单名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <!--    表格-->
    <el-table v-loading="loading" :data="menuList" row-key="menuId" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="200">
        <template slot-scope="scope">
          <i :class="scope.row.icon" ></i>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="路由地址"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="type" label="菜单类型"  :show-overflow-tooltip="true" :formatter="formatter"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click="handleUpdate(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button type="danger" size="small" icon="el-icon-delete"
                       @click="handleDelete(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改用户信息对话框 -->

  </div>
</template>

<script>
export default {
  name: "staff",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        name: undefined,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户信息列表 */
    getList() {
      var _this = this;  //将当前vue对象保存到临时变量  _this中
      _this.loading = true;
      _this.$axios({
        url: 'menu/querymenu',
        method: 'post',
        params: {
          name: _this.queryParams.name
        },
      }).then(function (response) {   //异步调用成功
        _this.menuList = _this.handleTree(response.data, "menuId");
        _this.loading = false;
      })
    },

    handleTree(data, id, parentId, children, rootId) {
      id = id || 'id'
      parentId = parentId || 'parentId'
      children = children || 'children'
      rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
      //对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data))
      //循环所有项
      const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
          //返回每一项的子级数组
          return father[id] === child[parentId]
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
      });
      return treeData != '' ? treeData : data;
    },

    formatter(row, column) {
      if(row.type==="M"){
        return "目录"
      }else if (row.type==="C"){
        return "菜单"
      }else if(row.type==="F"){
        return "按钮"
      }
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getList();
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加用户信息";
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      alert(row.menuId);
    },

    /** 删除按钮操作 */
    handleDelete: function (row) {

    }

  },
}
</script>

<style scoped>

</style>
