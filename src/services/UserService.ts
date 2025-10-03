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
    // API returns {message: string, users: []} but frontend expects {list: [], total: number}
    if (response && response.users && Array.isArray(response.users)) {
        return {
            list: response.users,
            total: response.users.length
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

export const apiCreateUser = async <T, U extends Record<string, unknown>>(
    data: U,
) => {
    // فقط فیلدهای موردنیاز API ارسال می‌شوند
    const { name, email, mobile, password, role } = data as any

    const payload = { name, email, mobile, password, role }

    return ApiService.fetchDataWithAxios<T>({
        url: '/users/create',
        method: 'post',
        data: payload,
    })
}

export async function apiUpdateUser<T, U extends Record<string, unknown>>(
    id: string | number,
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteUser<T>(
    id: string | number,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/users/${id}`,
        method: 'delete',
    })
}