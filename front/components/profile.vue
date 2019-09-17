<template>
    <div :class="$style.style">
        <b-alert v-if="errors.length" show variant="danger">
            <div v-for="error in errors" class="text-center m-1">{{error}}</div>
        </b-alert>
        <b-button offsetMd="8" variant="outline-success" v-on:click="toggleEdit" class="m-3">{{this.editBtn}}</b-button>

        <b-table-simple stacked>
            <ProfileItem :editable="false" :change="handleChange" field="email"
                         v-bind:value="data_profile.email">
                Email:
            </ProfileItem>

            <ProfileItem :styleInput="styleInput" :editable="editable" :change="handleChange" field="phone"
                         v-bind:value="data_profile.phone">
                Phone:
            </ProfileItem>
            <ProfileItem :styleInput="styleInput" :editable="editable" :change="handleChange" field="first_name"
                         v-bind:value="data_profile.first_name">
                First Name:
            </ProfileItem>
            <ProfileItem :styleInput="styleInput" :editable="editable" :change="handleChange" field="last_name"
                         v-bind:value="data_profile.last_name">
                Last name:
            </ProfileItem>
            <ProfileItem :styleInput="styleInput" :editable="editable" :change="handleChange" field="nickname"
                         v-bind:value="data_profile.nickname">
                Nickname:
            </ProfileItem>
            <ProfileItem :styleInput="styleInput" :editable="editable" :change="handleChange" field="desc"
                         v-bind:value="data_profile.desc">
                Description:
            </ProfileItem>
            <ProfileItem :styleInput="styleInput" :editable="editable" :change="handleChange" field="position"
                         v-bind:value="data_profile.position">
                Position:
            </ProfileItem>
        </b-table-simple>

    </div>
</template>

<script>
	import ProfileItem from "./ProfileItem";
	import AddCompany from "./addCompany";
	import {mapActions, mapState} from 'vuex';

	export default {
		name: "profile",
		computed: mapState(['role']),
		data() {
			return {
				data_profile: {},
				editable: false,
				stateError: false,
				errors: [],
				styleInput: {},
				editBtn: 'Edit profile'
			}
		},
		methods: {
			...mapActions(['getProfileData', 'changeProfileData']),
			toggleEdit() {
				this.editable = !this.editable;
				if (this.editable === false) {
					if (this.errors.length > 0) {
						this.errors.length = 0;
						this.stateError = !this.stateError;
					}
					if (!this.data_profile.phone) {
						this.errors.push('Enter phone')
					} else if (this.data_profile.phone.length < 12) {
						this.errors.push('Enter correct phone. Example: +380998887766')
					}
					if (!this.data_profile.first_name) {
						this.errors.push('Fill out correct first name')
					}
					if (!this.data_profile.last_name) {
						this.errors.push('Enter correct last name')
					}
					if (!this.data_profile.nickname) {
						this.errors.push('Incorrect nickname')
					}
					if (!this.data_profile.desc) {
						this.errors.push('Enter correct description')
					}
					if (!this.data_profile.position) {
						this.errors.push('Enter position')
					}
					if (this.errors.length === 0) {
						this.editBtn = 'Edit profile';
						this.changeProfileData(this.data_profile)
							.then(response => {
								this.data_profile = {...response};
							})
					} else {
						this.editable = true
					}
				} else {
					this.editBtn = 'Save';
				}
			},
			handleChange(e, faild) {
				this.data_profile[faild] = e.target.value;
			}
		},
		mounted() {
			this.getProfileData()
				.then(data => this.data_profile = {...data});
		},
		components: {ProfileItem, AddCompany}
	}
</script>

<style module>
    .style {
        text-align: center;
        border-top: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        margin: 1rem;
    }
</style>