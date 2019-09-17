<template>
    <div>
        <b-alert v-if="stateError" v-model="error" variant="danger" class="mt-4">{{this.error}}</b-alert>
        <b-table-simple striped class="m-4">
            <b-tr>
                <b-th>
                    <span :class="$style.border">
                    <img :class="$style.border_shadow" v-on:click="sortBy('name',1)" src="../up-arrow.png">
                    <img :class="$style.border_shadow" v-on:click="sortBy('name',0)" src="../down-arrow.png">
                    </span>
                    Name
                </b-th>
                <b-th>Address</b-th>
                <b-th>
                    <img :class="$style.border_shadow" v-on:click="sortBy('employee_no',1)" src="../up-arrow.png">
                    <img :class="$style.border_shadow" v-on:click="sortBy('employee_no',0)" src="../down-arrow.png">
                    Number of employees
                </b-th>
                <b-th>Description</b-th>
                <b-th>Type</b-th>
                <b-th>
                    <img :class="$style.border_shadow" v-on:click="sortBy('service_activity',1)" src="../up-arrow.png">
                    <img :class="$style.border_shadow" v-on:click="sortBy('service_activity',0)" src="../down-arrow.png">
                    Service of activity
                </b-th>
                <b-th v-if="role==='admin'">Users of Company</b-th>
                <b-th></b-th>
                <b-th></b-th>
                <b-th></b-th>
            </b-tr>
            <b-tr v-bind:key="index" v-for="(companies, index) in listOfCompanies">
                <b-td>{{companies.name}}</b-td>
                <b-td>{{companies.address}}</b-td>
                <b-td>{{companies.employee_no}}</b-td>
                <b-td>{{companies.desc.length>19?companies.desc.substr(0,20).concat('...'):companies.desc}}</b-td>
                <b-td>{{companies.type}}</b-td>
                <b-td>{{companies.service_activity}}</b-td>
                <b-td v-if="role==='admin'">
                    <router-link :to="{name: 'viewUser', params:{id:companies.user_id}}"> {{companies.user}}</router-link>
                </b-td>
                <b-td>
                    <b-button variant="danger" v-on:click="deleteComp(`${companies.id}`,index)">
                        Delete
                    </b-button>
                </b-td>
                <b-td>
                    <router-link :to="{name: 'editCompany', params: {id:companies.id, data:companies}}" class="btn btn-info">
                        Edit
                    </router-link>
                </b-td>
                <b-td>
                    <router-link :to="{name: 'viewCompany', params: {id:companies.id, data:companies}}" class="btn btn-info">
                        View
                    </router-link>
                </b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>


<script>
	import {mapActions, mapState} from 'vuex';

	export default {
		name: "listOfCompanies",
		computed: mapState(['role']),
		data() {
			return {
				stateError: false,
				error: '',
				listOfCompanies: {},
			}
		},
		methods: {
			...mapActions(['listCompanies', 'deleteCompany', 'viewUsers']),
			deleteComp(idComp, index) {
				if (confirm("Do you really want to delete company?")) {
					this.deleteCompany(idComp).then((data) => {
						if (data) {
							this.listOfCompanies.splice(index, 1);
						}
					}).catch(alert)
				}
			},
			sortBy(column, direction) {
				let data;
				const columns = ["employee_no", "name", "service_activity"];
				if (columns.includes(column) && (direction == 1 || direction == 0)) {
					data = {sort: {column, direction}}
				}
				console.log(data);
				this.getList(data);
			},
			getList(data) {
				console.log(data);
				const params = this.role === 'admin' ? {...data, all: 1} : {...data};
				this.listCompanies(params)
					.then(rsp => {
						return Promise.all([this.viewUsers(), rsp])
					})
					.then((response) => {
						console.log(response);
						this.listOfCompanies = response[1].map(comapny => {
							const company = {...comapny};
							company.user = this.getUser(response[0].find(value => value.id == comapny.user_id));
							return company;
						});
					})
					.catch(error => {
						console.error(error);
						this.error = 'Error mount data. Please try again later';
						this.stateError = true;
					})
			},
			getUser(user) {
				const link = user.first_name + ", " + user.email;
				return link;
			}
		},
		mounted() {
			this.getList()
		},
	}
</script>

<style module>
    .border_shadow:hover {
        -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
    }
    .border {
        padding: .3rem;
    }
    img.border_shadow {
        width: 9px;
    }
</style>