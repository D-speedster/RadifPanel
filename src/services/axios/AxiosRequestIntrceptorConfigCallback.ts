import appConfig from '@/configs/app.config'
import cookiesStorage from '@/utils/cookiesStorage'
import {
    TOKEN_TYPE,
    REQUEST_HEADER_AUTH_KEY,
    TOKEN_NAME_IN_STORAGE,
} from '@/constants/api.constant'
import type { InternalAxiosRequestConfig } from 'axios'

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    const storage = appConfig.accessTokenPersistStrategy
    let accessToken = ''

    if (storage === 'localStorage') {
        accessToken = localStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
    } else if (storage === 'sessionStorage') {
        accessToken = sessionStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
    } else if (storage === 'cookies') {
        accessToken = cookiesStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
    }

    if (accessToken) {
        config.headers[REQUEST_HEADER_AUTH_KEY] =
            `${TOKEN_TYPE}${accessToken}`
    }

    return config
}

export default AxiosRequestIntrceptorConfigCallback
