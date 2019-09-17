<template>
    <div>
        <b-alert v-if="stateError" v-model="error" variant="danger" class="mt-4">{{this.error}}</b-alert>
        <b-modal ref="modal" id="deleteConfirm" @ok="remove" title="Delete user">
            Do you really want to delete this user?
        </b-modal>

        <b-table-simple striped class="m-4 ">
            <b-tr>
                <b-th>Email</b-th>
                <b-th>Phone</b-th>
                <b-th>First name</b-th>
                <b-th>Last name</b-th>
                <b-th>Nickname</b-th>
                <b-th>Description</b-th>
                <b-th>Position</b-th>
                <b-th>Role</b-th>
                <b-th></b-th>
                <b-th></b-th>
            </b-tr>
            <b-tr v-bind:key="index" v-for="(user, index) in list">
                <b-td>{{user.email}}</b-td>
                <b-td>{{user.phone}}</b-td>
                <b-td>{{user.first_name}}</b-td>
                <b-td>{{user.last_name}}</b-td>
                <b-td>{{user.nickname}}</b-td>
                <b-td>{{user.desc}}</b-td>
                <b-td>{{user.position}}</b-td>
                <b-td>{{user.role}}</b-td>
                <b-td>
                    <b-button variant="danger" v-on:click="(e)=>tryToRemove(e,user.id)">
                        Delete
                    </b-button>
                </b-td>
                <b-td>
                    <router-link :to="{name: 'editUser', params:{id:user.id, data:user}}" class="btn btn-info">
                        Edit
                    </router-link>
                </b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';

	export default {
		name: "usersList",
		computed: mapState(['role']),
		data() {
			return {
				stateError: false,
				error: '',
				list: []
			}
		},
		methods: {
			...mapActions(['viewUsers', 'deleteUser']),
			remove(e) {
				this.deleteUser({id: this.$refs.modal.userId})
					.then(res => {
						const index = this.list.findIndex((item) => res.id == item.id);
						this.list.splice(index, 1);
					})
					.catch(error => {
						console.error(error);
						this.error = 'User wasn\'t deleted';
						this.stateError = true;
					});
			},
			tryToRemove(e, x) {
				this.$bvModal.show('deleteConfirm');
				this.$refs.modal.userId = x
			}
		},
		mounted() {
			console.log(this.modal);
			if (this.role === 'admin') {
				this.viewUsers().then(users => {
					if (users) {
						this.list = [...users];
					} else {
						console.error(users.message)
					}
				})
					.catch(error => {
						console.error(error);
						this.error = 'Error mount data. Please try again later';
						this.stateError = true;
					})
			} else {
				this.$router.push({name: 'profile'})
			}
		},
	}
</script>

<style scoped>

</style>{