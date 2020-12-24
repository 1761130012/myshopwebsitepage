<template>
  <div>
    <el-dialog :title="title" :visible.sync="updGoodsVisible"   :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="typeId">
          <el-select v-model="form.typeId" placeholder="请选择商品类型">
            <el-option v-for="g in goodsTypeVo" :key="g.typeId" :label="g.name" :value="g.typeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="form.price" placeholder="请输入商品价格" :step='1'></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入商品描述" :autosize="{minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset()">重置</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "update",
    data() {
      return {
        //初始化数据
        form: {
          goodsId:undefined,
          name: undefined,
          typeId: undefined,
          price: undefined,
          remark: undefined,
        },
        //表单验证
        rules: {
          name: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }],
          typeId: [{
            required: true,
            message: '请选择商品类型',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: '请输入商品描述',
            trigger: 'blur'
          }],
        },
        // 弹出层标题
        title: "",
        goodsTypeVo: [],
        //默认隐藏
        updGoodsVisible: false,

      }
    },methods:{
      //初始化数据绑定
      getData(id){
        this.updGoodsVisible= true;
        this.title = '修改商品';
        this.form.goodsId=id;
        var _this=this;
        //加载下拉框
        _this.$axios({
          url: 'goods/queryGoodsTypeVo',
          method: 'post',
        }).then(function (result) {
          _this.goodsTypeVo = result.data;
        })
        let url=new URLSearchParams();
        url.append("goodsId",this.form.goodsId);
        //表单初始化数据绑定
        this.$axios.post("goods/queryGoodsById",url).then(function (result) {
         _this.form=result.data;
          _this.form.typeId=result.data.goodsTypeVo.typeId;
        })
      },
      //关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //表单重置
      reset() {
        this.$refs.form.resetFields();
      },
      //表单提交
      submitForm(){
        var _this=this;
        this.form.goodsTypeVo=[];
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios({
              url: "goods/updGoodsById",
              method: "post",
              params:  _this.form,
            }).then(function (result) {
              _this.$emit("handleQuery");
              _this.$message({message: '恭喜你，修改成功', type: 'success'});
              _this.updGoodsVisible = false;
              _this.reset('form');
            })

          } else {
            console.log('error submit!!');
            _this.$message({showClose: true, message: '哎呀，修改失败', type: "success"});
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
