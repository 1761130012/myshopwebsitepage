import Backstage from '../components/backstage/backstage'

import staff from "../components/backstage/systemSetting/staff/index";
import role from "../components/backstage/systemSetting/role/index";
import user from "../components/backstage/systemSetting/user/index";
import staff_role from "../components/backstage/systemSetting/staffRole";
import menu from "../components/backstage/systemSetting/menuItem/index";
import power from "../components/backstage/systemSetting/power";


import order from "../components/backstage/merchantsOrderSetting/backOrder";
import shop from "../components/backstage/merchantsOrderSetting/backShop";
import goods from "../components/backstage/systemSetting/power";
import purchase from "../components/backstage/supply_chain/purchase_record";
import warehouse from "../components/backstage/supply_chain/warehouse";
import supplier from "../components/backstage/supply_chain/supplier";
import apr_purchase from "../components/backstage/approval/purchase_examine";
import apr_shop from "../components/backstage/approval/aprShop";
import apr_goods from "../components/backstage/systemSetting/power";
import income from "../components/backstage/statistics/income";
import market from "../components/backstage/statistics/market";
import goodsType from '../components/backstage/supply_chain/goodstype/index'
import bath_business from "../components/backstage/systemSetting/batchBusiness";

import backstage_login from "../components/backstage/login/backstage_login";



export default [
  //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
  {//放开   Backstage 中 初始 化 有session 绕开 登录
    path: '/backstage', component: Backstage, alias: "/",
    children: [
      {
        path: 'right', components: {
          staff, role, user, staff_role, menu, power,
          order, shop, goods, purchase, warehouse, supplier,
          apr_purchase, apr_shop, apr_goods,
          income, market,goodsType,bath_business
        }
      },
    ]
  },
  {path: "/backstageLogin",component: backstage_login}
]
