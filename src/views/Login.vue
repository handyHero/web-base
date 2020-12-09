<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">
				<span class="icon"><img src="../assets/image/logo.png" /></span>***后台管理
			</div>
			<el-form
				ref="formData" 
				label-width="0px" 
				class="ms-content" 
				:model="formData" 
				:rules="rules">
				<el-form-item prop="phone">
					<el-input 
						placeholder="请输入手机号"
						v-model="formData.phone"
						autocomplete="on">
						<i slot="prefix" class="el-input__icon el-icon-user"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input type="password" 
						placeholder="请输入密码" 
						v-model="formData.pwd" 
						@keyup.enter.native="login()"
						autocomplete="off">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="login('formData')" :loading="loginPending">{{ loginPending ? '登录中' : '登录' }}</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import router from '@/router'
	import md5 from 'blueimp-md5'
	import {setItem} from '@/js/helper/storageHelper.js'

	export default {
		name: 'Login',
		data() {
			var validatePhone = (rule, value, callback) => {
				if(value){
					if(!/^1\d{10}$/.test(value)){
						callback(new Error('请输入正确的手机号'))
					}else{
						callback()
					}
				}else{
					callback(new Error('请输入手机号'))
				}
			}
			return {
				loginPending: false,
				formData: {
					phone: '',
					pwd: ''
				},
				rules: {
					phone: [{validator: validatePhone, trigger: 'blur'}],
					pwd: [{required: true, message: '请输入密码', trigger: 'blur'}]
				}
			}
		},
		methods: {
			login(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loginPending = true
						this.$api.login.login({
							phone: this.formData.phone,
							pwd: md5(this.formData.pwd)
						}).then(res => {
							this.loginPending = false
							if(res.code == 0) {
								let millisecond = new Date().getTime()
								let expiresTime = new Date(millisecond + 60 * 60 * 12 * 1000)	//cookie保存12小时
								Cookies.set('uid', res.uid)
								Cookies.set('token', res.token, {
									expires: expiresTime,
								});
								setItem('user', res)
								switch (res.role){
									case 1:
										this.$store.commit('setPerms', ['my:user:edit','my:user:offline'])
										break;
									case 2:
										this.$store.commit('setPerms', [])
										break;
									default:
										break;
								}
								router.push('/home')
							}
						}).catch(e => {
							console.log(e)
							this.loginPending = false
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background: url(../assets/image/login/login-bg.png) no-repeat;
		background-size: 100% 100%;

		button {
			width: 100%;
			height: 36px;
			margin-bottom: 10px;
			font-weight: normal;
			padding: 10px 20px;
		}
	}

	.ms-title {
		width: 100%;
		line-height: 40px;
		text-align: center;
		font-size: 24px;
		color: #2E3D4B;
	}

	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 400px;
		margin: -165px 0 0 -215px;
		padding: 40px 0 0;
		border-radius: 5px;
		background: #fff;
		overflow: hidden;
		box-shadow: 0px 4px 31px 0px rgba(32, 112, 183, 0.29);

		.icon {
			display: inline-block;
			width: 40px;
			margin-right: 10px;

			img {
				width: 100%;
				vertical-align: middle;
			}
		}
	}

	.ms-content {
		padding: 37px 55px 33px;
	}
</style>
