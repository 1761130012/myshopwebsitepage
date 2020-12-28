<template>
  <div>
    <!-- 商品修改 -->
    <!-- 进行修改 -->
    <el-dialog
      title="商品信息修改"
      :visible.sync="dialogVisible"
      width="60%">
      <!-- 添加或修改用户信息对话框 :rules="rules"-->
      <el-row :gutter="15">
        <el-form ref="goodsVo" :model="goodsVo" :rules="rules" label-width="80px">
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="goodsVo.name" placeholder="商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品类型" prop="typeId">
              <el-select v-model="goodsVo.typeId">
                <el-option
                  v-for="item in goodsType"
                  :key="item.typeId"
                  :label="item.name"
                  :value="item.typeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品售价" prop="price">
              <el-input-number v-model="goodsVo.price" :precision="2" :step="1"></el-input-number>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="商品描述" prop="loginName">
              <el-input v-model="goodsVo.remark" placeholder="商品描述"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="commitUpdate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        // 表单参数
        goodsVo: {
          name: "",
          typeId: "",
          price: "",
          remark: "",
        },
        goodsType: [],
        rules: {
          name: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          typeId: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      setStaffVo(goodsVo) {
        this.goodsVo = goodsVo;
      },
      commitUpdate() {
        this.$refs['goodsVo'].validate((valid) => {
          if (valid) {
            let vo = this.goodsVo;
            this.$emit("passApproveById", {
              id: vo.id,
              name: vo.name,
              typeId: vo.typeId,
              price: vo.price,
              remark: vo.remark,
            });
            this.resetForm();
          } else {
            return false;
          }
        });

      },
      resetForm() {
        this.$refs['goodsVo'].resetFields()

        this.dialogVisible = false;
      },
    }
  }
</script>

<style scoped>

</style>
