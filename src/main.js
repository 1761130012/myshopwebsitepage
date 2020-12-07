import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import BackstageRouter from './routes/backstageRouter.js'
import DepositRouter from './routes/depositRouter.js'
import IndexRouter from './routes/indexRouter.js'
import axios from 'axios'
//import VueAxios from 'vue-axios'
//Vue.use(VueAxios,axios);
 
//所有axios的默认请求地址
axios.defaults.baseURL = "http://localhost:8080/maven_custom_web_war_exploded/"
//设置全局，每次ajax请求携带cookies
axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$axios = axios

//解决重复点击 路由报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)
Vue.use(ElementUi)

let vm=new Vue({
  el: '#app',
  router:new VueRouter({
    routes: [ 
      BackstageRouter,DepositRouter,IndexRouter]
  }),
})

// //默认
// vm.$router.replace({
//   path:'/backstage',
// })
