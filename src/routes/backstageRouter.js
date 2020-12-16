import Backstage from '../components/backstage/backstage.vue'
import Test2 from '../components/backstage/supply_chain/warehouse'
import backstage_login from '../components/backstage/login/backstage_login';
import purchase_record from '../components/backstage/supply_chain/purchase_record';
import BackShop from '../components/backstage/merchantsOrderSetting/backShop';
import BackOrder from '../components/backstage/merchantsOrderSetting/backOrder';
import Role from '../components/backstage/systemSetting/role';
import testRole from '../components/backstage/test/test';
import Supplier from '../components/backstage/supply_chain/supplier';

export default [
  //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
  {
    path: '/backstage', component: Backstage, alias: '/',
    children: [
      {
        path: 'right', components: {
          test: {
            template: '<h1> this is test </h1>'
          },
          test6:testRole,

          supplier:Supplier,

          //商户管理
          backShop: BackShop,
          //订单管理
          backOrder: BackOrder,

          role: Role,
          //仓库管理 要改名
          test2: Test2,
          //后台登录
          back_login: backstage_login,
          // 采购管理
          purchase_record: purchase_record,
        }
      },
    ]
  }
]
