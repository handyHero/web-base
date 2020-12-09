<template>
	<div class="my-header">
		<div>
			<!-- 折叠按钮 -->
			<div class="collapse-btn" @click="collapseChage">
				<img src="../assets/image/logo-black.png" style="width: 38px; vertical-align: middle;" />
			</div>
			<div class="logo"><router-link to="/">***后台管理</router-link></div>
		</div>
		<div class="header-right">
			<div class="header-right-item header-user-con">
				<span class="nick-name">
					<span class="name">
						{{ user.nick_name || user.phoneno }}
					</span>
					<!-- <br>
					<span class="role">
						{{getRoleTitle(user)}}
					</span> -->
				</span>
			</div>
			<div class="header-right-item header-edit">
				<el-tooltip effect="dark" placement="bottom" content="退出登录">
					<i class="iconfont icon-top_btn_exit header-icon" @click="logout"></i>
				</el-tooltip>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {Tooltip} from 'element-ui'
	Vue.use(Tooltip)
	
	import Cookies from "js-cookie"
	import {getItem, clearStorage} from '@/js/helper/storageHelper.js'
	export default {
		data() {
			return {
				user: getItem('user')
			}
		},
		methods: {
			// 侧边栏折叠
			collapseChage() {
				this.$store.commit('collapse')
			},
			logout() {
				Cookies.remove('uid')
				Cookies.remove('token')
				clearStorage()
				this.$router.replace('/login')
			}
		}
	}
</script>

<style lang="scss">
	$header-height: 60px;
	.my-header {
		display: flex;
		justify-content: space-between;
		height: $header-height;
		font-size: 20px;
		color: #fff;
		background: #2E3D4B;
		.collapse-btn {
			cursor: pointer;
			line-height: $header-height;
			display: inline-block;
		}
		.logo {
			width: 250px;
			margin-left: 10px;
			line-height: $header-height;
			display: inline-block;
			a {
				color: #fff;
				text-decoration: none;
				vertical-align: middle;
			}
		}
	}
	.header-right {
		font-size: 14px;
		line-height: $header-height;
	
		&-item {
			display: inline-block;
			margin-right: 20px;
	
			a {
				font-size: 16px;
				color: #fff;
			}
		}
	
		.header-icon {
			&::before {
				font-size: 22px;
				vertical-align: middle;
				cursor: pointer;
			}
		}
	}
	.header-user-con {
		.nick-name {
			display: inline-block;
			vertical-align: middle;
			.name {
				font-size: 14px;
			}
			.role {
				font-size: 12px;
				line-height: 17px;
				font-weight: 300;
			}
		}
	}
	.header-edit {
		
	}
</style>
