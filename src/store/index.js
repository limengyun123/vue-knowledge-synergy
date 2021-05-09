import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      	token: localStorage.getItem("token"),
      	userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
		teamInfo:{
			teamChosenId: JSON.parse(sessionStorage.getItem("teamChosenId")),
			teammates:[]
		},
		shortHandChosen:{},
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
			sessionStorage.setItem("teamChosenId", JSON.stringify(id));
		},
		SET_TEAMMATES: (state, mates)=>{
			state.teamInfo.teammates = mates;
		},
		SET_SHORTHAND(state, shorthand){
			state.shortHandChosen = shorthand;
		},
		SET_CHAT_INFO:(state, chat)=>{
			state.chatInfo.isTeam = chat.isTeam;
			state.chatInfo.chatId = chat.chatId;
		},
		REMOVE_INFO: (state)=>{
			localStorage.removeItem("token");
			sessionStorage.removeItem("userInfo");
			sessionStorage.removeItem("teamChosenId");
			state.token = null;
			state.userInfo = {};
			state.teamInfo.teamChosenId = 0;
			state.teamInfo.teammates = [];
			state.shortHandChosen={};
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
