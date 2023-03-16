<template>
	<el-container class="container">
		<el-header class="header">
			<el-row>
				<el-col :span="16" class="headerlogo">
					<div class="grid-content bg-purple">
						<img style="wideth: 276px; height: 48px" src="../assets/images/logo.png" alt="无法显示图片" />
					</div>
				</el-col>
				<el-col :span="8" class="rightsection">
					<div class="grid-content bg-purple-light">
						<span class="el-icon-s-custom"></span>
						<span class="el-dropdown-link userinfo-inner1">欢迎您，管理员</span>
						<span class="userinfo-inner" @click="signout">退出</span>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class="aside">
				<!-- unique-opened只展开一个 -->
				<!-- router开启路由模式 -->
				<el-menu :unique-opened="true" :router="true" background-color=" #3A3A3A" text-color="#fff" active-text-color="#ffd04b">
					<!-- index 唯一标志 -->

					<el-menu-item index="/shouye">
						<i class="el-icon-s-home"></i>
						<span>首页</span>
					</el-menu-item>

					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-school"></i>
							<span>学位管理</span>
						</template>
						<!-- index 表示跳转路径 后面需要改成路径-->
						<el-menu-item index="/xueweiguanli">学位信息管理</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-office-building"></i>
							<span>机构管理</span>
						</template>
						<el-menu-item index="/jisouguanli">机构信息管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-files"></i>
							<span>日志管理</span>
						</template>
						<el-menu-item index="/rizhiguanli">日志信息管理</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-s-claim"></i>
							<span>审核</span>
						</template>
						<el-menu-item index="/shenhe">学位审核</el-menu-item>
						<el-menu-item index="/zhshenhe">账号审核</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Home',
	data() {
		return {}
	},
	methods: {
		//退出
		signout() {
			this.$confirm('退出登录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				axios({
					method: 'post',
					url: 'http://localhost:8888/admin/logout',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
				}).then((res) => {
					this.$router.push({ path: '/login' })
				})
			})
		},
	},
}
</script>
<style scoped>
.container {
	height: 100vh;
	font-size: 15px;
}
.header {
	background: #212121;
	color: #fff;
}
.aside {
	background: #3a3a3a;
	color: #fff;
	/* height: 100%; */
}
.main {
	/* height: 100%; */
	/* color: #212121; */
	background-color: rgb(247, 245, 245);
}
.headerlogo {
	line-height: 60px;
	margin-top: 10px;
}
.rightsection {
	line-height: 60px;
	text-align: center;
}

.bg-purple-light {
	margin-left: 300px;
}
.userinfo-inner1 {
	margin-left: 20px;
}
.userinfo-inner {
	margin-left: 50px;
}
</style>
