import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      	token: localStorage.getItem("token"),
      	userInfo: JSON.parse(sessionStorage.getItem("userInfo"))||{},
		teamInfo:{
			teamChosenId: sessionStorage.getItem("teamChosenId")||0,
			teamName: "",
			leaderId: 0,
			institute:"",
			brief:"",
			authority: JSON.parse(sessionStorage.getItem("authority"))||{},
			teammates:[]
		},
		projectInfo:{},
		shortHandChosen:{},
		taskInfo:{},
		chatInfo:{
			isTeam: false,
			chatId: 0
		}
    },
    mutations: {
		SET_TOKEN: (state, token)=>{
			state.token = token;
			localStorage.setItem("token", token);
		},
		SET_USERINFO: (state, userInfo)=>{
			state.userInfo = userInfo;
			sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
		},
		SET_TEAMCHOSENID: (state, id)=>{
			state.teamInfo.teamChosenId = id;
			sessionStorage.setItem("teamChosenId", id);
		},
		SET_TEAMNAME: (state, name)=>{
			state.teamInfo.teamName = name;
		},
		SET_LEADERID: (state, id)=>{
			state.teamInfo.leaderId = id;
		},
		SET_TEAMBRIEF: (state, brief)=>{
			state.teamInfo.brief = brief;
		},
		SET_TEAMINSTITUTE: (state, institute)=>{
			state.teamInfo.institute = institute;
		},
		SET_AUTHORITY: (state, auth)=>{
			if(auth != ""){
				state.teamInfo.authority['KPI'] = (auth[0]=='1'?true:false); //成员贡献
				state.teamInfo.authority['AUTH'] = (auth[1]=='1'?true:false); //成员权限
				state.teamInfo.authority['TASK'] = (auth[2]=='1'?true:false); //任务权限
				state.teamInfo.authority['PROJECT'] = (auth[3]=='1'?true:false); //项目权限
				state.teamInfo.authority['BOARD'] = (auth[4]=='1'?true:false); //发布公告
				state.teamInfo.authority['TEAM'] = (auth[5]=='1'?true:false); //团队权限
				state.teamInfo.authority['RESOURCE'] = (auth[6]=='1'?true:false); //发布资源、消息
				sessionStorage.setItem("authority", JSON.stringify(state.teamInfo.authority));
			}
		},
		SET_TEAMMATES: (state, mates)=>{
			state.teamInfo.teammates = mates;
		},
		SET_PROJECT(state, project){
			state.projectInfo = project;
		},
		SET_SHORTHAND(state, shorthand){
			state.shortHandChosen = shorthand;
		},
		SET_TASK(state, task){
			state.taskInfo = task;
		},
		SET_CHAT_INFO:(state, chat)=>{
			state.chatInfo.isTeam = chat.isTeam;
			state.chatInfo.chatId = chat.chatId;
		},
		REMOVE_INFO: (state)=>{
			localStorage.removeItem("token");
			sessionStorage.removeItem("userInfo");
			sessionStorage.removeItem("authority");
			sessionStorage.removeItem("teamChosenId");
			state.token = null;
			state.userInfo = {};
			state.teamInfo.teamChosenId = -1;
			state.teamInfo.authority = {};
			state.teamInfo.teammates = [];
			state.projectInfo={};
			state.shortHandChosen={};
			state.taskInfo={};
			state.chatInfo.isTeam = false;
			state.chatInfo.chatId = 0;
		},
	},
	getters:{
	},
    actions: {
    },
    modules: {
    }
  })
