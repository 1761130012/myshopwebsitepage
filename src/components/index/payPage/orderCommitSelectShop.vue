<template>
  <div>
    <!-- 选择 店铺 -->
    <el-dialog
      title="选择店铺"
      :visible.sync="dialogVisible"
      width="70%">
      <el-table
        :data="shopData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="商铺名">
        </el-table-column>
        <el-table-column
          prop="joinName"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="date"
          label="地址">
          <el-table-column
            prop="provinceVo"
            label="省">
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
            label="区/县">
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
          prop="state"
          label="选中状态"
          width="130px">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">
               <el-tag
                 key="默认"
                 effect="dark">
                 默认
               </el-tag>
            </span>
            <!-- 设置 1 为 选择中 -->
            <span v-if="scope.row.selectState === 1">
               <el-tag
                 key="选中"
                 type="success"
                 effect="dark">
                 选中
               </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <!-- 不选中的 -->
            <el-button v-if="scope.row.selectState === 0" @click=" selectShopId = scope.row.shopId " type="success">
              点击选中
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=" onChangeShop ">选 择</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        shopData: undefined,
        selectShopId: undefined,
      }
    },
    created() {
      this.getShopData();
    },
    watch: {
      selectShopId(newValue, oldValue) {
        if (oldValue !== undefined) {
          //进行 查询state=2 不能等于 newValue
          this.shopData.forEach((item) => {
            if (item.shopId === newValue) {
              item.selectState = 1;
            }
            if (item.shopId !== newValue) {
              item.selectState = 0;
            }
          })
        }

      }
    },
    methods: {
      getShopData() {
        let _this = this;
        this.$axios({
          url: "shop/queryAllShopVoByLoginName",
          method: 'post',
          params: {loginName: sessionStorage.getItem("loginName")}
        }).then((option) => {
          let data = option.data;
          if (data.length > 0) {
            _this.shopData = data.map((iterator) => {
              //把 item.shopVo 中的  state 替换 成外部的 state
              iterator.shopVo.state = iterator.state;

              //默认 选中
              iterator.shopVo.selectState = 0;
              if (iterator.shopVo.state === 1) {
                //设置 默认 的 商铺
                iterator.shopVo.selectState = 1;
                _this.selectShopId = iterator.shopVo.shopId;
              }
              return iterator.shopVo;
            })
          }
        })
      },
      onChangeShop() {
        //进行 赋值
        this.$emit("updateShop",this.shopData.find(item => item.selectState === 1) );
        this.dialogVisible = false
      },
    }
  }
</script>

<style scoped>

</style>
