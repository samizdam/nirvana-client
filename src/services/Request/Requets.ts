import { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from 'react-transition-group'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const NewInstanse = axios.create({
	baseURL: 'http://localhost:3001/api',
	timeout: 1000,
	withCredentials: true
})

interface IRequestParams {
	method: string
	url: string
	data?: any
	useMock?: boolean
}

class Request {
	private controller = new AbortController()
	private mock = new MockAdapter(axios)

	sendRequest(
		{ method, url, data, useMock }: IRequestParams,
		options: AxiosRequestConfig & { mockData?: any } = {}
	): Promise<any> {
		if (useMock) {
			this.useMock(options.mockData)
		}

		const requestOptions = {
			method,
			url,
			data,
			signal: this.controller.signal,
			onUploadProgress: this.getUploadProgress,
			onDownloadProgress: this.getDowloadProgress,
			...options
		}

		return NewInstanse(requestOptions)
			.then(function (response: AxiosResponse) {
				return response.data
			})
			.catch(function (error) {
				if (error.name === 'AbortError') {
					console.log('Запрос был отменен')
				} else {
					console.log(error)
				}
			})
	}

	cancelRequest() {
		this.controller.abort()
	}

	getUploadProgress(progressEvent: AxiosProgressEvent) {
		let percentCompleted = 0

		if (progressEvent.total !== undefined) {
			percentCompleted = Math.round(
				(progressEvent.loaded * 100) / progressEvent.total
			)
		}

		return percentCompleted
	}

	getDowloadProgress(progressEvent: AxiosProgressEvent) {
		let percentCompleted = 0

		if (progressEvent.total !== undefined) {
			percentCompleted = Math.round(
				(progressEvent.loaded * 100) / progressEvent.total
			)
		}

		return percentCompleted
	}

	useMock(mockData?: any) {
		this.mock.reset()
		this.mock.onAny().reply((config: AxiosRequestConfig) => {
			const { method, url } = config
			const key = `${method?.toLocaleUpperCase()} ${url}`

			const data = (this.mock as any)._mocked[key]

			if (data) {
				return [200, data]
			}

			return [404, {}]
		})
	}
}

export const request = new Request()

//пример использования
// request
// 	.sendRequest({ method: 'get', url: '/users' }, { useMock: true, mockData })
// 	.then(data => {
// 		console.log(data)
// 	})