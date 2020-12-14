import Index from '../components/index/index.vue'
import IndexChild from '../components/index/indexChild.vue'
import LeftMenu from '../components/index/userCenter/leftMenu.vue'

import UserInfo from '../components/index/userCenter/userInfo.vue'
import ShopCar from '../components/index/userCenter/shopCar'
import ShopIncome from '../components/index/userCenter/shopIncome'
import ShoInfoPage from '../components/index/shoInfoPage'
import PayMoney from '../components/index/payMoney'

export default [{
  path: '/index', component: Index, alias: '/',
  children: [
    {
      path: 'indexPage', component: IndexChild,
    },
    {
      path: 'userInfoLeftMenu', component: LeftMenu,
      children: [
        {path: 'userInfo', component: UserInfo},
        {path: 'shopCar', component: ShopCar},
        {path: 'shopIncome', component: ShopIncome},
      ]
    },
    {
      //需要传递 参数
      path: 'shoInfoPage/:goodsId', component: ShoInfoPage,
    },
    {
      //需要传递 参数
      path: 'payMoney', component: PayMoney,
    },
  ]
}]
