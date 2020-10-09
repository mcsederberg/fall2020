{{ src/components/Gantt.vue }}
<template>
  <div class="about w-full h-full">
    <div class="w-full h-full" ref="gantt"></div>
  </div>
</template>

<script>
// import api from '@/api'
// import User from '../models/User'
import {gantt} from 'dhtmlx-gantt';
export default {
	name: 'Projects',
	components: {
	},
	data: function(){
		return{
			tasks: {
				data: [
					{
						id: 1, 
						text: "Create DBs", 
						start_date: "2020-09-28", 
						duration: 3, 
						progress: .6
					},
					{
						id: 2, 
						text: "Create Vue pages", 
						start_date: "2020-09-28", 
						duration: 8, 
						progress: .6
					},
					// {
					// 	id: 3, 
					// 	text: "Create API", 
					// 	start_date: "2020-10-5", 
					// 	duration: 17, 
					// 	progress: .6
					// }
				],
				links: [
					{
						id: 1,
						source: 1,
						target: 2,
						type: '0'
					}
				]
			}
		}
	},
	mounted: function(){
		gantt.config.xml_date = "%Y-%m-%d";
		gantt.config.readonly = true;
        gantt.init(this.$refs.gantt);
        gantt.parse(this.tasks);
	},
	methods: {
		
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

