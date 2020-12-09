<template>
	<div class="my-home">
		<p>欢迎访问***管理，您可以快速访问：</p>
		<router-link to="/service-list">媒体服务列表</router-link>
		<router-link to="/room-list">教室列表</router-link>
		<router-link to="/user-list">账号管理</router-link>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		components: {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.my-home {
		margin-top: 50px;
		text-align: center;
		a {
			margin-right: 20px;
		}
	}
</style>
