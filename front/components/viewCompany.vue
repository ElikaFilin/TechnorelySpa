<template>
    <div>
        <b-alert v-if="stateError" v-model="error" variant="danger" class="mt-4">{{this.error}}</b-alert>

        <b-row class="mt-4">
            <b-col class="text-left">
                <router-link :to="{name: 'listOfCompanies'}" class="btn btn-secondary m-2">
                    Back
                </router-link>
            </b-col>
        </b-row>
        <b-table-simple striped>
            <b-tr>
                <b-th>Name</b-th>
                <b-th>Address</b-th>
                <b-th>Number of employees</b-th>
                <b-th>Description</b-th>
                <b-th>Type</b-th>
                <b-th>Service of activity</b-th>
            </b-tr>
            <b-tr>
                <b-td><span>{{dataCompany.name}}</span></b-td>
                <b-td><span>{{dataCompany.address}}</span></b-td>
                <b-td><span>{{dataCompany.employee_no}}</span></b-td>
                <b-td><span>{{dataCompany.desc}}</span></b-td>
                <b-td><span>{{dataCompany.type}}</span></b-td>
                <b-td><span>{{dataCompany.service_activity}}</span></b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>

<script>
	import {mapActions} from 'vuex'

	export default {
		name: "viewCompany",
		data() {
			return {
				companyId: null,
				stateError: false,
				error: '',
				dataCompany: {
					name: '',
					address: '',
					employee_no: '',
					desc: '',
					type: '',
					service_activity: '',
				}
			}
		},
		methods: {
			...mapActions(['viewCompany']),
		},
		mounted() {
			this.companyId = this.$route.params.id;
			if (this.$route.params.data) {
				this.dataCompany = this.$route.params.data;
			}
			else {
				this.viewCompany({id: this.companyId}).then(company => {
					this.dataCompany.name = company.name;
					this.dataCompany.address = company.address;
					this.dataCompany.desc = company.desc;
					this.dataCompany.employee_no = company.employee_no;
					this.dataCompany.type = company.type;
					this.dataCompany.service_activity = company.service_activity
				})
					.catch(error => {
						console.error(error);
						this.error = 'Error mount data. Please try again later';
						this.stateError = true;
					})
			}
		}
	}
</script>

<style module>

</style>