<template>
    <div :class="$style.App" id="root">
        <b-container class="m-0" fluid :class="$style.container">
            <b-row>
                <b-col>
                    <router-link :to="{name: 'profile'}" class="ml-4" variant="light" v-if="loggedIn===true">
                        {{user.first_name}}
                    </router-link>
                    <router-link v-if="loggedIn&&$route.name!=='profile'" tag="button" :to="{name: 'profile'}"
                                 class="ml-4 btn btn-secondary" variant="light">
                        Go to profile
                    </router-link>
                </b-col>

                <div>
                    <router-link v-if="loggedIn&&$route.name!=='listOfCompanies'" tag="button" :to="{name: 'listOfCompanies'}"
                                 class="btn d-inline btn-success ml-4">
                        List company
                    </router-link>
                    <router-link v-if="loggedIn&&$route.name!=='addCompany'" tag="button" :to="{ name: 'addCompany'}"
                                 class="btn btn-success  d-inline  ml-4">
                        Add company
                    </router-link>
                    <router-link v-if="this.role==='admin'&&$route.name!=='usersList'" tag="button" :to="{ name: 'usersList'}"
                                 class="btn d-inline btn-success ml-4">
                        Users list
                    </router-link>
                </div>
                <b-col class="text-right">
                    <b-button v-if="loggedIn===true" v-on:click="signOut" size="sm" variant="outline-primary mr-4">
                        Logout
                    </b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <router-view/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
	import {mapState, mapActions, mapMutations} from 'vuex';

	export default {
		computed: mapState(['user', 'loggedIn', 'token', 'role']),
		mounted() {
			this.initWorker();
		},
		updated() {
			this.initWorker();
		},
		methods: {
			...mapActions({proccessLogOff: 'logOff'}),
			...mapMutations(['initStore']),
			signOut() {
				this.proccessLogOff();
				this.$router.push({name: 'authorization'});
			},
			initWorker() {
				const tokenData = {name: 'token', content: ""};
				tokenData.content = this.token;
				if (this.worker.port.onmessage == null) {
					console.log(" initing");
					this.worker.port.onmessage = e => {
						if (typeof e.data == "object") {
							if (e.data.name == 'token' && !e.data.content) {
								tokenData.content = null;
								this.worker.port.postMessage(tokenData);
								console.log("signed out" + new Date());
								this.signOut();
							}
						} else {
							console.log(e.data)
						}
					};
				} else {
					console.log("onmessage inited");
				}
				this.worker.port.start();
				this.worker.port.postMessage("start");
				this.worker.port.postMessage(tokenData);
			}
		}
	};
</script>

<style module>
    .App {
        padding: 10px;
        margin: 5rem 0rem;
    }

    .container {
        max-width: 100% !important;
    }
</style>


