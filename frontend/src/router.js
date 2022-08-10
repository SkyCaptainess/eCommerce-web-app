import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from './store/store'
import Home from './views/Home.vue'
import Signin from "./components/Signin.vue";
import Signup from "./components/Signup.vue";
import User from "./components/User.vue";
import Checkout from "./components/Checkout.vue";
import axios from 'axios';
const routes= [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')
  },
  {
    path: '/item',
    name: 'Item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Item.vue')
  },
  {
    path:'/signin', 
    name: 'Signin',
    component: Signin,
    
    
  },
  {
    path:'/signup',
    name: 'Signup', 
    component: Signup
  },
  {
    path:'/user/profile',
    name: 'User',
    component: User,
    meta:{requireAuth:true,}
  },
  {
    path:'/user/checkout', 
    name:"Checkout",
    component: Checkout,
    meta:{requireAuth:true,}
  },

    

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  localStorage.path=to.path
  // console.log(store)
  store.commit("user/SET_PATH",to.path)
  axios.defaults.withCredentials = true;
  axios.get("http://localhost:3000/api/phone/itemstate").then(res=>{
    
      if (res.data.errno==0){
        store.commit("user/SET_LOG",true)
      }else{
        store.commit("user/SET_LOG",false)
        
      }
    })
  if (to.name !== 'Signin' && to.meta.requireAuth && store.state.user.islog==false) {
    next({ name: 'Signin' })
  }else{
    next()
  }

  // console.log(store.state.user.path)
 
})
export default router
