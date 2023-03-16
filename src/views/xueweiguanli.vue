<template>
	<div>
		<!-- 标题 -->
		<div class="title">学位管理</div>
		<!-- 搜索框 -->
		<el-input v-model="inputContent" class="searchinput" placeholder="请输入姓名或房产证号进行查询" prefix-icon="el-icon-search">
			<el-button slot="append" class="searchbtn" @click="searchput">搜索</el-button>
		</el-input>
		<!-- 添加 -->
		<el-button type="primary" @click="dialogVisible = true">新建</el-button>
		<!-- 通过excel上传 -->
		<el-upload class="upload-demo" ref="upload" action="" :auto-upload="false" :file-list="fileList" :on-change="handleChange" multiple :show-file-list="false">
			<el-button type="success">导入excel表格</el-button>
		</el-upload>
		<!-- 添加数据的表单弹框 -->
		<el-dialog title="学位管理" :visible.sync="dialogVisible" width="30%">
			<!-- 添加数据的表单 -->
			<el-form ref="form" :model="form" label-width="80px">
				<!-- 添加数据的房产证号 -->
				<el-form-item label="房产证号" required="">
					<el-input v-model="form.id" placeholder="请输入房产证号"></el-input>
				</el-form-item>
				<!-- 添加数据的地址 -->
				<el-form-item label="地址" required>
					<el-input v-model="form.address" placeholder="请输入地址"></el-input>
				</el-form-item>
				<!-- 添加数据的所属学区 -->
				<el-form-item label="学校代号" required>
					<el-input v-model="form.schoolId" placeholder="请输入所属学区"></el-input>
				</el-form-item>
				<!-- 添加数据的身份证 -->
				<el-form-item label="身份证" required>
					<el-input v-model="form.idNumber" placeholder="请输入身份证"></el-input>
				</el-form-item>
			</el-form>
			<!-- 增加功能表单的两个按钮 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="add()">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 表格 -->
		<div>
			<el-table :data="tables[0].slice((currentPage - 1) * pagesize, currentPage * pagesize)" border style="width: 100%">
				<!-- 房产证号 -->
				<el-table-column fixed prop="id" label="房产证号" width="200">
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
				<el-table-column prop="idNumber" label="身份证号" width="170"> </el-table-column>
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
import moment from 'moment'
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
					}).then((res) => {
						this.getData()
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
					}).then((res) => {
						this.getData()
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
					}).then((res) => {
						this.getData()
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
					}).then((res) => {
						this.getData()
					})
				})
				.catch(() => {})
		},
		searchput() {
			// 获得搜索框的值
			this.searchContent = this.inputContent
		},
		add() {
			axios({
				method: 'post',
				url: 'http://localhost:8888/house',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
				data: {
					id: this.form.id,
					address: this.form.address,
					primaryDegree: this.form.primaryDegree,
					primaryTime: this.form.primaryTime,
					middleDegree: this.form.middleDegree,
					middleTime: this.form.middleTime,
					schoolId: this.form.schoolId,
					idNumber: this.form.idNumber,
				},
			}).then((res) => {
				//请求成功后执行函数
				if (this.tableData == undefined) {
					this.tableData = new Array()
				}
				// 定义一个对象，并将表单的数据赋给它，加入到对象数组中
				let obj = {}
				;(obj.id = this.form.id), (obj.address = this.form.address), (obj.idNumber = this.form.idNumber), (obj.schoolId = this.form.schoolId), (obj.name = this.form.name), (obj.primaryDegree = this.form.primaryDegree), (obj.primaryTime = this.form.primaryTime), (obj.middleDegree = this.form.middleDegree), (obj.middleTime = this.form.middleTime), (obj.status = '0')
				this.tableData.push(obj)
				this.dialogVisible = false
			})
		},
		//每页条数改变时触发 选择一页显示多少行
		handleSizeChange: function (val) {
			this.pagesize = val
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage
		},
		// 下面是通过excel上传
		// 采集excel数据
		handleChange(file, fileList) {
			this.fileList = [fileList[fileList.length - 1]] 
			this.file = file.raw
			let reader = new FileReader()
			let _this = this
			reader.readAsArrayBuffer(this.file)
			reader.onload = function () {
				let buffer = reader.result
				let bytes = new Uint8Array(buffer)
				let length = bytes.byteLength
				let binary = ''
				for (let i = 0; i < length; i++) {
					binary += String.fromCharCode(bytes[i])
					// console.log(binary);
				}
				let XLSX = require('xlsx')
				let wb = XLSX.read(binary, {
					type: 'binary',
					cellDates: true,
					cellText: false,
				})
				let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
					defval: 'null', //单元格为空时的默认值
					raw: false,
					dateNF: 'yyyy-mm-dd',
				})
				console.log(outdata)
				console.log(typeof outdata)

				axios({
					method: 'post',
					url: 'http://localhost:8888/house/uploadExcel',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					data: outdata,
				}).then((res) => {
					this.getData()
				})
			}
		},
		convertExcelDateFormat: function (row, columnName) {
			//日期转换
			var date = row[columnName]
			if (date === undefined || date === null || date === '') {
				return null
			}
			//非时间格式问题  返回Invalid date
			let retFormat = moment(date).format('YYYY-MM-DD')
			if (retFormat === 'Invalid date') {
				return retFormat
			}
			return moment(date).add(1, 'days').format('YYYY-MM-DD')
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
				shoolId: '',
				name: '',
				primaryDegree: '',
				primaryTime: '',
				middleDegree: '',
				middleTime: '',
				idNumber: '',
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
			// 下面是通过excel表格上传
			fileList: [],
			file: '',
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

.upload-demo {
	margin-bottom: 10px;
}
</style>
