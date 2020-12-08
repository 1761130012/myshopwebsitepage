import Backstage from '../components/backstage/backstage.vue'
import Test1 from '../components/backstage/systemSetting/test1'
import Test2 from '../components/backstage/supply_chain/warehouse'
import backstage_login from '../components/backstage/login/backstage_login';
import purchase_record from '../components/backstage/supply_chain/purchase_record';

export default {
    //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
    path:'/backstage',component:Backstage,alias:'/',
    children:[
        {path:'right',components:{
            test:{
                template:'<h1> this is test </h1>'
            },
            test1:Test1,
            //仓库管理 要改名
            test2:Test2,
            //后台登录
            back_login:backstage_login,
            // 采购管理
            purchase_record:purchase_record,
        }},

    ]
}
