import Backstage from '../components/backstage/backstage.vue'
import Test2 from '../components/backstage/supply_chain/warehouse'
import backstage_login from '../components/backstage/login/backstage_login';
import purchase_record from '../components/backstage/supply_chain/purchase_record';
import BackShop from '../components/backstage/merchantsOrderSetting/backShop';
import Role from '../components/backstage/systemSetting/role';
import StaffRole from '../components/backstage/systemSetting/staffRole';

import Power from '../components/backstage/systemSetting/power';
import Market from '../components/backstage/statistics/market';
import Income from '../components/backstage/statistics/income';
import AprShop from '../components/backstage/approval/aprShop';
import TestPay from '../components/backstage/testPay';


export default [
  //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
  {
    path: '/backstage', component: Backstage, alias: '/',
    children: [
      {
        path: 'right', components: {
          backShop: BackShop,
          power: Power,
          staffRole:StaffRole,
          market:Market,
          income:Income,
          aprShop:AprShop,
          pay:TestPay,
        }
      },
    ]
  }
]
