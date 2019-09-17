<template>
    <b-row class="justify-content-center">
        <b-th class="w-25 text-sm-right">
            <slot/>
        </b-th>
        <b-td class="w-25 " id="data">
            <input v-bind:class="{active: editable}" :readonly="!editable" class="input" type="text"
                   v-on:input="(e)=>change(e,field)" v-bind:value="value">
        </b-td>
    </b-row>

</template>

<script>
	export default {
		name: "ProfileItem",
		props: ['editable', 'value', 'change', 'field', 'styleInput'],
	}
</script>

<style scoped>
    .input {
        border: none;
        outline: none;
    }
    .active {
        border: 1px solid rgba(127, 187, 234, 0.91);
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        padding: .5rem;
    }
</style>