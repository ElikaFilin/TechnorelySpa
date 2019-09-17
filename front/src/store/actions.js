import sender from "../sender";
import config from './config';
import querystring from 'querystring';

export default {
	setLoginData({commit}, userData) {
		if (userData) {
			commit('logIn');
			commit('setUser', userData.user);
			commit('setToken', userData.accessToken);
			commit('setRole', userData.user.role);
			console.log(userData.user.role);
		}
		localStorage.setItem('userToken', JSON.stringify(userData));
	},
	async changeProfileData({commit}, data) {
		const request = await sender(`${config.host}/api/profile`, data, "PUT");
		let userToken = JSON.parse(localStorage.getItem('userToken'));
		userToken.user = request;
		localStorage.setItem('userToken', JSON.stringify(userToken));
		commit('setUser', userToken.user);
		return userToken.user;
	},
	async getProfileData({commit, state}) {
		if (!state.user) {
			const request = await sender(`${config.host}/api/profile`);
			commit('setUser', request);
			return state.user;
		} else {
			return state.user;
		}
	},
	logIn({dispatch}, data) {
		return new Promise(((resolve, reject) => {
			sender(`${config.host}/login`, data, "POST")
				.then(loginData => {
					if (loginData.auth) {
						dispatch('setLoginData', loginData);
						resolve(true);
					} else {
						reject(response.message);
					}
				});
		}));
	},
	logOff({commit}) {
		commit('logOff');
		commit('setUser', null);
		commit('setToken');
		commit('setRole');
		commit('clearCache');
		localStorage.removeItem('userToken');
	},
	signUp({commit, dispatch}, data) {
		return new Promise(((resolve, reject) => {
			sender(`${config.host}/signup`, data, "POST")
				.then((userData) => {
					if (userData.auth && userData.registered) {
						dispatch('setLoginData', userData);
						resolve(true);
					} else {
						reject(userData.message);
					}
				})
		}));
	},
	viewCompany({commit}, data) {
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/company/${data.id}`)
				.then(company => company.view
					?
					resolve(company.data)
					:
					reject(company.message)
				);
		});
	},
	viewUser({commit}, data) {
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/user/${data.id}`)
				.then(user => user.view
					?
					resolve(user.data)
					:
					reject(user.message)
				);
		});
	},
	editCompany({commit}, data) {
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/company/${data.id}`, data, "PUT")
				.then(company => company.save
					?
					resolve(true)
					:
					reject(company.message)
				);
		});
	},
	addCompany({commit}, data) {
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/company`, data, "POST")
				.then(company => company.save
					?
					resolve(true)
					:
					reject(company.message)
				);
		});
	},
	listCompanies({commit, state}, data) {
		if (data && data.sort) {
			commit("setCompaniesList", []);
			data = {...data.sort, ...data};
			data.sort = 1;
		}
		const q = data ? "?" + querystring.stringify(data) : '';
		if (state.companies.length == 0) {
			return new Promise((resolve, reject) => {
				sender(`${config.host}/api/companies`.concat(q))
					.then(company => company.list
						?
						commit("setCompaniesList", company.data) & resolve(company.data)
						:
						reject(company.message)
					);
			});
		} else {
			return Promise.resolve(state.companies)
		}
	},
	deleteCompany({commit}, CompanyId) {
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/company/`.concat(CompanyId), null, "DELETE")
				.then(company => company.delete
					?
					resolve(company.data)
					:
					reject(company.message)
				);
		})
	},
	viewUsers({commit, state}) {
		console.log(state.users.length);
		if (state.users.length == 0) {
			return new Promise((resolve, reject) => {
				sender(`${config.host}/api/users`)
					.then(users => {
						if (users.usersList) {
							console.log(users.data);
							commit('setUsers', users.data);
							resolve(users.data);
						} else {
							reject(users.message)
						}
					})
			});
		} else {
			return Promise.resolve(state.users)
		}
	},
	deleteUser({commit}, data) {
		return new Promise(((resolve, reject) => {
			sender(`${config.host}/api/user/${data.id}`, null, 'DELETE')
				.then(user => user.delete
					?
					resolve(user.data)
					:
					reject(user.message)
				);
		}));
	},
	editUser({commit}, data) {
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/user/${data.id}`, data, "PUT")
				.then(user => user.save
					?
					resolve(true)
					:
					reject(user.message)
				);
		})
	},
	getList({column, direction}) {
		console.log(column, direction)
		return new Promise((resolve, reject) => {
			sender(`${config.host}/api/companies`, {column, direction})
				.then(companies => companies.list
					?
					resolve(companies.data)
					:
					reject(companies.message)
				);

		})
	}
}