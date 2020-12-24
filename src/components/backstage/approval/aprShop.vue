<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="likeShopName" placeholder="店铺名">
          <el-button slot="append" icon="el-icon-search" @click="queryByName">查询</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="shopId"
          label="商铺编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商铺名">
        </el-table-column>
        <el-table-column
          label="地址">
          <el-table-column
            prop="provinceVo"
            label="省份">
            <template slot-scope="scope">
              {{scope.row.provinceVo.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop="cityVo"
            label="市">
            <template slot-scope="scope">
              {{scope.row.cityVo.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop="areaVo"
            label="县/区">
            <template slot-scope="scope">
              {{scope.row.areaVo.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="详细地址">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="joinName"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="userVo"
          label="用户账户">
          <template slot-scope="scope">
            {{scope.row.userVo.loginName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 0 " class="my-success">未审核</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="queryUserByUserId(scope.row.userId)" type="primary">点击查看用户</el-button>
            <el-button type="primary" @click="updatePassState(scope.row.shopId)">通过</el-button>
            <el-button type="danger" @click="updateErrorState(scope.row.shopId)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <apr-shop-user ref="aprShopUserRef"></apr-shop-user>
  </div>
</template>

<script>
  import aprShopUser from "./aprShopUser";

  export default {
    data() {
      return {
        likeShopName: "",
        tableData: undefined,
        total: 0,
        currentPage: 1,
        size: 5,
        multipleSelection: [],
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        this.$axios({
          url: "shop/queryPageVo",
          method: 'get',
          params: {
            current: _this.currentPage,
            size: _this.size,
            name: _this.likeShopName,
          },
        }).then((option) => {
          let data = option.data;
          _this.tableData = data.records;
          _this.total = data.total;
        }).catch((option) => {
          console.log(option.data)
        })
      },
      queryByName() {
        this.getData();
      },
      handleSizeChange(val) {
        this.size = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      //选中的行 变化
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      queryUserByUserId(userId) {
        //进行 加载
        this.$refs.aprShopUserRef.getData(userId)
        this.$refs.aprShopUserRef.dialogVisible = true;
      },
      updatePassState(shopId) {
        let _this = this;
        this.$axios({
          url: "shop/updatePassState",
          params: {
            shopId: shopId,
          },
        }).then((option) => {
          if (option.data) {
            _this.$message.success("通过成功！");
            _this.getData();
          } else {
            _this.$message.error("通过失败！");
          }
        })
      },
      updateErrorState(shopId) {
        let _this = this;
        this.$axios({
          url: "shop/updateErrorState",
          params: {
            shopId: shopId,
          },
        }).then((option) => {
          if (option.data) {
            _this.$message.success("驳回成功！");
            _this.getData();
          } else {
            _this.$message.error("驳回失败！");
          }
        })
      }
    },
    components: {
      aprShopUser,
    }
  }
</script>

<style scoped>

</style>
