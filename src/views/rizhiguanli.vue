<template>
	<div>
		<!-- 标题 -->
		<div class="title">日志管理</div>
		<!-- 搜索框 -->
		<el-input v-model="inputContent" class="searchinput" placeholder="请输入关键词进行查询" prefix-icon="el-icon-search">
			<el-button slot="append" class="searchbtn" @click="searchput">搜索</el-button>
		</el-input>

		<!-- 表格 -->
		<div>
			<el-table :data="tables[0].slice((currentPage - 1) * pagesize, currentPage * pagesize)" border style="width: 100%">
				<el-table-column fixed prop="id" label="userId" width="70"> </el-table-column>
				<el-table-column prop="ip" label="操作ip" width="115"> </el-table-column>
				<el-table-column prop="logType" label="请求方式" width="50"> </el-table-column>
				<el-table-column prop="methodName" label="方法名称" width="80"> </el-table-column>
				<el-table-column prop="clasName" label="操作类" width="65"> </el-table-column>
				<el-table-column prop="params" label="参数" width="250"> </el-table-column>
				<el-table-column prop="result" label="结果" width="250"> </el-table-column>
				<el-table-column prop="exception" label="异常" width="45"> </el-table-column>
				<el-table-column prop="startTime" label="开始时间" width="155"> </el-table-column>
				<el-table-column prop="endTime" label="结束时间" width="155"> </el-table-column>
				<el-table-column prop="duration" label="持续时间" width="50"> </el-table-column>
				<el-table-column prop="username" label="操作人员" width="90"> </el-table-column>
				<el-table-column prop="comment" label="操作名称" > </el-table-column>
			</el-table>
		</div>

		<!-- 日志详情表单 -->
		<el-dialog title="日志详情" :visible.sync="dialogVisible1" width="30%">
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="dialogVisible1 = false">取 消</el-button> -->
				<el-button type="primary" @click="update()">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 分页器 -->
		<div style="margin-top: 15px">
			<el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20, 25]" :page-size="pagesize" :total="tableData.length" layout="total, sizes, prev, pager, next, jumper"> </el-pagination>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			axios({
				method: 'get',
				url: 'http://localhost:8888/syslog/show',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
			}).then((res) => {
				this.tableData = res.data.data
				console.log(res.data.data)
			})
		},
		// 点击详情按钮
		details(index, row) {
			this.dialogVisible1 = true
		},
		// 详情弹框的确认按钮
		update() {
			this.dialogVisible1 = false
		},
		// 搜索框
		searchput() {
			this.searchContent = this.inputContent
			// console.log(this.searchContent)
		},
		//每页条数改变时触发 选择一页显示多少行
		handleSizeChange: function (val) {
			this.pagesize = val
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage
		},
	},
	rules: {},

	data() {
		return {
			tableData: [],
			currentPage: 1,
			pagesize: 10,
			searchContent: '',
			inputContent: '',
			dialogVisible1: false,
			form: {
				id: '',
				ip: '',
				logType: '',
				methodName: '',
				className: '',
				params: '',
				result: '',
				exception: '',
				startTime: '',
				endTime: '',
				duration: '',
				username: '',
				comment: '',
			},
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
