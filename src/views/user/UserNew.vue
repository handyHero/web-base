<template>
	<div>
		<el-form 
			:model="formData" 
			:rules="rules"
			ref="userForm" 
			label-width="100px"
			size="small"
			class="user-form"
			v-loading="loading">
			<el-form-item label="用户名" prop="name">
				<el-input v-model.trim="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model.trim="formData.phone"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				formData: {
					name: '',
					phone: ''
				},
				rules: {
					name: { required: true, message: '请输入用户名', trigger: 'blur' },
					phone: { required: true, message: '请输入手机号', trigger: 'blur' }
				},
				loading: false
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.user.add(this.formData).then(() => {
							Message.success('账号已添加')
							this.resetForm(formName)
							this.loading = false
						}).catch(e => {
							console.log(e)
							this.loading = false
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
			}
		}
	}
</script>

<style>
	.user-form {
		width: 300px;
	}
</style>
