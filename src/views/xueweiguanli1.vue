<template>
	<div>
		<!-- 标题 -->
		<div class="title">学位管理</div>
		<!-- 搜索框 -->
		<el-input v-model="inputContent" class="searchinput" placeholder="请输入姓名或房产证号进行查询" prefix-icon="el-icon-search">
			<el-button slot="append" class="searchbtn" @click="searchput">搜索</el-button>
		</el-input>

		<!-- 表格 -->
		<div>
			<el-table :data="tables[0].slice((currentPage - 1) * pagesize, currentPage * pagesize)" border style="width: 100%">
				<!-- 房产证号 -->
				<el-table-column fixed prop="id" label="房产证号" width="250">
					<!-- 进行判断是否对数据进行修改或新增数据，通过status的值，如果为1，则增加待审核的样式 -->
					<template slot-scope="scope">
						{{ scope.row.id }}
						<el-tag type="danger" v-if="scope.row.audit == '1'">待审核</el-tag>
					</template>
				</el-table-column>
				<!-- 地址 -->
				<el-table-column prop="address" label="地址" width="150"> </el-table-column>
				<!-- 所属学区 -->
				<el-table-column prop="schoolId" label=" 学校代号" width="150"> </el-table-column>
				<!-- 户主姓名 -->
				<el-table-column prop="idNumber" label="身份证号" width="120"> </el-table-column>
				<!-- 小学 -->
				<el-table-column prop="primaryDegree" label="小学" width="100"> </el-table-column>
				<!-- 小学解锁时间 -->
				<el-table-column prop="primaryTime" label="解锁时间"> </el-table-column>
				<!-- 小学的操作 -->
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick1(scope.row)" type="text" size="small">锁定</el-button>
						<el-button @click="handleClick11(scope.row)" type="text" size="small">解锁</el-button>
					</template>
				</el-table-column>
				<!-- 初中 -->
				<el-table-column prop="middleDegree" label="初中" width="100"> </el-table-column>
				<!-- 初中解锁时间 -->
				<el-table-column prop="middleTime" label="解锁时间"> </el-table-column>
				<!-- 小学的操作 -->
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick2(scope.row)" type="text" size="small" class="disagree">锁定</el-button>
						<el-button @click="handleClick22(scope.row)" type="text" size="small" class="agree">解锁</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页器 -->
		<div style="margin-top: 15px">
			<el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20, 25]" :page-size="pagesize" :total="tableData.length" layout="total, sizes, prev, pager, next, jumper"> </el-pagination>
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
		// 小学的锁定操作
		handleClick1(row) {
			this.$confirm('此操作将将解锁学位锁定, 是否继续?', '学位解锁', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(({}) => {
					row.primaryDegree = '锁定'
					axios({
						method: 'put',
						url: 'http://localhost:8888/house',
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
						},
						data: {
							id: row.id,
							address: row.address,
							idNumber: row.idNumber,
							primaryDegree: row.primaryDegree,
							primaryTime: row.primaryTime,
							middleDegree: row.middleDegree,
							middleTime: row.middleTime,
							schoolId: row.schoolId,
						},
					})
				})
				.catch(() => {})
		},
		getData() {
			axios({
				method: 'get',
				url: 'http://localhost:8888/house/all',
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
		// 小学的解锁操作
		handleClick11(row) {
			this.$confirm('此操作将将解锁学位锁定, 是否继续?', '学位解锁', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					row.primaryTime = null
					row.primaryDegree = '未锁定'
					axios({
						method: 'put',
						url: 'http://localhost:8888/house',
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
						},
						data: {
							id: row.id,
							address: row.address,
							idNumber: row.idNumber,
							primaryDegree: row.primaryDegree,
							primaryTime: row.primaryTime,
							middleDegree: row.middleDegree,
							middleTime: row.middleTime,
							schoolId: row.schoolId,
						},
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
		// 中学的锁定操作
		handleClick2(row) {
			this.$confirm('此操作将将解锁学位锁定, 是否继续?', '学位解锁', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(({}) => {
					row.middleDegree = '锁定'
					axios({
						method: 'put',
						url: 'http://localhost:8888/house',
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
						},
						data: {
							id: row.id,
							address: row.address,
							idNumber: row.idNumber,
							primaryDegree: row.primaryDegree,
							primaryTime: row.primaryTime,
							middleDegree: row.middleDegree,
							middleTime: row.middleTime,
							schoolId: row.schoolId,
						},
					})
				})
				.catch(() => {})
		},
		// 中学的解锁操作
		handleClick22(row) {
			this.$confirm('此操作将将解锁学位锁定, 是否继续?', '学位解锁', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					row.middleTime = null
					row.middleDegree = '未锁定'
					axios({
						method: 'put',
						url: 'http://localhost:8888/house',
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
						},
						data: {
							id: row.id,
							address: row.address,
							idNumber: row.idNumber,
							primaryDegree: row.primaryDegree,
							primaryTime: row.primaryTime,
							middleDegree: row.middleDegree,
							middleTime: row.middleTime,
							schoolId: row.schoolId,
						},
					})
				})
				.catch(() => {})
		},
		searchput() {
			// 获得搜索框的值
			this.searchContent = this.inputContent
		},
		add() {
			if (this.tableData == undefined) {
				this.tableData = new Array()
			}
			// 定义一个对象，并将表单的数据赋给它，加入到对象数组中
			let obj = {}
			;(obj.number = this.form.number), (obj.address = this.form.address), (obj.school_district = this.form.school_district), (obj.name = this.form.name), (obj.primary = this.form.primary), (obj.primary_date = this.form.primary_date), (obj.junior = this.form.junior), (obj.junior_date = this.form.junior_date), (obj.status = '1')
			this.tableData.push(obj)
			this.dialogVisible = false
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
				// 0 表示不需要审核（未修改的数据）1表示需要审核（修改的数据和新增加的数据），初始化时在数据库中select status=0 的数据即可
			],
			currentPage: 1,
			pagesize: 10,
			searchContent: '',
			inputContent: '',
			dialogVisible: false,
			// 新建功能表单的初始值
			form: {
				id: '',
				address: '',
				school_district: '',
				name: '',
				primaryDegree: '',
				primaryTime: '',
				middleDegree: '',
				middleTime: '',
			},
			options: [
				{
					value: '锁定',
					label: '锁定',
				},
				{
					value: '未锁定',
					label: '未锁定',
				},
			],
			value: '',
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

.el-tag {
	float: right;
}
</style>
