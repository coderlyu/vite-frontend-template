import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import _sign from '../utils/_sign'

console.log(import.meta.env)
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  transformRequest: [function (data) {
    const d = qs.stringify(data)
    return d
  }]
})

request.interceptors.request.use(
  config => {
    if (config.method?.toLowerCase() === 'post') {
      _sign(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export interface PromiseBaseName {
  data: string | Array<any> | number | Object | undefined | null,
  error_code: number,
  message?: string
}

export interface PromiseLoginName extends  PromiseBaseName{
  token: string
}
export type ResponseName = AxiosResponse<PromiseBaseName> | AxiosResponse<PromiseLoginName>

export default request
