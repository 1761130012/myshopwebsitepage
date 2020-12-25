import Index from '../components/index/index.vue'
import IndexChild from '../components/index/indexChild.vue'
import LeftMenu from '../components/index/userCenter/leftMenu.vue'
import indexPage from "../components/index/indexPage";

import UserInfo from '../components/index/userCenter/userInfo.vue'
import ShopIncome from '../components/index/userCenter/shopIncome'
import ShoInfoPage from '../components/index/shoInfoPage'
import ShopInfo from '../components/index/userCenter/shopInfo'
import PayMoney from '../components/index/payPage/indexPay'
import ShopCar from '../components/index/userCenter/shopCar'

import ShopOrderIndex from "../components/index/userCenter/shopOrderManage/index";
import UserOrderIndex from "../components/index/userCenter/userOrderManage/index";

import IndexLogin from "../components/index/login/index_login";
import IndexRegister from "../components/index/login/index_register";

export default [
  {
    path: '/index', component: Index,
    children: [
      {path: 'indexPage', component: indexPage,},
      {path: 'goodsPage', component: IndexChild,},
      {path: 'shopCar', component: ShopCar,},
      {
        path: 'userInfo',
        component: LeftMenu,
        children: [
          {
            path: 'show', components: {
              shopIncome: ShopIncome,
              userInfo: UserInfo,
              shopInfo: ShopInfo,
              shopCar: ShopCar,
              userOrderIndex: UserOrderIndex,
              shopOrderIndex: ShopOrderIndex,
            }
          }
        ]
      },
      {path: 'shoInfoPage/:goodsId', component: ShoInfoPage,},
      {path: 'payMoney/:orderId', component: PayMoney,},
    ],
  },
  {path: '/indexLogin', component: IndexLogin},
  {path: '/indexRegister', component: IndexRegister},
]
