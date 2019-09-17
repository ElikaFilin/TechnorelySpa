<template>
    <div>
        <b-alert v-if="errors.length" show variant="danger" class="mt-4">
            <div v-for="error in errors" class="text-center m-1">{{error}}</div>
        </b-alert>

        <b-row class="mt-4">
            <b-col class="text-left">
                <router-link :to="{name: 'usersList'}" class="btn btn-secondary m-2">
                    Back
                </router-link>
            </b-col>
            <b-col class="text-right">
                <b-button v-on:click="edit" variant="info">
                    Save
                </b-button>
            </b-col>
        </b-row>

        <b-table-simple striped>
            <b-tr>
                <b-th>Email</b-th>
                <b-th>Phone</b-th>
                <b-th>First name</b-th>
                <b-th>Last name</b-th>
                <b-th>Nickname</b-th>
                <b-th>Description</b-th>
                <b-th>Position</b-th>
            </b-tr>
            <b-tr>
                <b-td><input v-model="userData.email" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="userData.phone" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="userData.first_name" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="userData.last_name" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="userData.nickname" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="userData.desc" :class="$style.border" class="form-control"></b-td>
                <b-td><input v-model="userData.position" :class="$style.border" class="form-control"></b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>

<script>
	import {mapActions, mapState} from 'vuex'

	export default {
		name: "editUser",
		computed: mapState(['users']),
		data() {
			return {
				userId: null,
				errors: [],
				userData: {
					email: '',
					phone: '',
					first_name: '',
					last_name: '',
					nickname: '',
					desc: '',
					position: '',
				}
			}
		},
		methods: {
			...mapActions(['viewUser', 'editUser']),
			validEmail: function (email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			},
			edit() {
				if (this.errors.length > 0) {
					this.errors.length = 0
				}
				if (!this.userData.email) {
					this.errors.push('Enter correct email')
				} else if (!this.validEmail(this.userData.email)) {
					this.errors.push('Nonexistent email')
				}
				if (!this.userData.phone) {
					this.errors.push('Enter phone')
				} else if (this.userData.phone.length < 12) {
					this.errors.push('Enter correct phone. Example: +380998887766')
				}
				if (!this.userData.first_name) {
					this.errors.push('Fill out correct first name')
				}
				if (!this.userData.last_name) {
					this.errors.push('Enter correct last name')
				}
				if (!this.userData.nickname) {
					this.errors.push('Incorrect nickname')
				}
				if (!this.userData.desc) {
					this.errors.push('Enter correct description')
				}
				if (!this.userData.position) {
					this.errors.push('Enter position')
				}
				if (this.errors.length === 0) {
					this.editUser(this.userData).then(res => {
						if (res === true) {
							this.$router.push({name: 'usersList'})
						} else {
							let id = this.userId;
							this.errors.push(`User ${id} wasn't found. Please try again later`);
						}
					})
						.catch(error => {
							console.error(error);
							this.errors.push(`User ${id} wasn't found. Please try again later`);
						})
				}

			}
		},
		mounted() {
			this.userId = this.$route.params.id;
			if (this.$route.params.data) {
				this.userData = {...this.$route.params.data};
			} else {
				this.viewUser({id: this.userId}).then(user => {
					this.userData = {...user};

				})
					.catch(error => {
						console.error(error);
						this.errors.push('Error mount data. Please try again later');
					})
			}
		},
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