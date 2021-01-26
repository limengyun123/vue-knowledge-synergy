import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/user/loginIn', name: 'loginIn', component: () => import(/* webpackChunkName: "loginIn" */ '../views/user/loginIn.vue') },
	{ path: '/user/register', name: 'register', component: () => import(/* webpackChunkName: "register" */ '../views/user/register.vue') },
	{ path: '/user/forgetPassword', name: 'forgetPassword',  meta: {requireAuth: true}, component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/user/forgetPassword.vue') },
	{ path: '*', name: 'error', component: () => import('../components/error.vue') }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
