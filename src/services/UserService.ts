import ApiService from './ApiService'

export async function apiGetUserList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const response = await ApiService.fetchDataWithAxios<any>({
        url: '/users/all',
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

export async function apiGetUser<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${id}`,
        method: 'get',
        params,
    })
}