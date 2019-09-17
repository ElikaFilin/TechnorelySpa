<template>
    <form
            class="col m-auto p-4"
            id="form"
            method="post"
            novalidate="true"
    >
        <b-alert v-if="errors.length" show variant="danger">
            <div v-for="error in errors" class="text-center m-1">{{error}}</div>
        </b-alert>
        <div class="form-group row">
            <label for="email" class="col-form-label col-3">Email address</label>
            <div class="col">
                <input v-model="data_signup.email" type="email" class="form-control" id="email"
                       placeholder="ivan.ivanon@example.com">
            </div>
        </div>
        <div class="form-group row">
            <label for="password" class="col-form-label col-3">Create password</label>
            <div class="col">
                <input v-model="data_signup.password" type="password" class="form-control" id="password"
                       placeholder="Ivan_Ivanov_1209">
            </div>
        </div>
        <div class="form-group row">
            <label for="phone" class="col-form-label col-3">Phone number</label>
            <div class="col">
                <input v-model="data_signup.phone" type="number" class="form-control" id="phone"
                       placeholder="+3800991234455">
            </div>
        </div>
        <div class="form-group row">
            <label for="f_name" class="col-form-label col-3">First name</label>
            <div class="col">
                <input v-model="data_signup.first_name" type="text" class="form-control" id="f_name" placeholder="Ivan">
            </div>
        </div>
        <div class="form-group row">
            <label for="l_name" class="col-form-label col-3">Last name</label>
            <div class="col">
                <input v-model="data_signup.last_name" type="text" class="form-control" id="l_name"
                       placeholder="Ivanov">
            </div>
        </div>
        <div class="form-group row">
            <label for="nick_name" class="col-form-label col-3">Nickname</label>
            <div class="col">
                <input v-model="data_signup.nickname" type="text" class="form-control" id="nick_name"
                       placeholder="Ivanchik">
            </div>
        </div>
        <div class="form-group row">
            <label for="desc" class="col-form-label col-3">Description</label>
            <div class="col">
                <input v-model="data_signup.description" type="text" class="form-control" id="desc"
                       placeholder="I like my spa salon">
            </div>
        </div>
        <div class="form-group row">
            <label for="position" class="col-form-label col-3">Position</label>
            <div class="col">
                <input v-model="data_signup.position" type="text" class="form-control" id="position"
                       placeholder="Director">
            </div>
        </div>
        <div class="btn btn-primary">
            <div v-on:click="send">
                <div v-on:click="check">Sign up</div>
            </div>
        </div>
    </form>
</template>

<script>
	import {mapActions} from 'vuex';

	export default {
		name: "signup",
		data: () => {
			return {
				errors: [],
				data_signup: {
					email: "",
					password: "",
					phone: "",
					first_name: "",
					last_name: "",
					nickname: "",
					description: "",
					position: ""
				},
			}
		},
		methods: {
			...mapActions(['signUp']),
			check() {
				if (this.errors) {
					this.errors.length = 0
				}
				if (!this.data_signup.email) {
					this.errors.push('Enter correct email')
				} else if (!this.validEmail(this.data_signup.email)) {
					this.errors.push('Nonexistent email')
				}
				if (!this.data_signup.password) {
					this.errors.push('Enter password')
				} else if (this.data_signup.password.length < 8) {
					this.errors.push('Enter password more than eight characters')
				}
				if (!this.data_signup.phone) {
					this.errors.push('Enter phone')
				} else if (this.data_signup.phone.length < 12) {
					this.errors.push('Enter correct phone. Example: +380998887766')
				}
				if (!this.data_signup.first_name) {
					this.errors.push('Fill out correct first name')
				}
				if (!this.data_signup.last_name) {
					this.errors.push('Enter correct last name')
				}
				if (!this.data_signup.nickname) {
					this.errors.push('Incorrect nickname')
				}
				if (!this.data_signup.description) {
					this.errors.push('Enter correct description')
				}
				if (!this.data_signup.position) {
					this.errors.push('Enter position')
				}
			},
			validEmail: function (email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			},
			send() {
				if (this.errors.length === 0) {
					this.signUp(this.data_signup)
						.then(res => {
							if (res) {
								this.$router.push({name: 'profile'});
							} else {
								this.errors = [];
								this.errors.push('Try to register again')
							}
						})
						.catch(message => {
							this.errors = [];
							this.errors.push(message)
						})
				}
			}
		}
	}

</script>

<style>

</style>