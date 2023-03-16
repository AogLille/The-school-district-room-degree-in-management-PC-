import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
	},

	{
		path: '/index',
		redirect: 'shouye',
		name: 'index',
		component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
		children: [
			{
				path: '/shouye',
				name: 'shouye',
				component: () => import(/* webpackChunkName: "about" */ '../views/shouye.vue'),
			},
			{
				path: '/xueweiguanli',
				name: 'xueweiguanli',
				component: () => import(/* webpackChunkName: "about" */ '../views/xueweiguanli.vue'),
			},
			{
				path: '/jisouguanli',
				name: 'jisouguanli',
				component: () => import(/* webpackChunkName: "about" */ '../views/jisouguanli.vue'),
			},
			{
				path: '/rizhiguanli',
				name: 'rizhiguanli',
				component: () => import(/* webpackChunkName: "about" */ '../views/rizhiguanli.vue'),
			},
			{
				path: '/shenhe',
				name: 'shenhe',
				component: () => import(/* webpackChunkName: "about" */ '../views/shenhe.vue'),
			},
			{
				path: '/zhshenhe',
				name: 'zhshenhe',
				component: () => import(/* webpackChunkName: "about" */ '../views/zhshenhe.vue'),
			},
		],
	},
	{
		path: '/index1',
		redirect: 'shouye1',
		name: 'index1',
		component: () => import(/* webpackChunkName: "about" */ '../views/index1.vue'),
		children: [
			{
				path: '/shouye1',
				name: 'shouye1',
				component: () => import(/* webpackChunkName: "about" */ '../views/shouye1.vue'),
			},
			{
				path: '/xueweiguanli1',
				name: 'xueweiguanli1',
				component: () => import(/* webpackChunkName: "about" */ '../views/xueweiguanli1.vue'),
			},
			{
				path: '/rizhiguanli1',
				name: 'rizhiguanli1',
				component: () => import(/* webpackChunkName: "about" */ '../views/rizhiguanli.vue'),
			},
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
