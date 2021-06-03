import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ 
		path: '/user', 
		name: 'user',
		component: ()=> import('../views/user/index.vue'),
		redirect: '/user/login',
		children:[
			{ path: 'login', name: 'loginIn', component: () => import(/* webpackChunkName: "user" */ '../views/user/login.vue') },
			{ path: 'register', name: 'register', component: () => import(/* webpackChunkName: "user" */ '../views/user/register.vue') },
			{ path: 'forgetPassword', name: 'forgetPassword', component: () => import(/* webpackChunkName: "user" */ '../views/user/forgetPassword.vue') },
		]
	},
	{ 
		path: '/common', 
		name: 'common',
		component: ()=> import('../views/home/commonNav.vue'),
		redirect: '/common/main',
		children:[
			{ path: 'main', meta: {requireAuth: true}, component: ()=> import('../views/home/main.vue') },
			{ 
				path: 'team', 
				component: ()=> import(/* webpackChunkName: "team" */ '../views/team/myTeams.vue'),
				children:[
					{ 
						path: 'project/:id', 
						name: 'project',
						component: ()=> import('../views/project/project.vue'),
						redirect: 'project/:id/resources', 
						children:[
							{ path: 'resources', meta: {requireAuth: true}, name:'resources', component: ()=> import(/* webpackChunkName: "project" */ '../views/project/projectResources.vue') },
							{ path: 'tasks', meta: {requireAuth: true}, name:'tasks', component: ()=> import(/* webpackChunkName: "project" */ '../views/project/projectTasks.vue') },
							// { path: 'dynamic', meta: {requireAuth: true}, name:'dynamic', component: ()=> import(/* webpackChunkName: "project" */ '../views/project/matesDynamic.vue') },
							{ path: 'setting', meta: {requireAuth: true}, name:'setting', component: ()=> import(/* webpackChunkName: "project" */ '../views/project/projectSetting.vue') },
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
					{ path: 'toDoList', meta: {requireAuth: true}, name:'toDoList', component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/toDoList.vue') },
					{ path: 'shorthand', meta: {requireAuth: true}, name:'shorthand', component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/shorthand.vue') },
					{ path: 'taskStats', meta: {requireAuth: true}, name:'taskStats', component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/taskStats.vue') },
					{ path: 'contributions', meta: {requireAuth: true}, name:'contribution', component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/contributions.vue') },
				]
			},
			{
				path: 'message', meta: {requireAuth: true}, name: 'message', component: ()=>import(/* webpackChunkName: "message" */ '../views/message/message.vue')
			},
		]
	},
	{ path: '/personalInfo', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "user" */ '../views/profile/personalInfo.vue') },
	{ path: '/notification', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "user" */ '../views/profile/notification.vue') },
	{ path: '/common/team/createTeam', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "team" */ '../views/team/createTeam.vue') },
	{ path: '/common/team/joinTeam', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "team" */ '../views/team/joinTeam.vue') },
	{ path: '/common/team/createProject', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "team" */ '../views/team/createProject.vue') },
	{ path: '/common/team/addTeammates', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "team" */ '../views/team/addTeammates.vue') },
	{ path: '/common/team/editTeam', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "team" */ '../views/team/editTeam.vue') },
	{ path: '/common/team/editTeammates', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "team" */ '../views/team/editTeammates.vue') },
	{ path: '/common/project/uploadResource/:id', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "project" */ '../views/project/uploadResource.vue') },
	{ path: '/common/project/checkTasks/:id', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "project" */ '../views/project/checkTasks.vue') },
	{ path: '/common/project/assignTask/:id', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "project" */ '../views/project/assignTask.vue') },
	{ path: '/common/project/finishTask/:id', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "project" */ '../views/project/finishTask.vue') },
	{ path: '/common/project/resourceDetail/:id', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "project" */ '../views/project/resourceDetail.vue') },
	{ path: '/common/individual/editShorthand/:id', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/editShorthand.vue') },
	{ path: '/common/individual/checkEvents', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/checkEvents.vue') },
	{ path: '/common/individual/addEvent', meta: {requireAuth: true}, component: ()=> import(/* webpackChunkName: "individual" */ '../views/individual/addEvent.vue') },
	{ path: '*', name: 'error', component: () => import('../components/error.vue') }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
