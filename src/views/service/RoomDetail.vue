<template>
	<div class="flex-content" v-loading="loading">
		<!-- <div class="my-main-tab">
			<a @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</a>
		</div> -->
		<el-form size="mini" :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="课程号">
				<el-input v-model.trim="queryData.courseid" placeholder="输入课程号" clearable=""></el-input>
			</el-form-item>
			<el-form-item label="房间号">
				<el-input v-model.trim="queryData.roomid" placeholder="输入房间号" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onQuery" :disabled="queryDisable">查询</el-button>
			</el-form-item>
		</el-form>
		<div v-if="hasData" class="my-service-detail">
			<div class="service-detail-content">
				<span>课程类型：{{ getClassType(roomDetail.ClassType) }}</span>
				<span>旁观人数：{{ roomDetail.ObserverCount }}</span>
				<span>用户人数：{{ roomDetail.UserCount }}</span>
				<span>最大上台人数：{{ roomDetail.StageCount }}</span>
				<span>课程开始时间：{{ getTime(roomDetail.StartTs) }}</span>
				<span>老师ID：{{ roomDetail.TeacherID }}</span>
				<span>助教ID：{{ roomDetail.AssistantUID }}</span>
				<span>班级人数：{{ getLength(roomDetail.AllowedUids) }}</span>
				<span>进入过的人数：{{ getLength(roomDetail.TokenUIDs) }}</span>
				<span>课程ID：{{ roomDetail.OrderID }}</span>
				<span>房间号：{{ roomDetail.RoomID }}</span>
			</div>
		</div>
		<my-table
			:data="data" 
			:columns="columns"
			:total="totalSize"
			:pagination-disable="paginationDisable">
		</my-table>
		<el-dialog
			:visible.sync="moveDialogVisible" 
			:close-on-click-modal="false">
			<span>迁移</span>
			<div slot="footer" class="dialog-footer">
				<el-button @click="moveDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="moveDialogVisible = false" :loading="moveLoading">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import MyTable from '@/components/MyTable'
	import { formatClassType, formatMediaType, formatTime, intToip } from '@/js/helper/formatHelper'
	import _get from 'lodash/get.js'
	import _find from 'lodash/find.js'
	import _reduce from 'lodash/reduce.js'
	import _isEmpty from 'lodash/isEmpty.js'
	
	export default {
		components:{
			MyTable
		},
		data() {
			return {
				queryData: {
					courseid: undefined,
					roomid: undefined
				},
				data: [],
				roomDetail: undefined,
				totalSize: 0,
				columns: [
					{prop:"hostname", label:"主机名字", minWidth:120, sortable:false},
					{prop:"internalIP", label:"IP端口", minWidth:120, sortable:false},
					{prop:"mediaType", label:"媒体类型", minWidth:120, sortable:false}
				],
				loading: false,
				moveDialogVisible : false,
				moveLoading: false,
				paginationDisable: true
			}
		},
		computed: {
			queryDisable() {
				return !(this.queryData.courseid || this.queryData.roomid)
			},
			hasData() {
				return !this.loading && this.roomDetail
			}
		},
		methods: {
			getList() {
				this.loading = true
				this.queryData.roomid = parseInt(this.queryData.roomid) || undefined
				this.$api.service.roomdetail(this.queryData).then(res => {
					this.roomDetail = res.room
					const addrs = res.room.Addrs || []
					const sched = res.room.SchedRes
					const hostnames = res.hostnames
					const initAddrs = [{
						hostname: sched.MsgServerExIP,
						internalIP: `${sched.MsgServerExIP}:${sched.MsgServerExPort}`,
						mediaType: '消息服务'
					}]
					this.data = _reduce(addrs, (res, val) => {
						let arr = {}
						let ip = intToip(val.InternalIP)
						arr.hostname = _get(_find(hostnames,['ip', ip]), 'hostname')
						arr.internalIP = val.InternalPort === 0 ? '' : `${ip}:${val.InternalPort}`
						arr.mediaType = formatMediaType(val.Type)
						res.push(arr)
						return res
					}, initAddrs)
					this.loading = false
				}).catch(e => {
					console.log(e)
					this.loading = false
				})
			},
			onQuery() {
				this.getList()
			},
			getClassType(data) {
				let res = formatClassType(data)
				return res
			},
			getTime(data) {
				let res = formatTime(data)
				return res
			},
			getLength(data) {
				if(data){
					return data.length
				}
				return 0
			}
		},
		mounted() {
			let params = this.$route.query
			if(!_isEmpty(params)) {
				this.queryData.roomid = params.roomid
				this.getList()
			} else {
				return
			}
		}
	}
</script>

<style>
</style>
