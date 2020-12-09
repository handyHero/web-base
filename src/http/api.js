/* 
 * 接口统一集成模块
 */
import * as login from './modules/login'
import * as user from './modules/user'
import * as service from './modules/service'

export default {
    login,
	user,
	service
}