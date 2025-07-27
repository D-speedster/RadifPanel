/**
 * Network utility functions for better error handling and user experience
 */

/**
 * Check if the user is online
 */
export const isOnline = (): boolean => {
    return navigator.onLine
}

/**
 * Get network connection type if available
 */
export const getConnectionType = (): string => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    return connection?.effectiveType || 'unknown'
}

/**
 * Check if the error is a network-related error
 */
export const isNetworkError = (error: any): boolean => {
    return (
        error.code === 'ECONNABORTED' ||
        error.message?.includes('timeout') ||
        error.message?.includes('Network Error') ||
        error.message?.includes('ERR_NETWORK') ||
        error.message?.includes('ERR_INTERNET_DISCONNECTED')
    )
}

/**
 * Check if the error is a timeout error
 */
export const isTimeoutError = (error: any): boolean => {
    return (
        error.code === 'ECONNABORTED' ||
        error.message?.includes('timeout')
    )
}

/**
 * Get user-friendly error message based on error type
 */
export const getErrorMessage = (error: any): string => {
    if (!isOnline()) {
        return 'اتصال اینترنت برقرار نیست. لطفاً اتصال خود را بررسی کنید.'
    }
    
    if (isTimeoutError(error)) {
        return 'درخواست زمان زیادی طول کشید. لطفاً مجدداً تلاش کنید.'
    }
    
    if (isNetworkError(error)) {
        return 'مشکل در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.'
    }
    
    if (error.response?.status === 401) {
        return 'احراز هویت نامعتبر است. لطفاً مجدداً وارد شوید.'
    }
    
    if (error.response?.status === 404) {
        return 'آدرس درخواستی پیدا نشد.'
    }
    
    if (error.response?.status === 500) {
        return 'خطای داخلی سرور. لطفاً بعداً تلاش کنید.'
    }
    
    return error.message || 'خطای ناشناخته رخ داده است.'
}

/**
 * Add network status listener
 */
export const addNetworkStatusListener = (callback: (isOnline: boolean) => void): (() => void) => {
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Return cleanup function
    return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
    }
}