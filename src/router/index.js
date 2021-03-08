import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ 
		path: '/user', 
		name: 'user',
		component: ()=> import('../views/user/user.vue'),
		redirect: '/user/loginIn',
		children:[
			{ path: 'loginIn', name: 'loginIn', component: () => import(/* webpackChunkName: "loginIn" */ '../views/user/loginIn.vue') },
			{ path: 'register', name: 'register', component: () => import(/* webpackChunkName: "register" */ '../views/user/register.vue') },
			{ path: 'forgetPassword', name: 'forgetPassword',  meta: {requireAuth: true}, component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/user/forgetPassword.vue') },
		]
	},
	{ 
		path: '/common', 
		name: 'common',
		component: ()=> import('../views/home/commonNav.vue'),
		redirect: '/common/main',
		children:[
			{ path: 'main', component: ()=> import('../views/home/main.vue') },
			{ 
				path: 'team', 
				component: ()=> import('../views/team/myTeams.vue'),
				children:[
					{ 
						path: 'project/:id', 
						name: '/common/team/project',
						component: ()=> import('../views/project/project.vue'),
						redirect: 'project/:id/resources', 
						children:[
							{ path: 'resources', name:'/common/team/project/resources', component: ()=> import('../views/project/projectResources.vue') },
							{ path: 'tasks', name:'/common/team/project/tasks', component: ()=> import('../views/project/projectTasks.vue') },
						]
					},
				]
			},
			{ 
				path: 'individual', 
				component: ()=> import('../views/individual/individual.vue'),
				redirect: '/common/individual/toDoList',
				children:[
					{ path: 'toDoList', name:'/common/individual/toDoList', component: ()=> import('../views/individual/toDoList.vue') },
					{ path: 'shorthand', name:'/common/individual/shorthand', component: ()=> import('../views/individual/shorthand.vue') },
				]
			},
			{ path: 'profile/siteSetting', component: ()=> import('../views/profile/siteSetting.vue') },
		]
	},
	{ path: '/personalInfo', component: ()=> import('../views/profile/personalInfo.vue') },
	{ path: '/common/team/createTeam', component: ()=> import('../views/team/createTeam.vue') },
	{ path: '/common/team/createProject/:id', component: ()=> import('../views/team/createProject.vue') },
	{ path: '/common/team/addTeammates/:id', component: ()=> import('../views/team/addTeammates.vue') },
	{ path: '/common/team/editTeam/:id', component: ()=> import('../views/team/editTeam.vue') },
	{ path: '/common/individual/editShorthand/:id', component: ()=> import('../views/individual/editShorthand.vue') },
	{ path: '*', name: 'error', component: () => import('../components/error.vue') }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
