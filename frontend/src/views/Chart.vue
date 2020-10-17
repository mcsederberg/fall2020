{{ src/components/Gantt.vue }}
<template>
  <div class="about w-full" :style="aboutStyle">
    <div class="w-full h-full" ref="gantt"></div>
  </div>
</template>

<script>
import {gantt} from 'dhtmlx-gantt';
import Task from '../models/Task';
import  Cookies from '../mixins/Cookies'
export default {
	name: 'Projects',
	components: {
	},
	data: function(){
		return{
			displayTasks: {data: [], links: []}
		}
	},
	mounted: function(){
		gantt.config.xml_date = "%Y-%m-%d";
		gantt.config.readonly = true;
		gantt.config.scales = [{
			unit: "week",
			step: 1
		}]
		gantt.config.autofit = true;
        gantt.init(this.$refs.gantt);
		this.user = Cookies.getUser();
		this.project = Cookies.getProject();
		this.getAllTasks();
	},
	computed: {
		aboutStyle: function(){
			var rows = this.displayTasks.data.length + 1;
			var height = rows * 35;
			return "height: " + height + "px;";
		}
	},
	methods: {
		getAllTasks: function(){
            var vue = this;
			var res = Task.getTasksForProjectID(this.project.id);
			res.then(function(response){
				var displayTasks = [];
				for (var i in response) {
					var task = response[i];
					displayTasks.push({
						id: task.id,
						text: task.title,
						start_date: vue.ganttDate(task.startDate),
						duration: vue.dayDiff(new Date(task.startDate), new Date(task.dueDate)),
						progress: 0,
					});
                }

				vue.allTasks = response;
				vue.displayTasks.data = displayTasks.sort((a,b) => new Date(a.start_date) - new Date(b.start_date));
				vue.showPopup = false;
				gantt.parse(vue.displayTasks);
				gantt.render();
			}).catch(function(e){
				var code = e.error;
				switch (code){
                    default:
					// case "ER_DUP_ENTRY":
					// 	alert("That username is taken");
					// 	break;
				}
			});
		},
		ganttDate: function(date){
			return new Date(date).toString("yyyy-MM-dd");
		},
		dayDiff: function(date1, date2){
			var Difference_In_Time = date2.getTime() - date1.getTime(); 
			
			return Difference_In_Time / (1000 * 3600 * 24); 
		}
	}
}
</script>
<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
	[aria-label="New task"], .gantt_link_point, .gantt_task_progress_drag{
		display: none !important;
	}
	/* .gantt_container, .gantt_tooltip, .gantt_task_row, .gantt_row{
		background-color: rgb(36,36,36) !important;
		color: white
	} */
	/* .gantt_cell{
		color: white !important;
	} */
	/* .gantt_grid_head_cell, .gantt_scale_line, .gantt_grid_scale{
		background: #353535 !important
	} */
</style>

