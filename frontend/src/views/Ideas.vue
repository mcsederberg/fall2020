{{ src/components/Gantt.vue }}
<template>
	<div class="about w-full h-full bg-lightBlue">
		<div class="w-2/3 mx-auto bg-darkBlue  border-orange border-l-8 border-r-8" style="min-height: 100%">
			<div class="flex w-1/2 mx-auto">
				<div class="text-xxxlg font-sans">Idea Board</div>
			</div>
			<Message :message="message"/>
		</div>
	</div>
</template>

<script>
import Cookies from '../mixins/Cookies'
import Message from '../components/Message';
export default {
	name: 'IdeaBoard',
	components: {
		Message: Message
	},
	data: function(){
		return{
			user: {},
			project: {},
			projectUsers: [],
			message: {content: "Here is the content to be shared", userID: "Michael", timePublished: "2020-12-07T07:00:00.000Z", editDate: "2020-12-07T07:00:00.000Z", priority: true}
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