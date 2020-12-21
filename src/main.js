import Vue from 'vue'
import Vuex from 'vuex'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import BackstageRouter from './routes/backstageRouter.js'
import IndexRouter from './routes/indexRouter.js'
import axios from 'axios'
import echarts from "echarts/dist/echarts.js"
import "./resource/css/myColor.css"
import moment from 'moment'


//所有axios的默认请求地址
axios.defaults.baseURL = "http://localhost:8080/maven_custom_web_war_exploded/"
//设置全局，每次ajax请求携带cookies
//axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment;//赋值使用

//解决重复点击 路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
Vue.use(ElementUi)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    perms: [],
  },
  getters: {
    //可以进行 传参数
    getMenuPerms: (state) => (perms) => {
      return state.perms.find((item) => item === perms) !== undefined;
    }
  },
  mutations: {
    setMenuPerms(state, loginName) {
      //连接数据库 进行 查询
      axios({
        url: "menu/queryPower",
        method: 'get',
        params: {loginName: loginName},
      }).then((option) => {
        state.perms = option.data;
      })
    }
  },
})

let vm = new Vue({
  el: '#app',
  router: new VueRouter({
    routes: BackstageRouter.concat(IndexRouter)
  }),
  store: store,
})

// //默认
// vm.$router.replace({
//   path:'/backstage',
// })


// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading(targetdq) {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    background: 'rgba(255,255,255,.4)',
    target: document.querySelector(targetdq) // 设置加载动画区域
  })
}

function endLoading() {
  loading.close()
}

export function showFullScreenLoading(targetdq) {
  if (needLoadingRequestCount === 0) {
    startLoading(targetdq)
  }
  needLoadingRequestCount++
}

export function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

//可 导出
export default {
  showFullScreenLoading,
  hideFullScreenLoading
}
//进行 匹配 拦截器  加效果
axios.interceptors.request.use((request) => {
  showFullScreenLoading(".loadingtext");// loadingtext class right.vue
  return request;
}, function (error) {
  return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
  hideFullScreenLoading();
  return response;
}, function (error) {
  hideFullScreenLoading();
  return Promise.reject(error);
})


