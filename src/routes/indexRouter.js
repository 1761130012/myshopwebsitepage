import Index from '../components/index/index.vue'
import IndexChild from '../components/index/indexChild.vue'
import LeftMenu from '../components/index/userCenter/leftMenu.vue'

import UserInfo from '../components/index/userCenter/userInfo.vue'


export default [{
    path:'/index',component:Index,alias:'/index',
    children:[
        {path:'child',component:IndexChild},
        {path:'leftMenu',component:LeftMenu,
        children:[
            {path:'userInfo',component:UserInfo}
        ]}
    ]
}]
