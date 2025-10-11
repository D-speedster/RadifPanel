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
    // API returns {message: string, products: []} but frontend expects {list: [], total: number}
    if (response && response.products && Array.isArray(response.products)) {
        return {
            list: response.products,
            total: response.products.length
        } as T
    }
    
    // Fallback for array response
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

export async function apiCreateProduct<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'https://api.radif.org/api/products/create',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data,
    })
}
