import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ 
		path: '/login', 
		name: 'login',
		component: ()=> import('../views/login/index.vue'),
		redirect: '/login/loginIn',
		children:[
			{ path: 'loginIn', name: 'loginIn', component: () => import(/* webpackChunkName: "loginIn" */ '../views/login/loginIn.vue') },
			{ path: 'register', name: 'register', component: () => import(/* webpackChunkName: "register" */ '../views/login/register.vue') },
			{ path: 'forgetPassword', name: 'forgetPassword',  meta: {requireAuth: true}, component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/login/forgetPassword.vue') },
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
						name: 'project',
						component: ()=> import('../views/project/project.vue'),
						redirect: 'project/:id/resources', 
						children:[
							{ path: 'resources', name:'resources', component: ()=> import('../views/project/projectResources.vue') },
							{ path: 'tasks', name:'tasks', component: ()=> import('../views/project/projectTasks.vue') },
							{ path: 'dynamic', name:'dynamic', component: ()=> import('../views/project/matesDynamic.vue') },
							{ path: 'setting', name:'setting', component: ()=> import('../views/project/projectSetting.vue') },
						]
					},
				]
			},
			{ 
				path: 'individual', 
				name: 'individual', 
				component: ()=> import('../views/individual/individual.vue'),
				redirect: '/common/individual/toDoList',
				children:[
					{ path: 'toDoList', name:'toDoList', component: ()=> import('../views/individual/toDoList.vue') },
					{ path: 'shorthand', name:'shorthand', component: ()=> import('../views/individual/shorthand.vue') },
					{ path: 'taskStats', name:'taskStats', component: ()=> import('../views/individual/taskStats.vue') },
					{ path: 'contributions', name:'contribution', component: ()=> import('../views/individual/contributions.vue') },
				]
			},
			{
				path: 'message',
				name: 'message',
				component: ()=>import('../views/message/message.vue')
			},
			{ path: 'profile/siteSetting',name:'siteSetting', component: ()=> import('../views/profile/siteSetting.vue') },
		]
	},
	{ path: '/personalInfo', component: ()=> import('../views/profile/personalInfo.vue') },
	{ path: '/common/team/createTeam', component: ()=> import('../views/team/createTeam.vue') },
	{ path: '/common/team/joinTeam', component: ()=> import('../views/team/joinTeam.vue') },
	{ path: '/common/team/createProject/:id', component: ()=> import('../views/team/createProject.vue') },
	{ path: '/common/team/addTeammates/:id', component: ()=> import('../views/team/addTeammates.vue') },
	{ path: '/common/team/editTeam/:id', component: ()=> import('../views/team/editTeam.vue') },
	{ path: '/common/project/uploadResource/:id', component: ()=> import('../views/project/uploadResource.vue') },
	{ path: '/common/project/assignTask/:id', component: ()=> import('../views/project/assignTask.vue') },
	{ path: '/common/individual/editShorthand/:id', component: ()=> import('../views/individual/editShorthand.vue') },
	{ path: '*', name: 'error', component: () => import('../components/error.vue') }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
