<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="$store.state.app.collapse" :router="true">
			<template v-for="item in items">
				<template v-if="item.children">
					<el-submenu :index="item.index" :route="{name: item.name}" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.children">
							<el-submenu v-if="subItem.children" :index="subItem.index" :route="{name: subItem.name}" :key="subItem.index">
								<template slot="title">
									<i :class="subItem.icon"></i><span>{{ subItem.title }}</span>
								</template>
								<el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.index" :route="{name: threeItem.name}">
									{{ threeItem.title }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :route="{name: subItem.name}" :key="subItem.index">
								<template slot="title">
									<i :class="subItem.icon"></i><span>{{ subItem.title }}</span>
								</template>
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :route="{name: item.name}" :key="item.index">
						<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {Menu,Submenu,MenuItem,MenuItemGroup} from 'element-ui';
	Vue.use(Menu);
	Vue.use(Submenu);
	Vue.use(MenuItem);
	Vue.use(MenuItemGroup);

	import _kebabCase from 'lodash/kebabCase.js'
	import sidebar from '../json/side-bar.json'
	export default {
		data() {
			return {
				items: sidebar
			}
		},
		computed: {
			onRoutes() {
				return _kebabCase(this.$route.name);
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
	$menu-item-color: #2E3D4B;
	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 180px;
	}
	.sidebar .el-submenu__title {
		padding: 0;
	}
	.sidebar .el-submenu__title i, .sidebar .el-menu-item i {
		color: $menu-item-color;
		width: 16px;
		font-size: 16px;
	}

	.sidebar .el-menu {
		border-right: none;
	}

	.el-menu .iconfont {
		font-size: 18px;
		display: inline-block;
		padding: 0 4px;
		margin-right: 5px;
	}

	.el-submenu .el-menu-item {
		padding: 0 0 0 50px;
		min-width: 160px;
		color: $menu-item-color;
	}
</style>
