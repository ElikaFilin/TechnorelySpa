<template>
    <div>
        <b-alert v-if="errors.length" show variant="danger" class="mt-4">
            <div v-for="error in errors" class="text-center m-1">{{error}}</div>
        </b-alert>
        <b-row class="mt-4">
            <b-col class="text-left">
                <router-link :to="{name: 'listOfCompanies'}" class="btn btn-secondary m-2">
                    Back
                </router-link>
            </b-col>
            <b-col class="text-right">
                <b-button v-on:click="edit" variant="info">Save</b-button>
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
                <b-td><input v-model="dataCompany.name" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="dataCompany.address" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="dataCompany.employee_no" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="dataCompany.desc" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="dataCompany.type" :class="$style.border" class="form-control"></b-td>
                <b-td>
                    <b-form-select
                            id="service"
                            v-model="dataCompany.service_activity"
                            :options="services"
                            required
                            :class="$style.border"
                    ></b-form-select>
                </b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>

<script>
	import {mapActions} from 'vuex';

	export default {
		name: "editCompany",
		data() {
			return {
				companyId: null,
				errors: [],
				dataCompany: {
					name: '',
					address: '',
					employee_no: '',
					desc: '',
					type: '',
					service_activity: '',

				},
				services: [{text: 'Select One', value: null}, 'HAIR REMOVAL ', 'BODY', 'WAX', 'FACIALS'],
			}
		},
		methods: {
			...mapActions(['viewCompany', 'editCompany']),
			edit() {
				if (this.errors.length > 0) {
					this.errors.length = 0
				}
				if (!this.dataCompany.name) {
					this.errors.push('Enter correct name')
				}
				if (!this.dataCompany.address) {
					this.errors.push('Enter address')
				}
				if (!this.dataCompany.employee_no) {
					this.errors.push('Fill out correct number of employees')
				}
				if (!this.dataCompany.desc) {
					this.errors.push('Enter correct description')
				}
				if (!this.dataCompany.type) {
					this.errors.push('Incorrect type')
				}
				if (!this.dataCompany.service_activity) {
					this.errors.push('Enter correct service of activity')
				}
				if (this.errors.length === 0) {
					this.editCompany({id: this.companyId, data: this.dataCompany}).then(res => {
						if (res) {
							this.$router.push({name: 'listOfCompanies'});
						}
					})
						.catch(error => {
							console.error(error);
							this.errors.push('Error getting data. Please try again later');

						})
				}
			}
		},
		mounted() {
			console.log(this.$route);
			this.companyId = this.$route.params.id;
			if (this.$route.params.data) {
				this.dataCompany = this.$route.params.data;
			} else {
				this.viewCompany({id: this.companyId}).then(company => {
					this.dataCompany = {...company}
				})
					.catch(error => {
						console.error(error);
						this.errors.push('Error mount data. Please try again later');
					})
			}
		}
	}
</script>

<style module>
    .border:hover {
        border-color: #28a745;
        -webkit-box-shadow: 0px 0px 10px 1px rgba(40, 167, 69, 0.9);
        -moz-box-shadow: 0px 0px 10px 1px rgba(40, 167, 69, 0.9);
        box-shadow: 0px 0px 10px 1px rgba(40, 167, 69, 0.9);
    }
</style>