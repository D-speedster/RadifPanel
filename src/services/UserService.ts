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
    // Transform frontend data to API format
    const transformedData = {
        name: (data as any).fullName,   // API expects 'name' but form sends 'fullName'
        email: (data as any).email,    // API expects 'email'
        mobile: (data as any).phone,   // API expects 'mobile' but form sends 'phone'
        password: (data as any).password, // API expects 'password'
        role: (data as any).role,      // API expects 'role'
    }
    
    console.log('Original form data:', data)
    console.log('Transformed data being sent to API:', transformedData)
    
    try {
        const response = await ApiService.fetchDataWithAxios<T>({
            url: '/users/create',
            method: 'post',
            data: transformedData,
        })
        console.log('API Response:', response)
        return response
    } catch (error) {
        console.error('API Error:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        throw error
    }
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