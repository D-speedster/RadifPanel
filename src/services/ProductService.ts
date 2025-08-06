import ApiService from './ApiService'

export async function apiGetProductList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const response = await ApiService.fetchDataWithAxios<any>({
        url: '/products/all',
        method: 'get',
        params,
    })
    
    // Transform the response to match the expected format
    // API returns array directly, but frontend expects {list: [], total: number}
    if (Array.isArray(response)) {
        return {
            list: response,
            total: response.length
        } as T
    }
    
    // If response is already in expected format, return as is
    return response as T
}

export async function apiGetProduct<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/products/${id}`,
        method: 'get',
        params,
    })
}

export async function apiUpdateProduct<T, U extends Record<string, unknown>>(
    id: string | number,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/products/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteProduct<T>(
    id: string | number,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/products/${id}`,
        method: 'delete',
    })
}
