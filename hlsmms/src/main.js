import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//引入公共样式
import './assets/styles/public.css'
//引入axios
import axios from 'axios'
//把axios 挂在vue原型上
Vue.prototype.axios=axios;
//引入qs处理axios的post参数
import qs from 'qs'
//挂载原型方便后期的vue实例使用
Vue.prototype.qs=qs;

//配置后端服务器的主机
let serverApiHost="http://192.168.0.102:9090";
Vue.prototype.apiHost=serverApiHost;


//构造全局守卫
router.beforeEach((to,from,next)=>{
  //alert('全局守卫')
  //************************ 让ajax携带cookie证书********************************
  axios.defaults.withCredentials=true;
  //发送ajax到后端路由获取cookie如果存在就放行 没有就去登录页面
  axios.get("http://127.0.0.1:9090/users/getCookie").then(result=>{
    console.log("验证的结果",result);
    //如果登录成功或者是登录页面就放行
    if(result.data.isOk || to.path=="/login"){
      next();//登录成功 放行
    }
    //否者就跳转到登录页面
     else{
      next("/login");
    }  
  }).catch(err=>{
    console.log("错误了"+err.message);
  })
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
