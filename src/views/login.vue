<template>
	<div class="login">
		<div class="mylogin" align="center">
			<h4>学位管理系统</h4>
			<el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
				<el-form-item label="" prop="account" style="margin-top: 10px">
					<el-row>
						<el-col :span="2">
							<span class="el-icon-s-custom"></span>
						</el-col>
						<el-col :span="22">
							<el-input class="inps" placeholder="账号" v-model="loginForm.account"> </el-input>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="" prop="passWord">
					<el-row>
						<el-col :span="2">
							<span class="el-icon-lock"></span>
						</el-col>
						<el-col :span="22">
							<el-input class="inps" type="password" placeholder="密码" v-model="loginForm.passWord"></el-input>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item style="margin-top: 55px">
					<el-button type="primary" round class="submitBtn" @click="submitForm">登录 </el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
	name: 'Login',
	data: function () {
		return {
			loginForm: {
				account: '',
				passWord: '',
			},
			loginRules: {
				account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
			},
		}
	},

	methods: {
		...mapMutations(['changeLogin']),
		submitForm() {
			axios({
				method: 'post',
				url: 'http://localhost:8888/admin/login',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
				data: {
					username: this.loginForm.account,
					password: this.loginForm.passWord,
				},
			})
				.then((res) => {
					//请求成功后执行函数
					if (res.data.data.identify === '0') {
						this.$router.push('/index1') //登录验证成功路由实现跳转
						this.$notify({
							title: '提示',
							message: '用户登录成功',
							duration: 3000,
						})
					} else if (res.data.data.identify === '1') {
						this.$router.push('/index')
						this.$notify({
							title: '提示',
							message: '用户登录成功',
							duration: 3000,
						})
					}
				})
				.catch((err) => {
					//请求错误后执行函数
					this.$notify({
						title: '提示',
						message: '用户访问错误',
						duration: 3000,
					})
					console.log(err)
				})

			/*
			const userAccount = this.loginForm.account
			const userPassword = this.loginForm.passWord
			// console.log('用户输入的账号为：', userAccount)
			// console.log('用户输入的密码为：', userPassword)
			if (userAccount === '' || userPassword === '') {
				this.loginForm.account = ''
				this.loginForm.passWord = ''
				return this.$message({
					type: 'error',
					message: '账号或密码不能为空！',
				})
			} else if (userAccount === '123456' && userPassword === '123456') {
				this.$router.push({ path: '/index' })
			} else {
				this.loginForm.account = ''
				this.loginForm.passWord = ''
				return this.$message({
					type: 'error',
					message: '账号或密码错误！',
				})
			}
		*/
		},
	},
}
</script>

<style>
.login {
	width: 100vw;
	padding: 0;
	margin: 0;
	height: 100vh;
	font-size: 16px;
	background-position: left top;
	background-color: #242645;
	color: #fff;
	font-family: 'Source Sans Pro';
	position: relative;
}

.mylogin {
	width: 240px;
	height: 280px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	padding: 50px 40px 40px 40px;
	box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
	opacity: 1;
	background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
}

.inps input {
	border: none;
	color: #fff;
	background-color: transparent;
	font-size: 12px;
}

.submitBtn {
	background-color: transparent;
	color: #39f;
	width: 200px;
}
</style>
