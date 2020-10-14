<template>
<div>
	<div class="flex flex-col absolute border p-5" style="left: 45%; top: 20%;">
		<div class="flex">
			<i @click="closed" class="fa fa-remove"/> 
            <p class="self-center mx-auto">{{title}}</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Popup',
	props: {
		title: {
			type: String, 
			require: true
		}
	},
	methods: {
		closed: function() {
			this.$emit("closed")
		}
	}
}
</script>