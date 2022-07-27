import axios from 'axios'
const baseUrl = 'http://localhost:3333'

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
export function get(url, params) {
  return axios
    .get(url, { params })
    .then(wrapperRaw => {
      // console.log(wrapperRaw)
      // 服务端原始数据
      // const raw = wrapperRaw.data
      //   if (raw.code !== 200) throw new Error('Axios Request Error')
      return wrapperRaw.data
    })
    .catch(e => console.log(e)) // 用于调试
}
