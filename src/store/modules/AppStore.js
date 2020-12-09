export default {
	state: {
		appName: "", // 应用名称
		collapse: false // 导航栏收缩状态
	},
	mutations: {
		collapse(state) { // 改变收缩状态
			state.collapse = !state.collapse
		}
	},
	actions: {},
	modules: {}
}
