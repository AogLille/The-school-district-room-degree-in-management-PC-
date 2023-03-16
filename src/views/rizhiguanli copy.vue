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
				<!--日志编号 -->
				<el-table-column fixed prop="number" label="日志编号" width="250"> </el-table-column>
				<!-- 操作类型 -->
				<el-table-column prop="type" label="操作类型" width="150"> </el-table-column>
				<!-- 请求方式 -->
				<el-table-column prop="request_method" label="请求方式" width="120"> </el-table-column>
				<!-- 操作人员 -->
				<el-table-column prop="person" label="操作人员" width="150"> </el-table-column>
				<!-- 操作状态 -->
				<el-table-column prop="status" label="操作状态"> </el-table-column>
				<!-- 操作时间 -->
				<el-table-column prop="times" label="操作时间"> </el-table-column>
				<!-- 详情按钮 -->
				<el-table-column fixed="right" label="详情" width="150">
					<template slot-scope="scope">
						<el-button @click="details(scope.$index, scope.row)" type="text" size="small">详情</el-button>
					</template>
				</el-table-column>
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
export default {
	methods: {
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
			tableData: [
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
				{
					number: '11111',
					type: '增加',
					request_method: 'get',
					person: '大牛',
					status: '（操作状态）',
					times: '2099-12-31',
				},
			],
			currentPage: 1,
			pagesize: 10,
			searchContent: '',
			inputContent: '',
			dialogVisible1: false,
			form: {
				number: '',
				type: '',
				request_method: '',
				person: '',
				status: '',
				times: '',
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
