import Backstage from '../components/backstage/backstage.vue'
import Staff from '../components/backstage/systemSetting/staff'
import Role from '../components/backstage/systemSetting/role'
import MenuItem from '../components/backstage/systemSetting/menuItem'
import Test1 from '../components/backstage/test/test1'

export default [{
    //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
    path:'/backstage',component:Backstage,alias:'/',
    children:[
        {path:'right',components:{
            test1:Test1,
        }},

    ]
}]
