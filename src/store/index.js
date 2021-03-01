import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      	token: '',
      	userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
		teamChosenId:0,
		projectInfo:{
			pId:-1,
			resources:[]
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
			state.teamChosenId = id;
		},
		REMOVE_INFO: (state)=>{
			localStorage.removeItem("token");
			sessionStorage.removeItem("userInfo");
			state.userInfo = {};
		},
		SET_PID:(state, pId)=>{
			state.projectInfo.pId = pId;
		},
		SET_RESOURCES:(state, res)=>{
			state.projectInfo.resources = res;
		}
	},
	getters:{
		getResources: (state)=>{
			return state.projectInfo.resources;
		}
	},
    actions: {
    },
    modules: {
    }
  })
