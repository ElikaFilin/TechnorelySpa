import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {LayoutPlugin} from 'bootstrap-vue'
Vue.use(LayoutPlugin)
import {ModalPlugin} from 'bootstrap-vue'
Vue.use(ModalPlugin);
import {CardPlugin} from 'bootstrap-vue'
Vue.use(CardPlugin);
import {VBScrollspyPlugin} from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin);
import {DropdownPlugin, TablePlugin} from 'bootstrap-vue'
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);

import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './volt'

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.mixin({
	data: function () {
		return {
			worker: new SharedWorker('workr.js')
		}
	}
});
export default new Vue({
	el: '#root',
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.runtime.esm.js'
		}
	},
	store,
	router,
	components: {App, ...LayoutPlugin, ...ModalPlugin, ...CardPlugin, ...VBScrollspyPlugin, ...DropdownPlugin, ...TablePlugin},
	render: (h) => h(App),
});
