{{ src/components/Gantt.vue }}
<template>
	<div class="about w-full h-full bg-lightBlue">
		<div class="w-2/3 mx-auto bg-darkBlue  border-orange border-l-8 border-r-8" style="min-height: 100%">
			<div class="flex w-1/2 mx-auto">
				<div class="text-xxxlg font-sans">Idea Board</div>
			</div>
		</div>
	</div>
</template>

<script>
import Cookies from '../mixins/Cookies'
export default {
	name: 'IdeaBoard',
	components: {
	},
	data: function(){
		return{
			user: {},
			project: {},
			projectUsers: []
		}
	},
	mounted: function(){
		this.user = Cookies.getUser();
		this.project = Cookies.getProject();
		this.projectUsers = Cookies.getUsers();
	},
	computed: {

	},
	methods: {
		
	}
}
</script>