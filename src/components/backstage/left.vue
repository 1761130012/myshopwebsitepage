<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <div v-for="menu in menuData">
        <el-submenu :index="menu.id + ''">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
          <div v-for="child in menu.children">
            <el-submenu
              v-if="child.children !==undefined && child.children.length > 0"
              :index="menu.id + '_' + child.id"
            >
              <template slot="title"
              ><i :class="child.icon"></i> {{ child.title }}
              </template
              >
              <div v-for="child1 in child.children">
                <el-menu-item
                  :index="menu.id + '_' + child.id + '_' + child1.id"
                  @click="addTable(child1)"
                ><i :class="child1.icon"></i> {{ child1.title }}
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item
              v-else
              :index="menu.id + '_' + child.id"
              @click="addTable(child)"
            >
              <i :class="child.icon"></i> {{ child.title }}
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
            id: 1,
            title: "系统管理",
            icon: "el-icon-setting",
            children: [
              {
                id: 30,
                title: "员工管理",
                icon: "el-icon-platform-eleme",
                url: "staff",
                children: []
              }, {
                id: 31,
                title: "角色管理",
                icon: "el-icon-platform-eleme",
                url: "role",
                children: []
              },
              {
                id: 32,
                title: "菜单管理",
                icon: "el-icon-platform-eleme",
                url: "menu",
                children: []
              },
              {
                id: 33,
                title: "用户管理",
                icon: "el-icon-platform-eleme",
                url: "user",
                children: []
              },
            ],
          },
          {
            id: 2,
            title: "供应链管理",
            icon: "el-icon-setting",
            children: [
              {
                id: 34,
                title: "仓库管理",
                icon: "el-icon-platform-eleme",
                url: "test2",
                children: []
              }, {
                id: 35,
                title: "登录",
                icon: "el-icon-platform-eleme",
                url: "back_login",
                children: []
              },
              {
                id: 36,
                title: "采购记录",
                icon: "el-icon-platform-eleme",
                url: "purchase_record",
                children: []
              },
              {
                id: 44,
                title: "供应商管理",
                icon: "el-icon-platform-eleme",
                url: "supplier",
                children: []
              },
            ],
          },
          {
            id: 3,
            title: "商户订单管理",
            icon: "el-icon-setting",
            children: [
              {
                id: 37,
                title: "商户管理",
                icon: "el-icon-platform-eleme",
                url: "backShop",
                children: []
              },
              {
                id: 38,
                title: "订单管理",
                icon: "el-icon-platform-eleme",
                url: "backOrder",
                children: []
              },{
                id: 39,
                title: "测试",
                icon: "el-icon-platform-eleme",
                url: "text",
                children: []
              }
            ],
          },
        ],
      };
    },
    methods: {
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
