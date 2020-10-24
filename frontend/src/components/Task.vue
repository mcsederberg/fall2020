<template>
<div>
	<div class="border my-3 p-4 bg-header flex flex-col">
		<i class="fa fa-times cursor-pointer ml-auto" @click="deleteTask(task.id)"/>
		<div class="taskHeader flex justify-between items-center mt-2">
			<p class="text-center text-lg">{{title}}
				<i class="far fa-edit cursor-pointer text-teal" @click="editActivityPopup(task)"/>
			</p>
			<p class="float-right">Due: {{prettyDate(dueDate)}}</p>
		</div>
		<div class="taskDescription ml-3 mt-3">
			{{summary}}
		</div>
		<div class="self-end bg-orange rounded-lg cursor-pointer mt-1 py-1 px-3">Mark Complete</div>
	</div>

</div>
</template>

<script>
export default {
	name: 'Task',
	props: {
		title: {
			type: String, 
			required: true
		},
		dueDate: {
			required:true
		},
		summary: {
			type: String,
			required:true
		}
	},
	methods: {
		deleted: function() {
			this.$emit("deleted")
		},
		prettyDate: function(dateString){
            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            var date = new Date(dateString);
            var monthIndex = date.getMonth();
            var day = date.getDate();
            var year = date.getFullYear();
            return months[monthIndex] + " " + day + ", " + year;
        },
	}
}
</script>