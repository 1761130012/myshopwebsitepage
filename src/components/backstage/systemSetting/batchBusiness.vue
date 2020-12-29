<template>
  <div>
    <el-row>
      <el-col :span="3">
        <span :style="{fontSize:'26px'}">模板下载：</span>
      </el-col>
      <el-col :span="3">
        <el-select v-model="selectUrl" placeholder="请选择下载">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="downloadFile" icon="el-icon-download">点击下载</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <span style="font-size: 25px">员工</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="$refs.staffRef.drawer=true ">查看上次员工记录</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
        <span style="font-size: 25px">商品</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="$refs.goodsRef.drawer=true ">查看上次商品记录</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8080/maven_custom_web_war_exploded/staff/readFileStaff"
          :on-success="staffFileUpSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传文件仅限于 .xlsx 文件</div>
        </el-upload>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8080/maven_custom_web_war_exploded/goods/readFileGoods"
          :on-success="goodsFileUpSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传文件仅限于 .xlsx 文件</div>
        </el-upload>
      </el-col>
    </el-row>

    <my-staff ref="staffRef"></my-staff>
    <my-goods ref="goodsRef"></my-goods>
  </div>
</template>

<script>
  import myStaff from "./batchBusiness/staff";
  import myGoods from "./batchBusiness/goods";

  export default {
    data() {
      return {
        userVos: [],

        selectUrl: "1",
        options: [
          {
            id: "1",
            label: "员工模板",
            fileName: "staffFormwork.zip",
          },
          {
            id: "2",
            label: "商品模板",
            fileName: "goodsFormwork.zip",
          }
        ]
      }
    },
    methods: {
      downloadFile() {
        let fileName = this.options.find((item) => item.id === this.selectUrl).fileName;

        location.href = "http://localhost:8080/maven_custom_web_war_exploded//downloadFile/downloadFileTemplate?fileName=" + fileName;
      },
      staffFileUpSuccess(response) {
        this.$refs.staffRef.setData(response);
        this.$refs.staffRef.drawer = true;
      },
      goodsFileUpSuccess(response) {
        this.$refs.goodsRef.setData(response);
        this.$refs.goodsRef.drawer = true;
      }
    },
    components: {
      myStaff,
      myGoods
    },
  }
</script>

<style scoped>
</style>
