import IApi, { IApiOptions, dataType } from '~/interfaces/api'
import axios, { AxiosRequestHeaders, AxiosInstance } from 'axios'

class Api implements IApi {

  errorTextBase: string = '[API]'
  axiosInstance: AxiosInstance

  apiVersion: string
  apiPrefix: string
  baseURL: string
  timeout: number
  headers: AxiosRequestHeaders

  constructor(apiPrefix: string = '', apiVersion: string = '1.0', headers: AxiosRequestHeaders, baseURL: string = '', timeout: number = 0) {
    this.apiPrefix = apiPrefix
    this.apiVersion = apiVersion
    this.baseURL = baseURL
    this.timeout = timeout
    this.headers = headers

    this.axiosInstance = this.axiosInstanceGenerator()
  }

  axiosInstanceGenerator(): AxiosInstance {
    return axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: this.headers
    })
  }

  urlValidator(url: string): string {

    url = url.trim()

    if (typeof url !== 'string')
      throw new Error(`${this.errorTextBase} url must be string type`)

    return `${this.apiPrefix}/${this.apiVersion}/${url}`
  }

  get(url: string, options?: IApiOptions, callback?: (res: any, url: string) => any): any {
    url = this.urlValidator(url)

    return new Promise((resolve, reject) => {
      // do anything before request

      this.axiosInstance.get(url)
        .then((res: any) => {

          if (typeof callback === 'function')
            return callback(res, url)

          resolve(res)
        })
        .catch((err: any) => {

          if (typeof callback === 'function')
            return callback(err, url)

          reject(err)
        })
    })
  }

  post(url: string, data: dataType, options?: IApiOptions, callback?: (res: any, url: string) => any): any {
    url = this.urlValidator(url)

    return new Promise((resolve, reject) => {
      // do anything before request

      this.axiosInstance.post(url, data)
        .then((res: any) => {

          if (typeof callback === 'function')
            return callback(res, url)

          resolve(res)
        })
        .catch((err: any) => {

          if (typeof callback === 'function')
            return callback(err, url)

          reject(err)
        })
    })
  }

  patch(url: string, data: dataType, options?: IApiOptions, callback?: (res: any, url: string) => any): any {
    url = this.urlValidator(url)

    return new Promise((resolve, reject) => {
      // do anything before request

      this.axiosInstance.patch(url, data)
        .then((res: any) => {

          if (typeof callback === 'function')
            return callback(res, url)

          resolve(res)
        })
        .catch((err: any) => {

          if (typeof callback === 'function')
            return callback(err, url)

          reject(err)
        })
    })
  }

  put(url: string, data: dataType, options?: IApiOptions, callback?: (res: any, url: string) => any): any {
    url = this.urlValidator(url)

    return new Promise((resolve, reject) => {
      // do anything before request

      this.axiosInstance.put(url, data)
        .then((res: any) => {

          if (typeof callback === 'function')
            return callback(res, url)

          resolve(res)
        })
        .catch((err: any) => {

          if (typeof callback === 'function')
            return callback(err, url)

          reject(err)
        })
    })
  }

}

const globalApi = new Api('', '1.0', {})
export default globalApi