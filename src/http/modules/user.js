import axios from '../axios'

/* 
 * 账号管理
 */

// 获取用户列表
export const list = data => {
    return axios({
        url: '/v2/user/list',
        method: 'post',
		data
    })
}

// 添加账号
export const add = data => {
    return axios({
        url: '/v2/user/add_user',
        method: 'post',
        data
    })
}

// 修改账号
export const modify = data => {
    return axios({
        url: '/v2/user/modify_user',
        method: 'post',
        data
    })
}

// 操作列表
export const actionlog = data => {
    return axios({
        url: '/v2/actionlog/list',
        method: 'post',
        data
    })
}