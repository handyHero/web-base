<template>
	<div class="my-table">
		<div class="my-table__wrapper">
			<el-table 
				:data="data"
				:v-loading="loading"
				:max-height="maxHeight" 
				:size="size" 
				:align="align"
				style="width:100%;"
				stripe>
				<el-table-column 
					v-for="column in columns" 
					:prop="column.prop" 
					:label="column.label" 
					:width="column.width"
					:min-width="column.minWidth" 
					:sortable="column.sortable" 
					:fixed="column.fixed" 
					:key="column.prop" 
					:type="column.type"
					:formatter="formatColumn">
				</el-table-column>
				<el-table-column v-if="isShowHandle" label="操作" fixed="right">
					<template slot-scope="scope">
						<my-button v-if="handleList.edit" type="text" :label="editLable" :perms="getEditDisable(scope.row)" :size="size" @click="handleEdit(scope.$index, scope.row)" />
						<el-button v-if="handleList.detail" type="text" label="" :size="size" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
						<my-button v-if="handleList.delete" label="删除" :perms="permsDelete" :size="size" type="danger" @click="handleDelete(scope.$index, scope.row)" />
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="toolbar">
			<el-pagination 
				layout="total, sizes, prev, pager, next, jumper" 
				@size-change="changePageRequest"
				@current-change="refreshPageRequest" 
				:current-page="pageRequest.page"
				:page-size="pageRequest.page_size"
				:page-sizes="PAGE_SIZES"
				:total="total"
				:disabled="paginationDisable"
				style="float:right;">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import MyButton from "@/components/MyButton"
	import PAGE_SIZES from '@/json/pages.json'
	import { formatMediaType, formatClassType, formatActionType, formatRole, formatTime } from '@/js/helper/formatHelper'
	
	require('date-utils')
	
	export default {
		name: 'MyTable',
		components: {
			MyButton
		},
		props: {
			columns: Array,
			linkColumns: Array,
			data: Array,
			total: Number,
			permsEdit: String,
			permsDelete: String,
			size: {
				type: String,
				default: 'mini'
			},
			align: {
				type: String,
				default: 'left'
			},
			isShowHandle: {
				type: Boolean,
				default: false
			},
			handleList: {
				edit: {type: Boolean, default: false},
				delete: {type: Boolean, default: false},
				detail: {type: Boolean, default: false},
				offline: {type: Boolean, default: false}
			},
			editLable: {type: String, default: '编辑'},
			paginationDisable: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 分页信息
				pageRequest: {
					page: 1,
					page_size: PAGE_SIZES[0]
				},
				loading: false, // 加载标识
				maxHeight: 420,
				PAGE_SIZES
			}
		},
		methods: {
			// 分页查询
			findPage() {
				this.$emit('findPage', {
					pageRequest: this.pageRequest
				})
			},
			changePageRequest(pagesize) {
				this.pageRequest.page = 1
				this.pageRequest.page_size = pagesize
				this.findPage()
			},
			// 换页刷新
			refreshPageRequest(page) {
				this.pageRequest.page = page
				this.findPage()
			},
			// 编辑
			handleEdit(index, row) {
				this.$emit('handleEdit', {
					index: index,
					row: row
				})
			},
			getEditDisable(row) {
				try{
					if (row.role === 1) {
						return ''
					}
				}catch(e){
					return this.permsEdit
				}
				return this.permsEdit
			},
			// 详情
			handleDetail(index, row) {
				this.$emit('handleDetail', {
					index: index,
					row: row
				})
			},
			// 删除
			handleDelete(index, row) {
				this.delete(row.id)
			},
			// 删除操作
			delete(ids) {
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					let params = []
					let idArray = (ids + '').split(',')
					for (var i = 0; i < idArray.length; i++) {
						params.push({
							'id': idArray[i]
						})
					}
					let callback = res => {
						console.log(res)
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.findPage()
					}
					this.$emit('handleDelete', {
						params: params,
						callback: callback
					})
				}).catch(() => {})
			},
			formatColumn(row, column, cellValue) {
				let res = ''
				switch (column.property) {
					case 'ClassType':
						res = formatClassType(cellValue)
						break
					case 'StartTs':
						res = formatTime(cellValue)
						break
					case 'LeaseTs':
						res = formatTime(cellValue)
						break
					case 'Ts':
						res = formatTime(cellValue)
						break
					case 'MediaServerType':
						res = formatMediaType(cellValue)
						break
					case 'AllowedUids':
						res = cellValue ? cellValue.length : 0
						break
					case 'TokenUIDs':
						res = cellValue ? cellValue.length : 0
						break
					case 'LoadAvailable':
						res = `${100 - cellValue}%`
						break
					case 'LogType':
						res = formatActionType(cellValue)
						break
					case 'role':
						res = formatRole(cellValue)
						break
					default:
						res = cellValue
						break
				}
				return res
			},
			setHeight: async function () {
				await this.$nextTick(() => {
					this.maxHeight = this.$el.offsetHeight - 40
				})
			}
		},
		mounted() {
			this.refreshPageRequest(1)
			this.setHeight()
		}
	}
</script>

<style lang="scss">
	.my-table {
		flex: 1;
		.my-table__wrapper {
			width: 100%;
			height: calc(100% - 40px);
		}
		.el-table {
			z-index: 1;
			th.is-leaf{
				border: none;
			}
			td {
				border: none;
			}
		}
		.el-table--striped .el-table__body tr.el-table__row--striped td {
			background-color: #F9F9F9;
		}
	}
	.toolbar {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 10px 40px 40px 10px;
	}
</style>
