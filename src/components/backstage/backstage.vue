<template>
  <div>
    <el-row >
      <el-col :span="20" :offset="2">
        <el-container>
          <el-header class="backstageHeader" height="70px">
            <el-col :span="5" :offset="19">
              <my-top></my-top>
            </el-col>
          </el-header>
          <el-container>
            <el-aside class="backstageAside" width="230px">
              <my-left @addTable='addTable'></my-left>
            </el-aside>
            <el-main class="backstageMain" style="height: 550px">
              <my-right ref="rightRef"></my-right>
            </el-main>
          </el-container>
          <el-footer class="backstageFooter" height="100px">
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

<style>
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
</style>
