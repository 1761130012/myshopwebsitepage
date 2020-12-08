<template>
  <div>
    <el-row >
      <el-col :span="22" :offset="1" class="homeWrap">
        <el-container style="height:100%" direction="vertical">
          <el-header class="backstageHeader" height="61px">
            <el-col :span="5" :offset="19">
              <my-top></my-top>
            </el-col>
          </el-header>
          <el-container>
            <el-aside class="backstageAside" width="210px">
              <my-left @addTable='addTable'></my-left>
            </el-aside>
            <el-main class="backstageMain" style="height: 650px">
              <my-right ref="rightRef"></my-right>
            </el-main>
          </el-container>
          <el-footer class="backstageFooter" height="50px">
            <h4>XXX 有限公司</h4>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Top from "./top";
import Left from './left';
import Right from './right'

export default {
  methods: {
    addTable(target){
      this.$refs.rightRef.addTab(target);
    },
  },
  components: {
    myTop: Top,
    myLeft: Left,
    myRight:Right,
  },
};
</script>

<style scoped>
.backstageHeader {
  border-bottom: 1px #e6e6e6 solid;
}
.backstageAside {
}
.backstageMain {
  border-left: 1px #e6e6e6 solid;
   border-right: 1px #e6e6e6 solid;
}
.backstageFooter {
 border-top: 1px #e6e6e6 solid;
}

.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  /*width: 100%;
  height: 100%;*/
}
</style>
