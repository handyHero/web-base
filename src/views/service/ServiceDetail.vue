<template>
	<div class="flex-content" v-loading="loading">
		<div class="my-main-tab">
			<router-link to="/service-list"><i class="el-icon-arrow-left"></i> 媒体服务列表</router-link>
		</div>
		<div class="my-service-detail">
			<p class="service-detail-title">主机名字：{{ service_data.Hostname }}</p>
			<div class="service-detail-content">
				<span>服务地址：{{ `${service_data.InternalIP}:${service_data.InternalPort}` }}</span>
				<span>媒体类型：{{ media_type }}</span>
				<span>房间数：{{ service_data.TotalRoomCount }}</span>
				<span>上台数：{{ service_data.StageCount }}</span>
				<span>班级学生人数：{{ service_data.TotalClassMemberCount }}</span>
				<span>在线总人数：{{ service_data.TotalCount }}</span>
			</div>
		</div>
		<my-table
			:data="room_data" 
			:columns="columns"
			:total="totalSize"
			:pagination-disable="paginationDisable"
			:is-show-handle="true"
			:handle-list="handleList"
			@handleDetail="handleDetail">
		</my-table>
	</div>
</template>

<script>
	import MyTable from '@/components/MyTable'
	import { formatMediaType } from '@/js/helper/formatHelper'
	export default {
		components:{
			MyTable
		},
		data() {
			return {
				room_data: [],
				service_data: [],
				media_type: '',
				totalSize: 0,
				loading: false,
				paginationDisable: true,
				handleList: {
					detail: true
				},
				columns: [
					{prop:"OrderID", label:"课程id", minWidth:180},
					{prop:"RoomID", label:"房间号", minWidth:80},
					{prop:"ClassType", label:"课程类型", minWidth:100},
					{prop:"AllowedUids", label:"班级人数", minWidth:80},
					{prop:"StageCount", label:"上台人数", minWidth:80},
					{prop:"StartTs", label:"开课时间", minWidth:120},
					{prop:"UserCount", label:"当前人数", minWidth:80},
					{prop:"TokenUIDs", label:"进入过人数", minWidth:80}
				]
			}
		},
		watch: {
			'service_data.MediaServerType'(newVal) {
				if(newVal) {
					this.media_type = formatMediaType(newVal)
				}
			}
		},
		methods: {
			getList(data) {
				this.loading = true
				this.$api.service.detail(data).then(res => {
					this.room_data = res.rooms || []
					this.service_data = res.service
					this.loading = false
				}).catch(e => {
					console.log(e)
					this.loading = false
				})
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
			let params = this.$route.query
			if(params) {
				params.internalport = parseInt(params.internalport)
				params.media_type = parseInt(params.media_type)
				this.getList(params)
			} else {
				return
			}
		}
	}
</script>

<style lang="scss">
	.my-main-tab {
		margin-bottom: 20px;
		a{
			color: rgba(0,0,0,.45);
			cursor: pointer;
		}
	}
	.my-service-detail {
		margin-bottom: 30px;
		.service-detail-title {
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: 500;
		}
		.service-detail-content {
			span {
				display: inline-block;
				width: 280px;
				line-height: 25px;
			}
		}
	}
</style>
