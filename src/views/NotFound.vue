<template lang="html">
	<div class="my-page-not-found">
		<div class="my-content__wrapper">
			<div class="my-content">
				<h2 class="not-found-title">404</h2>
				<p class="not-found-desc">抱歉，您访问的页面<em>失联</em>啦</p>
				<el-button @click="$router.go(-1)">返回上一页</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.my-content__wrapper {
		
	}
</style>
