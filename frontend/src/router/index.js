import Vue from 'vue'
import VueRouter from 'vue-router'
import MyTasks from '../views/MyTasks.vue'
import TeamTasks from '../views/TeamTasks.vue'
import Chart from '../views/Chart.vue'
import Login from '../views/Login.vue'
import Projects from '../views/Projects.vue'
import ProjectSettings from '../views/ProjectSettings.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/projects',
		name: 'Projects',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: Projects
	},
	{
		path: '/projectSettings',
		name: 'ProjectSettings',
		component: ProjectSettings
	},
	{
		path: '/mytasks',
		name: 'MyTasks',
		component: MyTasks
	},
	{
		path: '/teamtasks',
		name: 'TeamTasks',
		component: TeamTasks
	},
	{
		path: '/chart',
		name: 'Chart',
		component: Chart
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
