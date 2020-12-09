import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Home from '@/views/Home.vue'
import ServiceList from '@/views/service/ServiceList.vue'
import ServiceDetail from '@/views/service/ServiceDetail.vue'
import RoomList from '@/views/service/RoomList.vue'
import RoomDetail from '@/views/service/RoomDetail.vue'
import UserList from '@/views/user/UserList.vue'
import UserNew from '@/views/user/UserNew.vue'
import ActionLog from '@/views/user/ActionLog.vue'

import { Message } from 'element-ui'
Vue.use(VueRouter)
import Cookies from "js-cookie"

const routes = [{
		path: '/',
		name: 'index',
		redirect: '/home',
		component: Index,
		children: [{
				path: '/home',
				name: 'home',
				component: Home,
			}, {
				path: '/service-list',
				name: 'serviceList',
				component: ServiceList
			}, {
				path: '/service-detail',
				name: 'serviceDetail',
				component: ServiceDetail
			}, {
				path: '/room-list',
				name: 'roomList',
				component: RoomList
			}, {
				path: '/room-detail',
				name: 'roomDetail',
				component: RoomDetail
			}, {
				path: '/user-list',
				name: 'userList',
				component: UserList
			}, {
				path: '/user-new',
				name: 'userNew',
				component: UserNew
			}, {
				path: '/action-log',
				name: 'actionLog',
				component: ActionLog
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/404',
		name: 'notFound',
		component: NotFound
	},
	// {
	//   path: '/about',
	//   name: 'About',
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	let token = Cookies.get('token')
	let user = localStorage.getItem('user')
	if(to.path == '/login') {
		if(token && user) {
			next({ path: '/home' })
		} else {
			next()
		}
	} else {
		if(token && user) {
			next()
		} else {
			Message.error('你已退出或长时间未使用，请重新登录~')
			next({ path: '/login' })
		}
	}
})

export default router
