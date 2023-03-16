<template>
	<div>
		<!-- 标题 -->
		<div class="title">首页</div>
		<el-row :gutter="20">
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<div class="user"></div>
					<div class="name">
						admin
						<div class="date">{{ dateFormat(date) }}</div>
					</div>
				</div>
			</el-col>

			<el-col :span="16">
				<div class="grid-content bg-purple shanshui"></div>
			</el-col>
		</el-row>
		<!--    以下部分是对三个图标的描述  -->
		<el-row :gutter="20" class="data">
			<el-col :span="8">
				<div id="bar1" class="grid-content bg-purple box" ref="echarts1"></div>
			</el-col>

			<el-col :span="8">
				<div id="pie" class="grid-content bg-purple box" ref="echarts2"></div>
			</el-col>

			<el-col :span="8">
				<div id="bar2" class="grid-content bg-purple box" ref="echarts3"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
	mounted() {
		//显示当前日期时间
		let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
		this.timer = setInterval(() => {
			_this.date = new Date() // 修改数据date
		}, 1000)

		axios.get('http://localhost:8888/school/barVO').then(function (response) {
			// 基于准备好的dom，初始化echarts实例
			let myChart = _this.$echarts.init(document.getElementById('bar2'))
			// 绘制图表
			myChart.setOption({
				title: {
					text: '学位',
					left: 'center',
					top: 20,
					textStyle: {
						color: '#555555',
					},
				},
				tooltip: {},
				xAxis: {
					data: response.data.names,
				},
				yAxis: {},
				series: [
					{
						name: '销量',
						type: 'bar',
						data: response.data.values,
					},
				],
			})
		})

		axios.get('http://localhost:8888/school/barVO').then(function (response) {
			// 基于准备好的dom，初始化echarts实例
			let myChart = _this.$echarts.init(document.getElementById('bar1'))
			// 绘制图表
			myChart.setOption({
				title: {
					text: '学位',
					left: 'center',
					top: 20,
					textStyle: {
						color: '#555555',
					},
				},
				tooltip: {},
				xAxis: {
					data: response.data.names,
				},
				yAxis: {},
				series: [
					{
						name: '销量',
						type: 'bar',
						data: response.data.values,
					},
				],
			})
		})

		axios.get('http://localhost:8888/school/pieVO').then(function (response) {
			let myChart = _this.$echarts.init(document.getElementById('pie'))
			myChart.setOption({
				title: {
					text: '学位分布管理',
					left: 'center',
					top: 20,
					textStyle: {
						color: '#555555',
					},
				},
				tooltip: {
					trigger: 'item',
				},

				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1],
					},
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: response.data.sort(function (a, b) {
							return a.value - b.value
						}),
						roseType: 'radius',
						label: {
							color: '#555555',
						},
						labelLine: {
							lineStyle: {
								color: '#555555',
							},
							smooth: 0.2,
							length: 10,
							length2: 20,
						},
						itemStyle: {
							color: '#fff',
						},

						animationType: 'remain',
						animationEasing: 'elasticOut',
						animationDelay: function (idx) {
							return Math.random() * 200
						},
					},
				],
			})
		})
	},
	data() {
		return {
			date: new Date(),
		}
	},

	methods: {
		dateFormat(time) {
			var date = new Date(time)
			var year = date.getFullYear()
			/* 在日期格式中，月份是从0开始的，因此要加0
			 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			 * */
			var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
			var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
			var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
			var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
			var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
			// 拼接
			return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
		},
		drawLine() {
			// 画第一个图表
			const myEcharts1 = echarts.init(this.$refs.echarts1)
			myEcharts1.setOption(this.option1)

			// 画第二个图表
			const myEcharts2 = echarts.init(this.$refs.echarts2)
			myEcharts2.setOption(this.option2)

			// 画第三个图表
			const myEcharts3 = echarts.init(this.$refs.echarts3)
			myEcharts3.setOption(this.option3)
		},
	},
}
</script>

<style scoped>
.title {
	background-color: #fff;
	font-size: 30px;
	margin-bottom: 30px;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 10px;
}

.grid-content.bg-purple {
	background-color: #fff;
}

.grid-content.bg-purple div {
	display: inline-block;
}

.grid-content.bg-purple.shanshui {
	background: url('../assets/images/shouye.png');
	width: 1045px;
	height: 184px;
}

.user {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	margin: 30px;
	vertical-align: middle;
	background: url('../assets/images/img.jpg');
}

.name {
	margin-left: 30px;
	width: 150px;
	height: 40px;
	font-size: 24px;
}
.date {
	font-size: 13px;
}

.data {
	margin-top: 30px;
}

div.grid-content.bg-purple.box {
	padding-top: 30px;
	height: 500px;
}
</style>
