<template>
	<el-container>
		<el-header>
			<v-head></v-head>
		</el-header>
		<el-container>
			<el-aside width="" :class="{'slide-bar-sollapse': $store.state.app.collapse}">
				<v-sidebar></v-sidebar>
			</el-aside>
			<el-main>
				<div class="el-main__wrapper">
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import Vue from 'vue'
	import {
		Container,
		Header,
		Aside,
		Main
	} from 'element-ui'
	Vue.use(Container)
	Vue.use(Header)
	Vue.use(Aside)
	Vue.use(Main)
	
	import vHead from '@/components/Header.vue'
	import vSidebar from '@/components/Sidebar.vue'
	// import axios from 'axios'
	export default {
		components: {
			vHead,
			vSidebar
		},
		methods: {
			
		}
	}
</script>

<style>
	.el-container {
		height: 100%;
	}
	.el-header {
		background-color: #2E3D4B;
		color: #fff;
		line-height: 60px;
	}
	.el-aside {
		overflow-x: hidden;
	}
	.slide-bar-sollapse {
		min-width: 64px;
		transition: left .3s ease-in-out;
	}
	.el-main {
		background-color: #F7F8F9;
		color: #2E3D4B;
		transition: left .3s ease-in-out;
	}
	.el-main__wrapper {
		position: relative;
		width: calc(100% - 40px);
		height: calc(100% - 40px);
		padding: 20px;
		background: #fff;
	}
</style>
