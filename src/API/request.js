import axios from 'axios'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    // 外网更新
    baseURL: 'http://www.chenyizhe.cn/res/',
    timeout: 5000 // request timeout
})

export default service