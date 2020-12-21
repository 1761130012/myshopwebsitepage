<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应链管理</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <!--    查询-->
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="仓库名称:">
        <el-input v-model="queryParams.name" placeholder="仓库名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="small">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
        >新增
        </el-button>
        <el-button
          type="warning"
          icon="el-icon-edit"
          size="small"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
        <el-form-item>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            :disabled="multiple"
            @click="handleDelete"
          >删除
          </el-button>
        </el-form-item>
      </el-form-item>


    </el-form>
    <!--    表格"-->
    <el-table
      :data="warehouseList"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @row-click="clickRow"
      ref="moviesTable"
      border
      style="width: 100%" header-align="center">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="warehouseId"
        label="仓库序号"
        min-width="80">
      </el-table-column>

      <el-table-column
        prop="name"
        label="仓库名称"
        min-width="120">
      </el-table-column>

      <el-table-column

        label="仓库驻地"
        min-width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.provinceVo.name}}{{scope.row.cityVo.name}}{{scope.row.areaVo.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="address"
        label="仓库地址"
        min-width="120">
      </el-table-column>


      <el-table-column
        prop="newCount"
        label="现有库存"
        min-width="120">
      </el-table-column>


      <el-table-column
        prop="maxCount"
        label="最大库存"
        min-width="120">
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="warning" icon="el-icon-edit" @click="handleUpdate(scope.row)" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="particulars(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--   分页-->
    <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageNum"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">  <!--//这是显示总共有多少数据，-->
    </el-pagination>

    <my-add ref="addRef" @handleQuery="handleQuery"></my-add>
    <my-update ref="updateRef" @handleQuery="handleQuery"></my-update>
    <my-particulars ref="particularsRef"></my-particulars>
  </div>
</template>


<script>
  import Add from "./warehouse/add";
  import Update from "./warehouse/update";
  import Particulars from "./warehouse/particulars";

  export default {

    data() {
      return {
        // 遮罩层
        loading: false,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        //第一页
        pageNum: 1,
        //每页显示多少
        pageSize: 5,
        //初始化数据
        warehouseList: [],

        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          name: undefined
        },
        // 表单参数
        form: {
          warehouseId: undefined,
          name: undefined,
          provinceId: undefined,
          cityId: undefined,
          areaId: undefined,
          address: undefined,
          newCount: undefined,
          maxCount: undefined,
          provinceVo: undefined,
          cityVo: undefined,
          areaVo: undefined,
        },
        // 表单校验
        rules: {
          name: [{
            required: true,
            message: '请输入角色名',
            trigger: 'blur'
          }]
        }
      }
    }, created() {
      this.getList();
    }, methods: {
      //分页
      handleCurrentChange: function (pageNum) {
        this.pageNum = pageNum;
        this.getList();
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.getList();
      },
      //初始化数据
      getList() {
        var _this = this;  //将当前vue对象保存到临时变量  _this中
        _this.loading = true;
        _this.$axios({
          url: 'warehouse/queryPageVo',
          method: 'post',
          params: {
            page: _this.pageNum,
            rows: _this.pageSize,
            name: _this.queryParams.name
          },
        }).then(function (result) {   //异步调用成功
          //去结果result中拿数据   data属性
          _this.warehouseList = result.data.records;
          //计算总页数
          _this.total = result.data.total;

          _this.loading = false;
        })

      },
      // 查询的方法
      handleQuery() {


        this.pageNum = 1;
        this.getList();
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.$refs.addRef.getData();
      },

      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.warehouseId)
        this.single = selection.length !== 1
        this.multiple = !selection.length;
      },
      //表格单击
      clickRow(row) {
        this.$refs.moviesTable.toggleRowSelection(row);
      },
      //修改按钮的点击事件
      handleUpdate(row) {
        let id = row.warehouseId || this.ids
        this.$refs.updateRef.getData(id);
      },
      //详情按钮的点击事件
      particulars(row) {
        let id = row.warehouseId;
        // alert(id)
        this.$refs.particularsRef.getData(id);
      },
      //删除按钮
      handleDelete: function (row) {
        var _this = this;
        let id = row.warehouseId || this.ids;

        this.$confirm('是否确认删除用户信息编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = new URLSearchParams();
          params.append('ids', id);

          this.$axios.post("warehouse/delWarehouse", params).then(function (result) {
            if (result) {
              _this.$message({message: '恭喜你，删除成功', type: 'success'});
              _this.handleQuery();
            } else {
              _this.$message({message: '删除失败', type: 'success'});
            }

          })
        })
      },
    }, components: {
      myAdd: Add,
      myUpdate: Update,
      myParticulars: Particulars,
    }
  }
</script>

<style scoped>

</style>
