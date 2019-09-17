<template>
    <div>
        <b-form class="col-10 m-auto p-4" @submit="check" @reset="clear">
            <b-alert v-if="errors.length" show variant="danger">
                <div v-for="error in errors" class="text-center m-1">{{error}}</div>
            </b-alert>
            <b-form-group
                    label="Name company:"
                    label-for="name"
            >
                <b-form-input
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Company name"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Address:" label-for="address">
                <b-form-input
                        id="address"
                        v-model="form.address"
                        required
                        placeholder="Enter address"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Number of employees:" label-for="employees">
                <b-form-input
                        type="number"
                        id="employees"
                        v-model="form.employees"
                        required
                        placeholder="Enter number"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Description:" label-for="description">
                <b-form-input
                        id="description"
                        v-model="form.description"
                        required
                        placeholder="Enter description"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Type:" label-for="type">
                <b-form-input
                        id="type"
                        v-model="form.type"
                        required
                        placeholder="Enter type"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Service of activity:" label-for="service">
                <b-form-select
                        id="service"
                        v-model="form.service"
                        :options="services"
                        required
                ></b-form-select>
            </b-form-group>
            <div class="btn btn-success" v-on:click="check">Add company</div>
            <b-button type="reset" variant="primary" class="m-3">Clear</b-button>
        </b-form>
    </div>
</template>

<script>
	import sender from '../src/sender'

	export default {
		data() {
			return {
				errors: [],
				form: {
					name: '',
					address: '',
					service: null,
					employees: '',
					description: '',
					type: ''
				},
				services: [{text: 'Select One', value: null}, 'HAIR REMOVAL ', 'BODY', 'WAX', 'FACIALS'],
			}
		},
		methods: {
			clear() {
				this.form.name = '';
				this.form.address = '';
				this.form.employees = '';
				this.form.description = '';
				this.form.type = '';
				this.form.service = null;
			},
			check() {
				console.log('check');
				if (this.errors) {
					this.errors.length = 0
				}
				if (!this.form.name) {
					this.errors.push('Enter name')
				}
				if (!this.form.address) {
					this.errors.push('Enter address')
				}
				if (!this.form.employees) {
					this.errors.push('Enter number of employees')
				}
				if (!this.form.description) {
					this.errors.push('Fill out description')
				}
				if (!this.form.type) {
					this.errors.push('Enter correct type')
				}
				if (!this.form.service) {
					this.errors.push('Incorrect service of activity')
				}
				if (this.errors.length === 0) {

					sender(`http://localhost:3000/api/company`, {form: this.form}, "POST")
						.then(response => {
							const company = response;
							if (company.save) {
								this.$router.replace({name: 'profile'})
							}
						})
				}

			}
		}
	}

</script>

<style scoped>

</style>

