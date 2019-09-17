import Vue from 'vue';
import VueRouter from 'vue-router';
import Authorization from '../components/authorization';
import Profile from '../components/profile';
import addCompany from "../components/addCompany";
import listOfCompanies from "../components/listOfCompanies";
import usersList from "../components/usersList"
import {getToken} from './getToken'
import editCompany from "../components/editCompany";
import editUser from "../components/editUser"
import viewCompany from "../components/viewCompany"
import viewUser from "../components/viewUser";

const routes = [
	{
		path: '/profile',
		component: Profile,
		name: 'profile',
		meta: {
			authorization: true
		}
	},
	{
		path: '/company/add',
		component: addCompany,
		name: 'addCompany',
		meta: {
			authorization: true
		}
	},
	{
		path: '/',
		component: Authorization,
		name: 'authorization',
		meta:
			{authorization: false}
	},
	{
		path: '/profile/companies/(list)?',
		component: listOfCompanies,
		name: 'listOfCompanies',
	},
	{
		path: '/users/(list)?',
		component: usersList,
		name: 'usersList',
	},
	{
		path: '/profile/companies/edit/:id',
		component: editCompany,
		name: 'editCompany',
	},
	{
		path: '/users/edit/:id',
		component: editUser,
		name: 'editUser',
	},
	{
		path: '/users/view/:id',
		component: viewUser,
		name: 'viewUser',
	},
	{
		path: '/profile/company/view/:id',
		component: viewCompany,
		name: 'viewCompany',
	}
];
Vue.use(VueRouter);

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	if (to.name !== 'authorization' && to.matched.some(record => record.meta.authorization)) {
		if (!getToken()) {
			next({
				path: '/',
				params: {nextUrl: to.fullPath}
			})
		} else {
			next()
		}
	} else if (to.name === 'authorization' && getToken()) {
		next({name: 'profile'})
	} else {
		next()
	}
});

export default router