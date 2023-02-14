import { AxiosRequestHeaders, AxiosResponse, AxiosInstance } from 'axios'

interface IApi {

  errorTextBase: string
  axiosInstance: AxiosInstance

  apiVersion: string
  apiPrefix: string
  baseURL: string
  timeout: number
  headers: AxiosRequestHeaders

  axiosInstanceGenerator: () => AxiosInstance
  urlValidator: (url: string) => string
  get: (url: string, options?: IApiOptions, callback?: (res: any, url: string) => any) => AxiosResponse
  post: (url: string, data: dataType, options?: IApiOptions, callback?: (res: any, url: string) => any) => AxiosResponse
  put: (url: string, data: dataType, options?: IApiOptions, callback?: (res: any, url: string) => any) => AxiosResponse
  patch: (url: string, data: dataType, options?: IApiOptions, callback?: (res: any, url: string) => any) => AxiosResponse
}

type dataType = object | Array<any>

interface IApiOptions { }

export { IApiOptions, dataType }
export default IApi