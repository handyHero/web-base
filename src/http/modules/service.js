import axios from '../axios'

/* 
 * 机器管理
 */

// 获取媒体服务列表
export const list = data => {
    return axios({
        url: '/v2/service/list',
        method: 'post',
		data
    })
}

// 查看服务详情
export const detail = data => {
    return axios({
        url: '/v2/service/get',
        method: 'post',
		data
    })
}

// 上下架媒体服务
export const offline = data => {
    return axios({
        url: '/v2/service/offline',
        method: 'post',
		data
    })
}

// 获取room列表
export const roomlist = data => {
    return axios({
        url: '/v2/room/list',
        method: 'post',
		data
    })
}
// 获取room信息
export const roomdetail = data => {
    return axios({
        url: '/v2/room/get',
        method: 'post',
		data
    })
}
