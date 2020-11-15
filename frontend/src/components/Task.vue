<template>
<div>
	<div class="border my-3 p-4 bg-header flex flex-col">
		<div class="flex flex-row">
			<div v-if="task.userFirstName">Assigned to: {{task.userFirstName}}</div>
			<i class="fa fa-times cursor-pointer ml-auto" @click="deleted()"/>
		</div>
		<div class="taskHeader flex flex-col lg:flex-row justify-between items-center mt-2">
			<p class="text-center text-lg">{{task.title}}
				<i class="far fa-edit cursor-pointer text-teal" @click="editTask"/>
			</p>
			<p class="float-right">Due: {{prettyDate(task.dueDate)}}</p>
		</div>
		<div class="taskDescription ml-3 mt-3">
			{{task.summary}}
		</div>
		<div class="flex flex-col lg:flex-row justify-between mt-2">
			<span v-if="editPercent && (percentComplete < 100)" @mouseover="hover = true" @mouseleave="hover = false" >
				Percent Complete: 
				<input type="range" min="0" max="100" v-model="percentComplete" class="slider bg-white" id="myRange" @mousedown="percentBefore = percentComplete;" @mouseup="percentageChanged">
				<span v-if="hover">{{percentComplete}}%</span>
			</span>
			<div v-else>
				<div class="border" style="min-width:150px">
					<div :class="['bg-orange', {'pl-2':percentComplete != '0'}]" role="progressbar" :style="'width:' + percentComplete + '%'">
						{{percentComplete}}%
					</div>
				</div>
			</div>
			<div v-if="!task.completedDate" @click="completeTask()" class="self-end bg-orange text-darkBlue rounded-lg cursor-pointer mt-1 py-1 px-3">Mark Complete</div>
			<div v-else class="self-end text-teal rounded-lg mt-1 py-1">Completed {{prettyDate(task.completedDate)}}</div>
		</div>
	</div>

</div>
</template>

<script>
export default {
	name: 'Task',
	props: {
		task: {
			type: Object,
			required: true
		},
		editPercent: {
			type: Boolean,
			default: false
		},
		percent: {
			type: [Number, String],
			required:true
		}
	},
	data: function() {
		return {
			percentComplete: this.percent,
			hover:false,
			percentBefore: null
		}
	},
	methods: {
		deleted: function() {
			this.$emit("deleted")
		},
		editTask: function() {
			this.$emit("editTask", this.task);
		},
		prettyDate: function(dateString){
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var date = new Date(dateString);
			var monthIndex = date.getMonth();
			var day = date.getDate();
			var year = date.getFullYear();
			return months[monthIndex] + " " + day + ", " + year;
		},
		percentageChanged: function() {
			let valueToSet = this.percentComplete;
			if (valueToSet != this.percentBefore) {
				// if (valueToSet == 100) {
				// 	this.$emit('completeTask', this.task.id);
				// }
				// else {
					this.$emit("savePercent", valueToSet); //popuptask id
				// }
			}
        },
		completeTask: function() {
			this.$emit('completeTask', this.task.id);
		}
	},
	watch:{
		percent: function() {
			this.percentComplete = this.percent
		}, 
		percentComplete: function(newV) {
			if (newV == 100 && !this.task.completedDate) {
				this.$emit('completeTask', this.task.id);
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