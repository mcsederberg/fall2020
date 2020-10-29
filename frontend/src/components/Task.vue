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
		<div class="flex flex-col lg:flex-row justify-between mt-2">
			<span v-if="editPercent" @mouseover="hover = true" @mouseleave="hover = false" >
				Percent Complete: 
				<input type="range" min="0" max="100" v-model="percentComplete" class="slider bg-white" id="myRange" @mousedown="willChange" @mouseup="doneChanging">
				<span v-if="hover">{{percentComplete}}%</span>
				<!-- <span v-if="changing">For testing</span> -->
			</span>
			<span v-else/> <!--empty span for alignment-->
			<div class="self-end bg-orange rounded-lg cursor-pointer mt-1 py-1 px-3">Mark Complete</div>
		</div>
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
		},
		editPercent: {
			type: Boolean,
			default: false
		}
	},
	data: function() {
		return {
			percentComplete: 0,
			hover:false,
			changing: false,
			percentBefore: null
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
		willChange: function() {
			this.percentBefore = this.percentComplete;
			this.changing = true;
		},
		doneChanging: function() {
			this.changing = false;
			let valueToSet = this.percentComplete;
			if (valueToSet != this.percentBefore) {
				this.$emit("savePercent", valueToSet);
			}
		}
	}
}
</script>

<style scoped>
.slider {
	-webkit-appearance: none;
	height: 2px;
	border-radius: 5px;
	outline: none;
}
.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	background: white;
	cursor: pointer;
}
</style>