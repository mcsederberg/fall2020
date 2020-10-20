<template>
  <div class="about w-full h-full">
    Edit settings for {{project.title}}
  </div>
</template>

<script>
import  Cookies from '../mixins/Cookies'
export default {
	name: 'ProjectSettings',
	components: {
	},
	data: function(){
		return{
			user: {},
			project: {}
		}
	},
	mounted: function(){
		this.user = Cookies.getUser();
		this.project = Cookies.getProject();
	},
	methods: {
		
	}
}
</script>

