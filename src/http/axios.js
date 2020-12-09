import {Message} from 'element-ui'
import axios from 'axios'
import config from './config'
import Cookies from "js-cookie"
import router from '@/router'
import {clearStorage} from '@/js/helper/storageHelper.js'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			timeout: config.timeout
		})

		// request 拦截器
		instance.interceptors.request.use(
			config => {
				let uid = Cookies.get('uid')
				let token = Cookies.get('token')
				if (token) {
					config.headers = {
						'ci-uid': uid,
						'ci-token': token
					}
				}
				return config
			},
			error => {
				console.log('request:', error)
				return Promise.reject(error)
			}
		)

		// response 拦截器
		instance.interceptors.response.use(
			response => {
				let data;
				// IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
				if (response.data == undefined) {
					data = JSON.parse(response.request.responseText)
				} else {
					data = response.data
				}
				if(data.code !== 0) {
					Message.error(response.data.msg)
					return Promise.reject(data.msg)
				}

				return data
			},
			err => {
				if (err && err.response) {
					switch (err.response.status) {
						case 403:
							Message.error('token过期，请重新登录')
							clearStorage()
							router.replace('/login')
							break
						default:
					}
				}
				console.error(err)
				return Promise.reject(err) // 返回接口返回的错误信息
			}
		)

		// 请求处理
		instance(options).then(res => {
			resolve(res)
			return false
		}).catch(error => {
			reject(error)
		})
	})
}
