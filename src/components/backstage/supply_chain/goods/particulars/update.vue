<template>
  <div>
    <el-dialog :title="title" :visible.sync="updImgVisible" :before-close="handleClose">
      <el-form label-width="100px">
        <el-form-item label="修改商品图片"
                      :label-width="formLabelWidth">
          <input type="file" @change="getFile($event)">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">上传</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "update",
    data: function () {
      return {
        form: {
          id: undefined,
          goodsId: undefined,
          adders: '',
          img: '',
        },
        formLabelWidth: '120px',
        updImgVisible: false,
        title: '',
      }
    }, methods: {
      onSubmit(event) {
        var _this = this;
        //阻止元素发生默认的行为
        event.preventDefault();

        let formData = new FormData();
        console.log(this.form.id)
        formData.append("img", this.form.img);
        //将需要提交的表单数据 快速组装为H5定义的类型FormData
        Object.keys(_this.form).forEach((key) => {
          formData.append(key, _this.form[key]);
        });
        //此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
        //此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
        this.$axios({
          method: 'post',
          url: 'goods/updateGoodsImg',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          _this.$message(response.data.msg);
          _this.updImgVisible = false;
          _this.$emit("getData",_this.form.goodsId);
        }).catch(function (error) {
          _this.$message("上传失败,出现未知错误");
          console.log(error);
        });

      },
      //进入的方法,初始表单数据进行赋值
      getData(id) {
        var _this=this;
        this.updImgVisible = true;
        this.title = '修改图片';
        this.form.id = id;
        let url = new URLSearchParams();
        url.append('id',this.form.id);
        this.$axios.post("goods/queryGoodsImgById", url).then(function (result) {
              _this.form.goodsId=result.data.goodsId;
        })
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
      //关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          }).catch(_ => {
        });
      },
    }
  }
</script>

<style scoped>

</style>
