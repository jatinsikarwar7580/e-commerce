import axios, { AxiosError, AxiosResponse } from "axios";

import qs from "qs";

const defaultContentType: string = 'application/json'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': defaultContentType,
    }
})

type method = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface commonAPIParameters {
    method: method,
    url: string,
    data: unknown,
    stringify?: boolean,
    contentType?: string,
    controller?: any,
}

export const commonAPI = ({ method, url, data = {}, stringify = true, contentType, controller }: commonAPIParameters): Promise<any> => {
    return new Promise((resolve, reject) => {
        switch (method) {
            case 'get':
                api.get(url, {
                    params: data,
                    headers: {
                        'Content-Type': contentType ? contentType : defaultContentType,
                    },
                    signal: controller.signal,
                }).then((response: AxiosResponse) => {
                    resolve(response)
                }).catch((error: AxiosError) => {
                    reject(error)
                })
                break

            case 'post':
                const postRequest = stringify ? qs.stringify(data) : data
                api.post(url, postRequest, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': contentType ? contentType : defaultContentType,
                    }
                }).then((response: AxiosResponse) => {
                    resolve(response)
                }).catch((error: AxiosError) => {
                    reject(error)
                })
                break

            case 'put':
                const putRequest = stringify ? qs.stringify(data) : data
                api.put(url, putRequest, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': contentType ? contentType : defaultContentType,
                    },
                }).then((response: AxiosResponse) => {
                    resolve(response)
                }).catch((error: AxiosError) => {
                    reject(error)
                })
                break

            case 'patch':
                const patchRequest = stringify ? qs.stringify(data) : data
                api.put(url, patchRequest, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': contentType ? contentType : defaultContentType,
                    },
                }).then((response: AxiosResponse) => {
                    resolve(response)
                }).catch((error: AxiosError) => {
                    reject(error)
                })
                break

            case 'delete':
                api.delete(url, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': contentType ? contentType : defaultContentType,
                    },
                }).then((response: AxiosResponse) => {
                    resolve(response)
                }).catch((error: AxiosError) => {
                    reject(error)
                })
                break

            default:
                break
        }
    })
}