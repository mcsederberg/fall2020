<template>
<div class="w-screen h-screen fixed top-0 left-0 bg-blur z-10 flex justify-center"> <!--Todo fix positioning, etc. Also use in Task.vue-->
	<div class="self-center mx-auto absolute border-8 p-6 bg-darkBlue">
		<div class="flex">
            <p class="self-center text-xxxlg">{{title}}</p>
			<i @click="closed" class="fa fa-remove p-2 ml-auto float-right cursor-pointer"/> 
		</div>
		<slot/>
	</div>
</div>
</template>

<script>
export default {
	name: 'Popup',
	props: {
		title: {
			type: String, 
			required: true
		}
	},
	methods: {
		closed: function() {
			this.$emit("closed")
		}
	}
}
</script>