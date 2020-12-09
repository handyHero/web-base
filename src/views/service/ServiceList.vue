<template>
	<div v-loading="loading" class="flex-content">
		<my-table
			:data="data" 
			:columns="columns"
			:total="totalSize"
			:is-show-handle="true"
			:handle-list="handleList"
			@handleDetail="handleDetail"
			@handleEdit="handleOffline"
			@findPage="findPage"
			editLable="下架"
			permsOffline="my:user:offline1">
		</my-table>
	</div>
</template>

<script>
	import { Message, MessageBox } from 'element-ui'
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
					{prop:"Hostname", label:"主机名字", minWidth:150},
					{prop:"InternalIP", label:"IP", minWidth:100},
					{prop:"InternalPort", label:"端口", minWidth:80},
					{prop:"MediaServerType", label:"媒体类型", minWidth:80},
					{prop:"TotalRoomCount", label:"房间数", minWidth:80},
					{prop:"TotalClassMemberCount", label:"上台人数", minWidth:80},
					{prop:"TotalCount", label:"在线总人数", minWidth:100},
					{prop:"LoadAvailable", label:"负载", minWidth:80}
				],
				handleList: {
					detail: true,
					edit: true
				},
				loading: false
			}
		},
		methods: {
			getList(data) {
				this.loading = true
				this.$api.service.list(data).then(res => {
					this.data = res.services || []
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
			handleOffline(params) {
				
				const row = params.row
				console.log(row)
				let data = {
					internal_ip: row.InternalIP,
					internal_port: row.InternalPort,
					offline: 0
				}
				MessageBox.confirm(`您将要下架主机名字为${row.Hostname}的媒体服务, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true
					this.$api.service.offline(data).then(res => {
						console.log(res)
						Message.success('已下架~')
						this.loading = false
					}).catch(e => {
						console.log(e)
						this.loading = false
					})
					
				}).catch(() => {
					Message.info('已取消下架~')        
				});
				
			},
			handleDetail(params) {
				const row = params.row
				let data = {
					internalip: row.InternalIP,
					internalport: row.InternalPort,
					media_type: row.MediaServerType
				}
				this.$router.push({ path: 'service-detail', query: data})
			}
		},
		mounted() {
			// this.getList()
		}
	}
</script>

<style>
</style>
