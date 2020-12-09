<template>
	<div class="flex-content">
		<el-form
			size="mini"
			:inline="true"
			:model="queryData" 
			ref="queryForm"
			class="demo-form-inline"
			label-width="100px">
			<el-form-item label="日志类型" prop="log_type">
				<el-select v-model="queryData.log_type" placeholder="选择日志类型">
					<el-option v-for="item in ACTION_LOG" :key="item.code" :label="item.title" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="操作人手机号" prop="op_phone">
				<el-input v-model.trim="queryData.op_phone" placeholder="输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="操作人ID" prop="op_uid">
				<el-input v-model.trim="queryData.op_uid" placeholder="输入ID"></el-input>
			</el-form-item>
			<el-form-item label="选择日期" prop="times">
				<time-selector v-model="times"></time-selector>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onQuery">查询</el-button>
				<el-button type="primary" @click="resetForm('queryForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<my-table
			:data="data" 
			:columns="columns"
			:total="totalSize"
			@findPage="findPage">
		</my-table>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { DatePicker, Select, Option } from 'element-ui'
	Vue.use(DatePicker)
	Vue.use(Select)
	Vue.use(Option)
	import MyTable from '@/components/MyTable'
	import TimeSelector from '@/components/TimeSelector'
	
	import PAGE_SIZES from '@/json/pages.json'
	import ACTION_LOG from '@/json/action-log.json'
	import _merge from 'lodash/merge.js'
	import myUtils from '@/js/utils'
	
	export default {
		components:{
			MyTable,
			TimeSelector
		},
		data() {
			return {
				queryData: {
					log_type: "",
					op_phone: "",
					op_uid: "",
					start_ts: "",
					end_ts: ""
				},
				pageRequest: {
					page: 1,
					page_size: PAGE_SIZES[0]
				},
				times: undefined,
				data: [],
				totalSize: 0,
				ACTION_LOG,
				columns: [
					{ prop:"Ts", label:"创建时间", minWidth:120, sortable:false },
					{ prop:"OperPhone", label:"操作人手机号", minWidth:120, sortable:false },
					{ prop:"OperName", label:"操作人姓名", minWidth:120, sortable:false },
					{ prop:"LogType", label:"日志类型", minWidth:120, sortable:false },
					{ prop:"OperUID", label:"操作人ID", minWidth:120, sortable:false }
				]
			}
		},
		computed: {
			
		},
		watch: {
			times(newVal) {
				if(newVal) {
					this.queryData.start_ts = newVal[0].getTime()/1000
					this.queryData.end_ts = newVal[1].getTime()/1000 + 3600 * 24
				} else {
					this.queryData.start_ts = ""
					this.queryData.end_ts = ""
				}
			}
		},
		methods: {
			getList(data) {
				this.loading = true
				this.$api.user.actionlog(myUtils.utils.compactPlainObject(_merge(data, this.queryData))).then(res => {
					this.data = res.actions || []
					this.totalSize = res.page.total_count
					this.loading = false
				}).catch(e => {
					console.log(e)
					this.loading = false
				})
			},
			onQuery() {
				this.pageRequest.page = 1
				this.findPage()
			},
			findPage(data) {
				if(data) {
					this.pageRequest = data.pageRequest
				}
				this.getList(this.pageRequest)
			},
			resetForm(formName) {
				this.times = undefined
				this.$refs[formName].resetFields()
			}
		},
		mounted() {
			// this.findPage()
		}
	}
</script>

<style>
</style>
