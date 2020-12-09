import { getItem } from '@/js/helper/storageHelper.js'
import _filter from 'lodash/filter.js'
import ROLES from '@/json/roles.json'
const currentRole = getItem('user') ? getItem('user').role : 0

const getRoleOptions = function() {
	if(currentRole === 1) {
		return _filter(ROLES, item => {
			if(item.code === 1) {
				return false
			}
			return true
		})
	}
    return []
}

export {
	getRoleOptions
}