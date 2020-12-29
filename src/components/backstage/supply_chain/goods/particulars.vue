<template>
  <div>
    <el-dialog :title="title" :visible.sync="updGoodsVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" readonly></el-input>
        </el-form-item>
        <el-form-item disabled label="商品类型" prop="typeId">
          <el-select v-model="form.typeId" placeholder="请选择商品类型">
            <el-option v-for="g in goodsTypeVo" :key="g.typeId" :disabled='true' :label="g.name" :value="g.typeId"
                       readonly></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="form.price" :disabled='true' placeholder="请输入商品价格" :step='1'></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述" prop="remark">
          <el-input v-model="form.remark" readonly type="textarea" placeholder="请输入商品描述"
                    :autosize="{minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <div>

            <span>
             <el-form-item label="添加商品图片"
                           :label-width="formLabelWidth">
               <input type="file" @change="getFile($event)">
              </el-form-item>
          </span>

          <el-table
            :data="goodsImgList"
            ref="moviesTable"
            border
            style="width: 100%" header-align="center">


            <el-table-column
              prop="id"
              label="图片编号"
              min-width="80">
            </el-table-column>

            <el-table-column
              prop="adders"
              label="图片预览"
              min-width="80">
              <template slot-scope="scope">
                <img :src='scope.row.adders' style="width: 30px"/>
              </template>
            </el-table-column>

            <el-table-column
              prop="adders"
              label="图片地址"
              min-width="80">
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="130">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                  <el-button type="warning" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                             size="small"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                  <el-button type="danger" size="small" icon="el-icon-delete"
                             @click="handleDelete(scope.row)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">上传</el-button>
      </div>
    </el-dialog>
    <my-update ref="updGoodsImgRef" @getData="getData" ></my-update>
  </div>
</template>

<script>

  import Update from "../goods/particulars/update";

  export default {
    name: "particulars",
    data() {
      return {
        //初始化数据
        form: {
          goodsId: undefined,
          name: undefined,
          typeId: undefined,
          price: undefined,
          remark: undefined,
          img: '',
        },
        file: '',
        dialogVisible: false,
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
        // element ui的展示上传文件列表
        fileList: {},
        //默认隐藏
        updGoodsVisible: false,
        //添加模态框中 文字lable宽度，也可以在页面写死
        formLabelWidth: '120px',
        dialogImageUrl: '',
        goodsImgList: [],
        googdsImg: {
          id: undefined,
          adders: undefined,
        },
      }
    }, methods: {
      //点击删除按钮
      handleDelete(row) {
        var _this=this;
        var id=row.id;
        this.$confirm('是否确认删除用户信息编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let url = new URLSearchParams();
          url.append('id',id);
          this.$axios.post("goods/delGoodsImgById", url).then(function (result) {

            if (result.data=="1"){
              _this.$message("删除成功");
              _this.getData(_this.form.goodsId);
            }else {
              _this.$message("删除失败,出现未知错误");
            }
          })
        })
      },

      //点击修改按钮
      handleUpdate(row){
        let id = row.id;
        this.$refs.updGoodsImgRef.getData(id);
      },
      //添加模态框上执行添加操作 出发该方法
      onSubmit(event) {
        var _this = this;

        //阻止元素发生默认的行为
        event.preventDefault();
        let formData = new FormData();
        formData.append("img", this.form.img);
        //将需要提交的表单数据 快速组装为H5定义的类型FormData
        Object.keys(_this.form).forEach((key) => {
          formData.append(key, _this.form[key]);
        });
        //此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
        //此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
        this.$axios({
          method: 'post',
          url: 'goods/addGoodsImg',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          _this.$message(response.data.msg);
          _this.updGoodsVisible = false
        }).catch(function (error) {
          _this.$message("上传失败,出现未知错误");
          console.log(error);
        });

      },
      //文件每次选中，触发此方法  将选中的文件内容填充到addform中的img  后台通过img获取文件内容
      getFile: function (event) {
        this.form.img = event.target.files[0];
        var file = event.target.files[0];
        console.log(file)
        const isImage = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/bmp' || file.type == 'image/gif' || file.type == 'image/webp';
        const isLt2M = file.size < 1024 * 1024 * 30;
        if (!isImage) {
          this.$message.error('上传只能是png,jpg,jpeg,bmp,gif,webp格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 30MB!');
        }
        return isImage && isLt2M;
      },
      //初始化数据绑定
      getData(id) {
        this.updGoodsVisible = true;
        this.title = '添加商品图片';
        this.form.goodsId = id;
        var _this = this;
        //加载下拉框
        _this.$axios({
          url: 'goods/queryGoodsTypeVo',
          method: 'post',
        }).then(function (result) {
          _this.goodsTypeVo = result.data;
        })
        let url = new URLSearchParams();
        url.append("goodsId", this.form.goodsId);
        //表单初始化数据绑定
        this.$axios.post("goods/queryGoodsById", url).then(function (result) {
          _this.form = result.data;
          _this.form.typeId = result.data.goodsTypeVo.typeId;
        })
        //查询图片信息
        _this.$axios.post("goods/goodsImgList", url).then(function (result) {
          console.log(result)
          _this.goodsImgList = result.data;
        })

      },
      //关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          }).catch(_ => {});
      },
      //表单重置
      reset() {
        this.$refs.form.resetFields();
      },
    },
    //导入外部vue
    components: {
      myUpdate: Update,
    }
  }
</script>

<style scoped>

</style>
