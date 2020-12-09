import Index from '../components/index/index.vue'
import IndexChild from '../components/index/indexChild.vue'
import LeftMenu from '../components/index/userCenter/leftMenu.vue'

import UserInfo from '../components/index/userCenter/userInfo.vue'
import ShopCar from '../components/index/userCenter/shopCar'


export default [{
  path: '/index', component: Index, alias: '/index',
  children: [
    {path: 'indexPage', component: IndexChild},
    {
      path: 'leftMenu', component: LeftMenu,
      children: [
        {path: 'userInfo', component: UserInfo},
        {path: 'shopCar', component: ShopCar}
      ]
    }
  ]
}]
