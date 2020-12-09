<template>
	<div v-loading="loading" class="flex-content">
		<mytable
			:data="data" 
			:columns="columns"
			:total="totalSize"
			:is-show-handle="true"
			:handle-list="handleList"
			@handleDetail="handleDetail"
			@findPage="findPage">
		</mytable>
	</div>
</template>

<script>
	import MyTable from '@/components/MyTable'
	export default {
		components:{
			MyTable
		},
		data() {
			return {
				data: [],
				totalSize: 0,
				columns: [
					{prop:"OrderID", label:"课程号", minWidth:170},
					{prop:"RoomID", label:"房间号", minWidth:80},
					{prop:"ClassType", label:"课程类型", minWidth:80},
					{prop:"TeacherID", label:"老师ID", minWidth:100},
					{prop:"AllowedUids", label:"班级人数", minWidth:80},
					{prop:"UserCount", label:"在线用户数", minWidth:80},
					{prop:"StageCount", label:"上台人数", minWidth:80},
					{prop:"StartTs", label:"开始时间", minWidth:120}
				],
				handleList: {
					detail: true
				},
				loading: false
			}
		},
		methods: {
			getList(data) {
				this.loading = true
				this.$api.service.roomlist(data).then(res => {
					this.data = res.rooms || []
					this.totalSize = res.page.total_count
					this.loading = false
				}).catch(e => {
					console.log(e)
					this.loading = false
				})
			},
			findPage: function (data) {
				this.getList(data.pageRequest)
			},
			handleDetail(params) {
				const row = params.row
				const data = {
					roomid: row.RoomID
				}
				this.$router.push({ path: 'room-detail', query: data})
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
