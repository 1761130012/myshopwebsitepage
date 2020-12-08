<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">

      <el-container>
        <el-header style="text-blink: right; font-size: 12px">

          <div   style="margin-top: 1px;">
            <el-select v-model="select" style="width: 100px" slot="prepend" placeholder="请选择">
              <div v-for="c in cangku">
                <el-option  :label="c.name" :value="c.id"></el-option>
              </div>

            </el-select>
            <el-input placeholder="请输入内容" style="width: 350px" v-model="input" class="input-with-select" clearable>


              <el-button slot="append" @click="addWarehouse" >添加仓库</el-button>

            </el-input>
          </div>

          <span>用户</span>
        </el-header>

        <el-main>
          <el-table
            element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      :data="tableData">
            <el-table-column prop="warehouse_id" label="仓库编号" width="100"></el-table-column>
            <el-table-column prop="name" label="仓库名称" width="140">
            </el-table-column>
            <el-table-column prop="address" label="仓库地址" width="120">
            </el-table-column>
            <el-table-column prop="kucun" label="已有库存" width="120">
            </el-table-column>
            <el-table-column prop="max_count" label="最大库存">
            </el-table-column>

          </el-table>
        </el-main>
        <el-footer>
          <div  class="block">
            <el-pagination @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000"  style="text-align: center">
            </el-pagination>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>

</template>


<script>
  export default {

    data() {
      const item = {
        warehouse_id: 0,
        name: '仓库',
        address: '长沙岳麓区',
        kucun:99999,
        max_count: 1000000
      };
      const cangk={
        id:"1",
        name:"仓库1"
      };
      return {
        select: '',
        input: "",
        cangku:Array(5).fill(cangk),
        tableData: Array(5).fill(item),
        currentPage1: 1,
        currentPage2: 5,
        currentPage3: 0,
        currentPage4: 4
      }
    },methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },addWarehouse(){

      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
