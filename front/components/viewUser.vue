<template>
    <div>
        <b-alert v-if="stateError" v-model="error" variant="danger" class="mt-4">{{this.error}}</b-alert>

        <b-row class="mt-4">
            <b-col class="text-left">
                <router-link :to="{name: 'usersList'}" class="btn btn-secondary m-2">
                    Back
                </router-link>
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
                <b-td>{{userData.email}}</b-td>
                <b-td>{{userData.phone}}</b-td>
                <b-td>{{userData.first_name}}</b-td>
                <b-td>{{userData.last_name}}</b-td>
                <b-td>{{userData.nickname}}</b-td>
                <b-td>{{userData.desc}}</b-td>
                <b-td>{{userData.position}}</b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>

<script>
	import {mapActions} from 'vuex'

	export default {
		name: "viewUser",
		data() {
			return {
				userId: null,
				stateError: false,
				error: '',
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
			...mapActions(['viewUser'])
		},
		mounted() {
			this.userId = this.$route.params.id;
			if (this.$route.params.data) {
				this.userData = this.$route.params.data;
			} else {
				this.viewUser({id: this.userId}).then(user => {
					this.userData = {...user};
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
    .border:hover {
        border-color: #28a745;
        -webkit-box-shadow: 0px 0px 10px 1px rgba(40, 167, 69, 0.9);
        -moz-box-shadow: 0px 0px 10px 1px rgba(40, 167, 69, 0.9);
        box-shadow: 0px 0px 10px 1px rgba(40, 167, 69, 0.9);
    }
</style>