<template>
	<div>
		<!-- 标题 -->
		<div class="title">账号审核</div>

		<!-- 表格 -->
		<div>
			<el-table :data="tables[0].slice((currentPage - 1) * pagesize, currentPage * pagesize)" border style="width: 100%">
				<!-- id -->
				<el-table-column fixed prop="id" label="id" width="250">
					<template slot-scope="scope">
						{{ scope.row.id }}
					</template>
				</el-table-column>
				<!-- 用户名 -->
				<el-table-column prop="username" label="用户名" width="150"> </el-table-column>
				<!-- 密码 -->
				<el-table-column prop="password" label="密码" width="200"> </el-table-column>
				<!-- 身份证号 -->
				<el-table-column prop="idNumber" label="身份证号" width="300"> </el-table-column>
				<!-- 手机号 -->
				<el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
				<!-- 申请时间 -->
				<el-table-column prop="createTime" label="申请时间"> </el-table-column>
				<!-- 操作 -->
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick1(scope.row)" type="text" size="small" class="agree">通过</el-button>
						<el-button @click="handleClick11(scope.row)" type="text" size="small" class="disagree">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页器 -->
		<div style="margin-top: 15px">
			<el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pagesize" :total="tableData.length" layout="total, sizes, prev, pager, next, jumper"> </el-pagination>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	mounted() {
		this.getData()
	},
	methods: {
		// 通过按钮的事件
		handleClick1(row) {
			this.$confirm('是否通过？', '学位解锁', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				axios({
					method: 'put',
					url: 'http://localhost:8888//user/audit/' + row.id,
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					params: {
						mark: '0',
					},
				}).then((res) => {
					//请求成功后执行函数
					this.getData()
					//登录验证成功路由实现跳转
				})
			})
		},
		handleClick11(row) {
			this.$confirm('是否不通过？', '学位解锁', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				axios({
					method: 'put',
					url: 'http://localhost:8888//user/audit/' + row.id,
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					params: {
						mark: '1',
					},
				}).then((res) => {
					//请求成功后执行函数
					this.getData()
					//登录验证成功路由实现跳转
				})
			})
		},
		searchput() {
			this.searchContent = this.inputContent
			console.log(this.searchContent)
		},
		//每页条数改变时触发 选择一页显示多少行
		handleSizeChange: function (val) {
			this.pagesize = val
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage
		},
		getData() {
			axios({
				method: 'get',
				url: 'http://localhost:8888/user/audit',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
			}).then((res) => {
				//请求成功后执行函数
				this.tableData = res.data.data
				console.log(res.data.data)
				//登录验证成功路由实现跳转
			})
		},
	},
	rules: {},

	data() {
		return {
			tableData: [
				// 因为是审核界面，所有status全部为1，故需要从数据库中select为1的值
			],
			currentPage: 1,
			pagesize: 10,
			searchContent: '',
			inputContent: '',
		}
	},
	computed: {
		tables() {
			const search = this.searchContent
			//当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
			if (this.inputContent == '') {
				this.searchContent = ''
				this.currentPage = 1
				return [this.tableData, (this.count = this.tableData.length)]
			}
			if (search !== '') {
				return [
					this.tableData.filter((dataNews) => {
						return Object.keys(dataNews).some((key) => {
							return String(dataNews[key]).toLowerCase().indexOf(search) > -1
						})
					}),
					(this.count = this.tableData.filter((dataNews) => {
						return Object.keys(dataNews).some((key) => {
							return String(dataNews[key]).toLowerCase().indexOf(search) > -1
						})
					}).length),
				]
			}
			return [this.tableData, (this.count = this.tableData.length)]
		},
	},
}
</script>

<style>
.title {
	background-color: #fff;
	font-size: 30px;
	margin-bottom: 30px;
}

.searchinput {
	width: 500px;
	margin-bottom: 30px;
	margin-right: 10px;
}

.title {
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 10px;
}
</style>
