import Index from '../components/index/index.vue'
import IndexChild from '../components/index/indexChild.vue'
import LeftMenu from '../components/index/userCenter/leftMenu.vue'

import UserInfo from '../components/index/userCenter/userInfo.vue'
import ShopCar from '../components/index/userCenter/shopCar'
import ShopIncome from '../components/index/userCenter/shopIncome'
import ShoInfoPage from '../components/index/shoInfoPage'
import PayMoney from '../components/index/payPage/indexPay'

import ShopOrderIndex from "../components/index/userCenter/shopOrderManage/index";

export default [{
  path: '/index', component: Index, alias: '/index',
  children: [
    {path: 'indexPage', component: IndexChild,},
    {
      path: 'userInfo',
      component: LeftMenu,
      children: [
        {
          path: 'show', components: {
            shopIncome: ShopIncome,
            userInfo: UserInfo,
            shopOrderIndex: ShopOrderIndex,
          }
        }
      ]
    },
    {path: 'shoInfoPage/:goodsId', component: ShoInfoPage,},
    {path: 'payMoney/:orderId', component: PayMoney,},
  ]
}]
