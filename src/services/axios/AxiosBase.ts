import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError } from 'axios'

const AxiosBase = axios.create({
    timeout: 120000, // Increased to 2 minutes
    baseURL: appConfig.apiPrefix,
    // Add retry configuration
    retry: 3,
    retryDelay: 1000,
})

AxiosBase.interceptors.request.use(
    (config) => {
        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError) => {
        const config = error.config as any
        
        // Retry logic for timeout and network errors
        if (config && 
            (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('Network Error')) &&
            (!config.__retryCount || config.__retryCount < 3)) {
            
            config.__retryCount = (config.__retryCount || 0) + 1
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * config.__retryCount))
            
            return AxiosBase(config)
        }
        
        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBase
