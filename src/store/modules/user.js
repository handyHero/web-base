import { setItem, getItem } from '@/js/helper/storageHelper.js'

export default {
	state: {
		perms: getItem('permission') || [], // 用户权限标识集合
	},
	getters: {
		
	},
	mutations: {
		setPerms(state, perms) { // 用户权限标识集合
			setItem('permission', perms)
			state.perms = perms;
		}
	},
	actions: {}
}
