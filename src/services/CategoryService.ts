import ApiService from './ApiService'
import appConfig from '@/configs/app.config'
import CategoryMockService from './CategoryMockService'

const apiPrefix = appConfig.apiPrefix

export async function apiGetCategoryList<T>() {
    if (appConfig.enableMock) {
        const response = await CategoryMockService.getCategoryList()
        return response as T
    }
    
    return ApiService.fetchDataWithAxios<T>({
        url: `${apiPrefix}/categories/all`,
        method: 'get',
    })
}

export async function apiGetCategory<T>(id: string | number) {
    if (appConfig.enableMock) {
        const response = await CategoryMockService.getCategory(String(id))
        return response as T
    }
    
    return ApiService.fetchDataWithAxios<T>({
        url: `${apiPrefix}/categories/${id}`,
        method: 'get',
    })
}

export async function apiCreateCategory<T, U extends Record<string, unknown>>(
    data: U,
) {
    if (appConfig.enableMock) {
        const response = await CategoryMockService.createCategory(data)
        return response as T
    }
    
    return ApiService.fetchDataWithAxios<T>({
        url: `${apiPrefix}/categories`,
        method: 'post',
        data,
    })
}

export async function apiUpdateCategory<T, U extends Record<string, unknown>>(
    id: string | number,
    data: U,
) {
    if (appConfig.enableMock) {
        const response = await CategoryMockService.updateCategory(String(id), data)
        return response as T
    }
    
    return ApiService.fetchDataWithAxios<T>({
        url: `${apiPrefix}/categories/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteCategory<T>(id: string | number) {
    if (appConfig.enableMock) {
        const response = await CategoryMockService.deleteCategory(String(id))
        return response as T
    }
    
    return ApiService.fetchDataWithAxios<T>({
        url: `${apiPrefix}/categories/${id}`,
        method: 'delete',
    })
}