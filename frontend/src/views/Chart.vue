{{ src/components/Gantt.vue }}
<template>
	<div class="about w-full h-full bg-lightBlue">
		<div class="w-2/3 mx-auto bg-darkBlue" style="min-height: 100%">
			<div class="flex w-1/2 mx-auto pt-4">
				<div class="text-xxxlg font-sans">Team Progress</div>
			</div>
			<div class="flex w-1/2 mx-auto pl-4 pt-4">
				<div class="text-xxlg">Gantt Chart</div><span @click="chartIsBig=!chartIsBig" class="ml-2 self-center text-2xs text-gray cursor-pointer">(Click to enlarge)</span>
			</div>
			<div @click="chartIsBig=!chartIsBig">
				<div :class="chartClasses" ref="gantt" :style="aboutStyle"></div>
			</div>
			<div class="flex w-1/2 mx-auto pl-4 pt-4">
				<div class="text-xxlg">Total Team Hours: {{teamHours}}</div>
			</div>
			<div class="flex w-1/2 mx-auto pl-4 pt-4">
				<div  @click="collapsedHours=!collapsedHours" class="cursor-pointer text-xxlg">Individual Hours <i :class="['fa', {'fa-caret-down':collapsedHours, 'fa-caret-up':!collapsedHours}]"/></div>
			</div>
			<div class="flex flex-col w-1/2 mx-auto pl-4 pb-10">
				<div v-show="!collapsedHours" v-for="(hour, userID) in individualHours" :key="userID" class="flex flex-col">  
					{{getUsername(userID)}}: {{HMS(hour)}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {gantt} from 'dhtmlx-gantt';
import Task from '../models/Task';
import Hour from '../models/Hour';
import Cookies from '../mixins/Cookies'
export default {
	/*global _*/
	name: 'Projects',
	components: {
	},
	data: function(){
		return{
			displayTasks: {data: [], links: []},
			chartIsBig: false,
			collapsedHours: true,
			teamHours: 0,
			individualHours: [],
			projectUsers: [],
			projectUsersByID: {}
		}
	},
	mounted: function(){
		gantt.config.xml_date = "%Y-%m-%d";
		gantt.config.readonly = true;
		gantt.config.scales = [{
			unit: "week",
			step: 1
		}]
        gantt.init(this.$refs.gantt);
		this.user = Cookies.getUser();
		this.project = Cookies.getProject();
		this.projectUsers = Cookies.getUsers();
		this.projectUsersByID = _.indexBy(this.projectUsers, "id")
		this.getAllTasks();
		this.getTeamHours();
	},
	computed: {
		aboutStyle: function(){
			var rows = this.displayTasks.data.length + 1;
			var height = rows * 35;
			return "min-height: " + height + "px;";
		},
		chartClasses: function() {
			if (this.chartIsBig){
				return "w-full mx-auto";
			}
			return "w-3/4 mx-auto pointer-events-none";
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
						progress: task.percentComplete/100,
					});
                }

				vue.allTasks = response;
				vue.displayTasks.data = displayTasks.sort((a,b) => new Date(a.start_date) - new Date(b.start_date));
				vue.showPopup = false;
				gantt.parse(vue.displayTasks);
			}).catch(function(e){
				var code = e.error;
				switch (code){
                    default:
				}
			});
		},
		getTeamHours: function(){
            var vue = this;
			var res = Hour.getHoursForProject(this.project.id);
			res.then(function(response){
				vue.individualHours = response;
				var hours = 0;
				for (const personID in response){
					hours += response[personID];
				}
				vue.teamHours = vue.HMS(hours); 
			}).catch(function(e){
				var code = e.error;
				switch (code){
                    default:
				}
			});
		},
		HMS: function(d){
			d = Number(d);
			var h = Math.floor(d / 3600);
			var m = Math.floor(d % 3600 / 60);
			// var s = Math.floor(d % 3600 % 60);

			var hDisplay = h > 0 ? h : "0";
			var mDisplay = ":" + (m > 0 ? m : "00");
			// var sDisplay = ":" + (s > 0 ? s : "00");
			// return hDisplay + mDisplay + sDisplay;
			return hDisplay + mDisplay;
		},
		ganttDate: function(date){
			return new Date(date).toString("yyyy-MM-dd");
		},
		dayDiff: function(date1, date2){
			var Difference_In_Time = date2.getTime() - date1.getTime(); 
			
			return Difference_In_Time / (1000 * 3600 * 24); 
		},
		getUsername: function(id){
			var user = this.projectUsersByID[id];
			return user.getFullName();
		}
	}
}
</script>
<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
	[aria-label="New task"], .gantt_link_point, .gantt_task_progress_drag{
		display: none !important;
	}
	.gantt_container, .gantt_tooltip, .gantt_task_row, .gantt_row{
		background-color: rgb(36,36,36) !important;
		color: white
	}
	.gantt_cell{
		color: white !important;
	}
	.gantt_grid_head_cell, .gantt_scale_line, .gantt_grid_scale{
		background: #353535 !important
	}
</style>

