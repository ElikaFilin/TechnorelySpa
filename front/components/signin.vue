<template>
    <form
            class="col m-auto"
            v-on:keyup.enter="logIn"
            method="post"
    >
        <b-alert v-if="errors.length" show variant="danger" class="m-3">
            <div v-for="error in errors" class="text-center m-1">{{error}}</div>
        </b-alert>
        <div class="form-group ">
            <label for="email">Email address</label>
            <input v-model="data_signin.email" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                   placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="data_signin.password" type="password" class="form-control" id="password"
                   placeholder="Password">
        </div>
        <div class="btn btn-primary" v-on:click="logIn">Log in</div>
    </form>
</template>

<script>
	import {mapActions, mapState} from 'vuex';

	export default {
		name: "signin",
		computed: mapState(['token']),
		data: () => {
			return {
				errors: [],
				data_signin: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			...mapActions({proccessLogin: 'logIn'}),
			logIn() {
				this.proccessLogin(this.data_signin)
					.then(() => {
							const token = {name: 'token', content: ""};
							token.content = this.token;
							this.worker.port.postMessage(token);
							this.$router.push({name: 'profile'})
						}
					)
					.catch(m => {
						this.errors = [];
						this.errors.push(m);
					});
			}
		}
	}
</script>

<style scoped>

</style>