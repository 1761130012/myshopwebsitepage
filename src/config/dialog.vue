<template>
  <div>
    <el-button @click="dialogVisible = true">
      <slot name="buttonName">显示对话框</slot>
    </el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose"
    >
      <slot name="content"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMenthod">取 消</el-button>
        <el-button type="primary" @click="commitMethod">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      width:'30%',
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    commitMethod() {
      this.$emit("commitMethod");

      this.dialogVisible = false;
    },
    closeMenthod() {
      this.$emit("closeMenthod");
      this.dialogVisible = false;
    },
  },
};
</script>