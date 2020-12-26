<template>
  <div class="loadingtext" style="margin-left: -15px">
    <el-col :span="1">
      <el-button icon="el-icon-refresh-right" circle @click="reload "></el-button>
    </el-col>
    <el-col :span="23">
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :name="item.name"
        >
          <span slot="label"><i :class="item.icon"></i> {{ item.title }}</span>
          <router-view v-if="isRouterActive" :name="item.viewUrl"></router-view>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>
<script>


  export default {
    provide() {
      return {
        reload: this.reload,
      }
    },
    created() {
      this.$router.push("/backstage/right/");
    },
    data() {
      return {
        editableTabsValue: "1",
        editableTabs: [],
        tabIndex: 2,

        //路由
        isRouterActive: true,
      };
    },
    methods: {
      reload() {
        this.isRouterActive = false;
        this.$nextTick(() => {
          this.isRouterActive = true;
        })
      },
      addTab(target) {
        let flag = this.editableTabs.some((tab) => tab.name + "" === target.menuId + "");
        if (!flag) {
          this.editableTabs.push({
            title: target.name,
            name: target.menuId + "",
            icon: target.icon,
            viewUrl: target.url,
          });
        }
        this.editableTabsValue = target.menuId + "";
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      },
    },
  };
</script>
