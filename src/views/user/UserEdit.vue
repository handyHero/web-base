<template>
	<el-dialog
		title="编辑账号"
		width="380px"
		:visible.sync="selfVisible"
		:close-on-click-modal="false">
		<el-form
			v-model="formData"
			ref="userForm"
			label-width="60px"
			size="small">
			<el-form-item label="用户名" prop="name">
				<el-input v-model.trim="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="role">
				<el-select v-model="formData.role">
					<el-option v-for="item in roleOptions" :key="item.code" :label="item.title" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="selfVisible = false">取 消</el-button>
			<el-button size="small" type="primary" @click="onEdit('userForm')" v-loading="loading">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import Vue from 'vue'
	import { Dialog, Message } from 'element-ui'
	Vue.use(Dialog)
	import { getRoleOptions } from '@/js/helper/optionHelper.js'
	export default {
		data() {
			return {
				formData: {
					name: '',
					role: '',
					uid: ''
				},
				loading: false,
				selfVisible: this.visible,
				roleOptions: []
			}
		},
		props: {
			visible: Boolean,
			data: Object,
			refresh: Boolean
		},
		watch: {
			selfVisible(newVal) {
				this.$emit('update:visible', newVal)
			},
			visible(newVal) {
				this.selfVisible = newVal
			},
			data(newVal) {
				this.formData = Object.assign({}, newVal)
			}
		},
		methods: {
			onEdit(formName) {
				this.loading = true
				this.$api.user.modify(this.formData).then(() => {
					Message.success('账号已修改~')
					this.resetForm(formName)
					this.loading = false
					this.selfVisible = false
					this.$emit('update:refresh', true)
				}).catch(e => {
					console.log(e)
					this.loading = false
				})
			},
			getRoles() {
				this.roleOptions = getRoleOptions()
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
			}
		},
		mounted() {
			this.getRoles()
		}
	}
</script>

<style>
</style>
