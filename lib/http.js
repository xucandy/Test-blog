import axios from 'axios'

// 封装axios方法
const baseURL = `${process.env.SERVER_HOST || 'http://127.0.0.1'}:${process.env.PORT || '3000'}`
// 创建一个axios实例并设置默认配置
const http = axios.create({
  baseURL: baseURL// 使用环境变量作为基本请求地址
})

export default http