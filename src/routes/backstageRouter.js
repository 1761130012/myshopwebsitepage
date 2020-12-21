import Backstage from '../components/backstage/backstage'

import staff from "../components/backstage/systemSetting/staff/index";
import role from "../components/backstage/systemSetting/role/index";
import user from "../components/backstage/systemSetting/user/index";
import staff_role from "../components/backstage/systemSetting/staffRole";
import menu from "../components/backstage/systemSetting/menuItem/index";
import power from "../components/backstage/systemSetting/power";


import order from "../components/backstage/systemSetting/power";
import shop from "../components/backstage/systemSetting/power";
import goods from "../components/backstage/systemSetting/power";
import purchase from "../components/backstage/systemSetting/power";
import warehouse from "../components/backstage/systemSetting/power";
import supplier from "../components/backstage/systemSetting/power";
import apr_purchase from "../components/backstage/systemSetting/power";
import apr_shop from "../components/backstage/systemSetting/power";
import apr_goods from "../components/backstage/systemSetting/power";
import income from "../components/backstage/statistics/income";
import market from "../components/backstage/statistics/market";


export default [
  //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
  {
    path: '/backstage', component: Backstage, alias: '/',
    children: [
      {
        path: 'right', components: {
          staff, role, user, staff_role, menu, power,
          order, shop, goods, purchase, warehouse, supplier,
          apr_purchase, apr_shop, apr_goods,
          income, market,
        }
      },
    ]
  },

]
