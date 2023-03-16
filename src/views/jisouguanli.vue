<template>
	<div>
		<!-- 标题 -->
		<div class="title">机构管理</div>
		<!-- 搜索框 -->
		<el-input v-model="inputContent" class="searchinput" placeholder="请输入学校编号进行查询" prefix-icon="el-icon-search">
			<el-button slot="append" class="searchbtn" @click="searchput">搜索</el-button>
		</el-input>
		<!-- 添加 -->
		<el-button type="primary" @click="dialogVisible = true">新建</el-button>
		<!-- 添加数据的表单弹框 -->
		<el-dialog title="机构管理" :visible.sync="dialogVisible" width="30%">
			<!-- 添加数据的表单 -->
			<el-form ref="form" :model="form" label-width="80px">
				<!-- 添加数据的学校编号 -->
				<el-form-item label="学校编号" required="">
					<el-input v-model="form.idSchool" placeholder="请输入房产证号"></el-input>
				</el-form-item>

				<el-form-item label="学区编号" required>
					<el-input v-model="form.idDistrict" placeholder="请输入学区编号"></el-input>
				</el-form-item>

				<el-form-item label="学位剩余" required>
					<el-input v-model="form.remain" placeholder="请输入学位剩余"></el-input>
				</el-form-item>

				<el-form-item label="学校类型" required>
					<el-select v-model="form.type" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<!-- 添加数据的学校全称 -->
				<el-form-item label="学校全名" required>
					<el-input v-model="form.fullName" placeholder="请输入全名"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" required>
					<el-input v-model="form.linkPath" placeholder="请输入练习方式"></el-input>
				</el-form-item>
			</el-form>
			<!-- 表单下方两个按钮 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="add()">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 表格 -->
		<div>
			<el-table :data="tables[0].slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
				<el-table-column prop="idSchool" label="学校编号" width="100" align="center"> </el-table-column>
				<el-table-column prop="idDistrict" label="学区" align="center"> </el-table-column>
				<el-table-column prop="remain" label="剩余学位" align="center"> </el-table-column>
				<el-table-column prop="type" label="类型" align="center"> </el-table-column>
				<el-table-column prop="fullName" label="全名" align="center"> </el-table-column>
				<el-table-column prop="linkPath" label="联系方式" align="center"> </el-table-column>
				<!-- 操作 -->
				<el-table-column fixed="right" label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="edit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
						<!-- <el-button @click="print(scope.row)" type="text" size="small">测试数据</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 编辑数据的表单 -->
		<el-dialog title="机构管理" :visible.sync="dialogVisible1" width="30%">
			<!-- 添加数据的表单 -->
			<el-form ref="form1" :model="form1" label-width="80px">
				<!-- 添加数据的学校编号 -->
				<el-form-item label="学校编号" required="">
					<el-input v-model="form1.idSchool" placeholder="请输入房产证号"></el-input>
				</el-form-item>

				<el-form-item label="学区编号" required>
					<el-input v-model="form1.idDistrict" placeholder="请输入学区编号"></el-input>
				</el-form-item>

				<el-form-item label="学位剩余" required>
					<el-input v-model="form1.remain" placeholder="请输入学位剩余"></el-input>
				</el-form-item>

				<el-form-item label="学校类型" required>
					<el-select v-model="form1.type" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<!-- 添加数据的学校全称 -->
				<el-form-item label="学校全名" required>
					<el-input v-model="form1.fullName" placeholder="请输入全名"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" required>
					<el-input v-model="form1.linkPath" placeholder="请输入练习方式"></el-input>
				</el-form-item>
			</el-form>
			<!-- 表单下方的两个按钮 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="update()">确 定</el-button>
			</span>
		</el-dialog>
		<!--		 分页器，指定一页有多少数据 -->
		<div style="margin-top: 15px">
			<el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20, 25]" :page-size="pagesize" :total="tableData.length" layout="total, sizes, prev, pager, next, jumper"> </el-pagination>
		</div>

		<!--    <div style="margin-top: 15px">-->
		<!--      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20, 25]" :page-size="pagesize" :total="tableData.length" layout="total, sizes, prev, pager, next, jumper"> </el-pagination>-->
		<!--    </div>-->
	</div>
</template>

<script>
// import Vue from "vue";
// Vue.prototype.$axios = request
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
export default {
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			axios({
				method: 'get',
				url: 'http://localhost:8888/school/show',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
			}).then((res) => {
				this.tableData = res.data.data
				console.log(res.data.data)
			})
		},

		edit(index, row) {
			this.form = this.tableData[index]
			this.dialogVisible1 = true
		},
		print(row) {
			console.log(row)
		},

		searchput() {
			this.searchContent = this.inputContent
			// console.log(this.searchContent)
		},

		// searchput() {
		//   var searchData = JSON.stringify({
		//     pageNum: this.currentPage,
		//     pageSize: this.pageSize,
		//     idSchool: this.inputContent
		//   });
		// 	//获取搜索框里面的值
		//   axios({method: 'get',
		//     url: "http://localhost:8888/school/query",
		//     headers: {
		//       'Content-Type': "application/json;charset=UTF-8"
		//     },
		//     data: searchData
		//   }).then(res=>{
		//         this.inputContent = this.searchContent
		//       })
		//
		// },
		add() {
			var readData = JSON.stringify({
				idSchool: this.form.idSchool,
				idDistrict: this.form.idDistrict,
				remain: this.form.remain,
				type: this.form.type,
				fullName: this.form.fullName,
				linkPath: this.form.linkPath,
			})
			axios({
				method: 'post',
				url: 'http://localhost:8888/school/add',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
				data: readData,
				// params: {
				//   idSchool: this.form.idSchool,
				//   idDistrict: this.form.idDistrict,
				//   remain: this.form.remain,
				//   type: this.form.type,
				//   fullName: this.form.fullName,
				//   linkPath: this.form.linkPath
				//   //端口返回数据进行前端渲染，需要填写参数
				// }
			}).then((res) => {
				if (res.code == 0) {
					alert('操作成功！')
					this.dialogVisible1 = false
					// this.loadTable(1);
				}
			})
			this.dialogVisible = false
		},

		update() {
			var readData = JSON.stringify({
				idSchool: this.form1.idSchool,
				idDistrict: this.form1.idDistrict,
				remain: this.form1.remain,
				type: this.form1.type,
				fullName: this.form1.fullName,
				linkPath: this.form1.linkPath,
			})
			this.dialogVisible1 = false
			axios({
				method: 'post',
				url: 'http://localhost:8888/school/update',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
				data: readData,
			}).then((res) => {
				this.getData()
				if (res.code == 0) {
					alert('操作成功！')
					this.dialogVisible1 = false
				}
			})
			this.dialogVisible = false
		},

		handleSizeChange: function (val) {
			this.pageSize = val
			this.load()
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage
			this.load()
		},
	},
	rules: {},

	data() {
		return {
			loading: false,
			tableData: [],
			// 默认起始页号
			currentPage: 1,
			// 默认一页的表格最大容纳量
			pageSize: 10,
			total: 0,
			searchContent: '',
			inputContent: '',
			records: [],
			dialogVisible: false,
			dialogVisible1: false,
			form: {
				idSchool: '',
				idDistrict: '',
				remain: '',
				type: '',
				fullName: '',
				linkPath: '',
			},
			form1: {
				idSchool: '',
				idDistrict: '',
				remain: '',
				type: '',
				fullName: '',
				linkPath: '',
			},
			options: [
				{
					value: '小学',
					label: '小学',
				},
				{
					value: '中学',
					label: '中学',
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
</style>
