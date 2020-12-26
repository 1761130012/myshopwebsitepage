<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <div v-for="menu in menuData">
        <el-submenu :index="menu.menuId + ''">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
          </template>
          <div v-for="child in menu.children">
            <el-submenu
              v-if="child.children !==undefined && child.children.length > 0"
              :index="menu.menuId + '_' + child.menuId"
            >
              <template slot="title"
              ><i :class="child.icon"></i> {{ child.name }}
              </template
              >
              <div v-for="child1 in child.children">
                <el-menu-item
                  :index="menu.menuId + '_' + child.menuId + '_' + child1.menuId"
                  @click="addTable(child1)"
                ><i :class="child1.icon"></i> {{ child1.name }}
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item
              v-else
              :index="menu.menuId + '_' + child.menuId"
              @click="addTable(child)"
            >
              <i :class="child.icon"></i> {{ child.name }}
            </el-menu-item
            >
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuData: [
          {
            menuId: 1,
            name: "系统管理",
            icon: "el-icon-setting",
            children: [
              {
                menuId: 30,
                name: "员工管理",
                icon: "el-icon-platform-eleme",
                url: "staff",
                children: []
              },
            ],
          },
        ],
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this
        this.$axios({
          url: "menu/queryAllMenuNotButton",
          method: 'get',
          params: {loginName: sessionStorage.getItem("loginName")},
        }).then((option) => {
          if (option.data.length > 0) {
            _this.menuData = option.data;
          } else {
            _this.$message.error("错误！")
          }
        }).catch((option) => {
          _this.$message.error("权限问题！")
        })
      },
      addTable(target) {
        this.$emit("addTable", target);
      },
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<style>
  .el-menu-vertical-demo .is-active {
    border-right: 1px solid #409eff;
  }
</style>
