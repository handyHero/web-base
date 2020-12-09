<template>
	<el-date-picker
		v-model="time"
		type="daterange"
		align="right"
		unlink-panels
		range-separator="至"
		start-placeholder="开始时间"
		end-placeholder="结束时间"
		:picker-options="pickerOptions">
	</el-date-picker>
</template>

<script>
	import Vue from 'vue'
	import {
		DatePicker
	} from 'element-ui'
	Vue.use(DatePicker)

	export default {
		data() {
			const d = new Date()
			const now = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
			return {
				time: this.value,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = now;
							const start = new Date();
							start.setTime(now.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近两周',
						onClick(picker) {
							const end = now;
							const start = new Date();
							start.setTime(now.getTime() - 3600 * 1000 * 24 * 7 * 2);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = now;
							const start = new Date();
							start.setTime(now.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = now;
							const start = new Date();
							start.setTime(now.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				}
			}
		},
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			value: Array
		},
		watch: {
			value(newVal) {
				this.time = newVal
			},
			time(newVal) {
				this.$emit('change', newVal)
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
		width: 240px!important;
	}
</style>
