import _get from 'lodash/get'
import _find from 'lodash/find'
import MEDIA_TYPE from '@/json/media-server-type.json'
import CLASS_TYPE from '@/json/class-type.json'
import ACTION_LOG from '@/json/action-log.json'
import ROLES from '@/json/roles.json'

const formatClassType = function(data) {
    return _get(_find(CLASS_TYPE, ['code', data]), 'title')
}

const formatMediaType = function(data) {
    return _get(_find(MEDIA_TYPE, ['code', data]), 'title')
}

const formatActionType = function(data) {
    return _get(_find(ACTION_LOG, ['code', data]), 'title')
}

const formatRole = function(data) {
    return _get(_find(ROLES, ['code', data]), 'title')
}

const formatTime = function(data) {
	return data && new Date(data * 1000).toFormat('YYYY-M-D HH24:MI') || ''
}

const intToip = function(num){
	var str;
	var arr = new Array();
	arr[0] = (num >>> 24) >>> 0;
	arr[1] = ((num << 8) >>> 24) >>> 0;
	arr[2] = (num << 16) >>> 24;
	arr[3] = (num << 24) >>> 24;
	str = String(arr[3]) + "." + String(arr[2]) + "." + String(arr[1]) + "." + String(arr[0]);
	return str;
}

export {
	formatClassType,
	formatMediaType,
	formatActionType,
	formatRole,
	formatTime,
	intToip
}
