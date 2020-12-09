<template>
	<div class="flex-content" ref="userList">
		<el-form
			size="mini"
			:inline="true"
			:model="queryData" 
			ref="queryForm"
			class="demo-form-inline"
			label-width="80px">
			<el-form-item label="用户编号" prop="uid">
				<el-input v-model.trim="queryData.uid" placeholder="输入用户编号" clearable=""></el-input>
			</el-form-item>
			<el-form-item label="用户名" prop="name">
				<el-input v-model.trim="queryData.name" placeholder="输入用户名" clearable=""></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model.trim="queryData.phone" placeholder="输入手机号" clearable></el-input>
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
			:is-show-handle="true"
			:handle-list="handleList"
			@handleEdit="handleEdit"
			@findPage="findPage"
			permsEdit="my:user:edit">
		</my-table>
		<user-edit
			:visible.sync="dialogEditVisible"
			:data = "editForm"
			:refresh.sync = "refreshFlag">
		</user-edit>
	</div>
</template>

<script>
	import MyTable from '@/components/MyTable'
	import UserEdit from './UserEdit'
	import PAGE_SIZES from '@/json/pages.json'
	import _merge from 'lodash/merge.js'
	import myUtils from '@/js/utils'
	
	export default {
		components:{
			MyTable,
			UserEdit
		},
		data() {
			return {
				queryData: {
					uid: "",
					name: "",
					phone: "",
					role: -1
				},
				data: [],
				totalSize: 0,
				handleList: {
					edit: true
				},
				pageRequest: {
					page: 1,
					page_size: PAGE_SIZES[0]
				},
				columns: [
					{prop:"uid", label:"用户编号", minWidth:120, sortable:false},
					{prop:"name", label:"用户名", minWidth:120, sortable:false},
					{prop:"phone", label:"手机号", minWidth:120, sortable:false},
					{prop:"role", label:"角色", minWidth:120, sortable:false}
				],
				editForm: {},
				dialogEditVisible: false,
				refreshFlag: false
			}
		},
		watch: {
			refreshFlag(newVal) {
				if(newVal) {
					this.findPage()
					this.refreshFlag = false
				}
			}
		},
		methods: {
			getList(data) {
				this.loading = true
				if(this.queryData.uid) this.queryData.uid = parseInt(this.queryData.uid)
				this.$api.user.list(myUtils.utils.compactPlainObject(_merge(data, this.queryData))).then(res => {
					this.data = res.users || []
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
			},
			handleEdit(row) {
				this.editForm = row.row
				this.dialogEditVisible = true
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
