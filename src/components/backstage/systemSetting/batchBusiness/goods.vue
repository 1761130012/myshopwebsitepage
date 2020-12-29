<template>
  <div>
    <!-- 商品 -->
    <el-drawer
      title="批量添加员工信息"
      :visible.sync="drawer"
      size="80%"
      :direction="direction">
      <!-- 员工 -->
      <el-divider content-position="left">批量添加商品信息(需审批完才可以批量添加)</el-divider>
      <el-row>
        <el-col :span="20">
          <el-table :data="showData"
                    ref="moviesTable" style="width: 100%" header-align="center">
            <el-table-column label="商品名称" align="center" prop="name"/>
            <el-table-column label="商品类型" align="center" prop="typeId">
              <template slot-scope="params">
                <span>{{queryTypeNameById(params.row.typeId)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品售价" align="center" prop="price" :formatter="priceMethod"/>
            <el-table-column label="商品描述" align="center" :show-overflow-tooltip="true" prop="remark"/>
            <el-table-column label="审批状态">
              <template slot-scope="params">
                <span v-if="params.row.state===0">
                  <el-tag
                    :key="params.row.id"
                    type="primary"
                    effect="dark">
                    未审批
                  </el-tag>
                </span>
                <span v-if="params.row.state===1">
                  <el-tag
                    :key="params.row.id"
                    type="success"
                    effect="dark">
                    审批结束
                  </el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="审批" placement="top-start">
                  <el-button type="success" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                             size="small"></el-button>
                </el-tooltip>
                <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row)">
                  <el-tooltip class="item" slot="reference" effect="dark" content="删除" placement="top-end">
                    <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
      <el-divider content-position="left">只会批量添加审批过的</el-divider>
      <el-row>
        <el-col>
          <el-col :span="2">
            <el-button type="primary" @click="bathPassAddGoods" icon="el-icon-plus">批量添加</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <goods-update ref="goodsUpdateRef" @passApproveById="passApproveById"></goods-update>
  </div>
</template>

<script>
  import goodsUpdate from "./goodsUpdate";

  export default {

    data() {
      return {
        drawer: false,
        direction: 'btt',
        goodsVos: [],
        showData: [],
        typeNames: [
          {typeId: '', name: ''},
        ],

        currentPage: 1,
        size: 5,
        total: 0,
      }
    },
    created() {
      this.queryAllGoodsType();
    },
    watch: {
      currentPage() {
        this.getShowData();
      },
      size() {
        this.getShowData();
      },
    },
    methods: {
      setData(data) {
        data.forEach((item, index) => {
          item.id = index + 1;
          item.state = 0;
        })
        this.goodsVos = data;
        //进行 获取 展示数据
        this.getShowData();
      },
      getShowData() {
        let showData = [];
        let _this = this;
        this.goodsVos.forEach((item, index) => {
          if (index >= (_this.currentPage - 1) * _this.size && index < ((_this.currentPage - 1) * _this.size) + _this.size) {
            showData.push(item);
          }
        })
        this.showData = showData;
        this.total = this.goodsVos.length;
      },
      queryAllGoodsType() {
        this.$axios.get("goods/queryAllType").then(({data}) => {
          this.typeNames = data;
        })
      },
      queryTypeNameById(id) {
        let typeVo = this.typeNames.find((item) => item.typeId === id);
        return typeVo === undefined ? "" : typeVo.name;
      },
      bathPassAddGoods() {
        //获取 审批完成的
        let data = this.goodsVos.filter((item) => item.state === 1)

        //进行 批量 添加
        this.$axios({
          url: 'goods/insertBathGoodsVo',
          method: 'post',
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
          if (option.data) {
            this.$message.success("成功！");
            //进行删除
            this.goodsVos = this.goodsVos.filter((item) => item.state !== 1)
            //调用
            this.getShowData();
          } else {
            this.$message.success("失败！")
          }
        })
      },
      //修改
      handleUpdate(row) {
        let updateRef = this.$refs.goodsUpdateRef;
        updateRef.goodsType = this.typeNames;
        updateRef.dialogVisible = true;
        let vo = {
          id: row.id,
          name: row.name,
          typeId: row.typeId,
          price: row.price,
          remark: row.remark,
        }
        updateRef.setStaffVo(vo);
      },
      handleDelete: function (row) {
        let _this = this;
        this.goodsVos.forEach((item, index) => {
          if (item.id === row.id) {
            _this.goodsVos.splice(index, index + 1);
          }
        })
        _this.getShowData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleSizeChange(val) {
        this.size = val;
      },
      passApproveById({id, name, typeId, price, remark}) {
        this.goodsVos.find((item) => {
          if (item.id === id) {
            item.name = name;
            item.typeId = typeId;
            item.price = price;
            item.remark = remark;
            item.state = 1;
          }
        })
      },
      priceMethod({price}) {
        return price + " ￥"
      },
    },
    components: {
      goodsUpdate
    },
  }
</script>

<style scoped>

</style>
