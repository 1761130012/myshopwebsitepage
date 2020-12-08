import Backstage from '../components/backstage/backstage.vue'
import Test1 from '../components/backstage/systemSetting/test1'
import backShop from '../components/backstage/merchantsOrderSetting/backShop'

export default {
    //地址输入 / 就会 进入 /backstage 相当于 有 两个 地址
    path:'/backstage',component:Backstage,alias:'/',
    children:[
        {path:'right',components:{
            test:{
                template:'<h1> this is test </h1>'
            },
            test1:Test1,
            backShop:backShop,
        }},

    ]
}
