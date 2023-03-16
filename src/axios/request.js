import axios from 'axios'
import Vue from "vue";
Vue.prototype.$axios = request

// 创建 axios 实例
const request = axios.create({
    baseURL: 'http://localhost:8888', //后端的项目地址,以自己的为准
    timeout: 6000 // 请求超时时间
})


// 请求拦截器
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token') //取本地缓存的token
    if (token) {
        config.headers['token'] = token // 让每个请求携带令牌，根据实际情况自行修改
    }
    return config
}, err)


// 接收拦截器
request.interceptors.response.use((response) => {
    const res = response.data
    if (res.code!==200) {
        // 401:令牌token失效;
        if (res.code === 401) {
            alert("令牌已失效，请重新登录！");
        }
        return Promise.reject('error')
    } else {
        return res
    }
}, err)


export default {
    request
}
