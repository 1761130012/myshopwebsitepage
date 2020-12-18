<template>
  <div class="loadingtext">
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
        <router-view :name="item.viewUrl"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>


  export default {
    created() {
      this.$router.push("/backstage/right/");
    },
    data() {
      return {
        editableTabsValue: "1",
        editableTabs: [
          {
            title: "仓库管理",
            name: "-1",
            viewUrl: "test2",
          },
          {
            title: "Tab 2",
            name: "-2",
            viewUrl: "test",
          },
        ],
        tabIndex: 2,
      };
    },
    methods: {
      addTab(target) {
        let flag = this.editableTabs.some((tab) => tab.name === target.id);
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
