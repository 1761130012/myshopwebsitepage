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
        <el-input v-model="queryParams.name" placeholder="请输入菜单名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <!--    表格-->
    <el-table v-loading="loading" :data="menuList" row-key="menuId"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true" width="160" ></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="200">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="路由地址" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="type" label="菜单类型" :show-overflow-tooltip="true" :formatter="formatter"></el-table-column>
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

    <!-- 添加或修改菜单信息对话框 -->
    <el-dialog :title="title" :visible.sync="open">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名" prop="name">
              <el-input v-model="form.name" placeholder="请输入菜单名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标" prop="icon" v-if="form.type != 'F'">
              <el-input v-model="form.icon" placeholder="请输入图标" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识" prop="perms">
              <el-input v-model="form.perms" placeholder="请输入权限标识" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="url" v-if="form.type == 'C'">
              <el-input v-model="form.url" placeholder="请输入路由地址" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//npm install --save @riophae/vue-treeselect
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "menuItem",
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        name: undefined,
      },
      form: {
        menuId: undefined,
        type: 'M',
        name: undefined,
        icon: undefined,
        perms: undefined,
        url: undefined,
        parentId: 0
      },
      rules: {
        type: [{
          required: true,
          message: '菜单类型不能为空',
          trigger: 'change'
        }],
        name: [{
          required: true,
          message: '请输入菜单名',
          trigger: 'blur'
        }],
        icon: [{
          required: true,
          message: '请输入图标',
          trigger: 'blur'
        }],
        perms: [{
          required: true,
          message: '请输入权限标识',
          trigger: 'blur'
        }],
        url: [{
          required: true,
          message: '请输入路由地址',
          trigger: 'blur'
        }],
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
    /** 转换菜单数据结构 */
    normalizer(node) {
      if(node.children==null||node.children=='null'){
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.name,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      let _this = this;
      _this.$axios({
        url: 'menu/querymenu',
        method: 'post'
      }).then(response => {
        _this.menuOptions = [];
        const menu = {menuId: 0, name: '主类目', children: []};
        menu.children = _this.handleTree(response.data, "menuId");
        this.menuOptions.push(menu);
      });
    },
    //
    handleTree(data, id, parentId, children, rootId) {
      id = id || 'id'
      parentId = parentId || 'parentId'
      children = children || 'children'
      rootId = rootId || Math.min.apply(Math, data.map(item => {
        return item[parentId]
      })) || 0
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
    //
    formatter(row, column) {
      if (row.type === "M") {
        return "目录"
      } else if (row.type === "C") {
        return "菜单"
      } else if (row.type === "F") {
        return "按钮"
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getList();
    },
    //表单重置
    reset(){
      this.form={type: "M"};
      this.$refs['form'].resetFields();
    },
    //取消
    cancel(){
      this.reset();
      this.open=false;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.getTreeselect();
      this.form.parentId = 0;
      this.open = true;
      this.title = "添加用户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      let _this=this;
      _this.getTreeselect();
      let params = new URLSearchParams();
      params.append("id",row.menuId);
      _this.$axios.post("menu/querybid",params).then(response =>{
        _this.form=response.data;
        _this.open=true;
        _this.title = "修改用户信息";
      })
    },
    //提交
    submitForm(){
      this.$refs['form'].validate(valid => {
        if(valid){
          if(this.form.menuId !=null){
              this.$axios({
                url:"menu/updata",
                method:"post",
                data:JSON.stringify(this.form),
                headers:{
                  "Content-Type": "application/json;charset=utf-8"
              }
          }).then(response =>{
                this.$message({showClose: true, message: "修改成功", type: "success"});
                this.reset();
                this.open = false;
                this.getList();
              })
          }else{
            this.$axios({
              url:"menu/add",
              method:"post",
              data:JSON.stringify(this.form),
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            }).then(response=>{
              this.$message({showClose: true, message: "新增成功", type: "success"});
              this.reset();
              this.open = false;
              this.getList();
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete: function (row) {
        this.$confirm('是否确认删除菜单信息编号为"' + row.menuId + '"的数据项?',"警告",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(()=>{
        let params=new URLSearchParams();
        params.append("id",row.menuId);
          this.$axios.post('menu/delete',params).then(response =>{
            this.$message({showClose: true, message: "删除成功", type: "success"});
            this.getList();
          })
        }).catch(()=>{})
    }
  },
}
</script>

<style scoped>

</style>
