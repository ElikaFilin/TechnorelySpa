<template>
    <b-card class="shadow-lg w-50 m-auto">
        <b-tabs>
            <b-tab title="Log in" active>
                <Signin/>
            </b-tab>
            <b-tab title="Sign up">
                <Signup/>
            </b-tab>
        </b-tabs>
    </b-card>


</template>

<script>
	import Signup from "./signup";
	import Signin from "./signin";

	export default {
		name: "authorization",
		components: {Signin, Signup},
	}
</script>

<style scoped>

</style>