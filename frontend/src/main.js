import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './tailwind-vue.css'

Vue.config.productionTip = false

let data = {
	user: null,
	project: null
}

new Vue({
	data,
	router,
	render: h => h(App)
}).$mount('#app'); 