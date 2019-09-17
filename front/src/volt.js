import Vuex from 'vuex';
import Vue from 'vue';
import actions from "./store/actions";
import persistcache from "./store/persist";

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		loggedIn: false,
		role: 'user',
		user: null,
		token: null,
		companies: [],
		users: []
	},
	getters: {
		getLoggedIn: state => {
			return state.loggedIn;
		},
		user: state => {
			return state.user
		},
		getToken: state => state.token
	},
	mutations: {
		setRole(state, role) {
			console.log(role);
			state.role = role;
		},
		toggle(state, status) {
			state.loggedIn = status;
		},
		setUser(state, user) {
			state.user = user;
		},
		logIn(state) {
			state.loggedIn = true;
		},
		logOff(state) {
			state.loggedIn = false;
		},
		setToken(state, token) {
			state.token = token;
		},
		initStore(state) {
			const localstrorage = JSON.parse(localStorage.getItem('userToken'));
			state.user = localstrorage ? localstrorage.user : null;
			state.loggedIn = localstrorage ? localstrorage.auth : false;
			state.token = localstrorage ? localstrorage.accessToken : null;
			state.role = localstrorage ? localstrorage.user.role : 'user';
			console.log(state);
		},
		setUsers(state, data) {
			state.users = data;
		},
		setCompaniesList(state, data) {
			state.companies = data;
		},
		clearCache(state) {
			state.users = [];
			state.companies = [];
		}
	},
	actions,
	plugins: [persistcache]
});

export default store