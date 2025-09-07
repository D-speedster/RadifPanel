import { apiGetCategoryList } from '@/services/CategoryService'
import useSWR from 'swr'
import { useLocation } from 'react-router-dom'

interface Category {
    id: string
    name: string
    slug: string
    description: string
    parentId?: string
    parentName?: string
    level: number
    isActive: boolean
    productsCount: number
    image?: string
    createdAt: string
    updatedAt: string
}

interface GetCategoryListResponse {
    data?: Category[]
    list?: Category[]
    categories?: Category[]
    total?: number
}

const useCategoryList = () => {
    const location = useLocation()
    
    // Only make the request if we're on a categories page
    const shouldFetch = () => {
        return location.pathname.includes('/categories')
    }

    const { data, error, isLoading, mutate } = useSWR(
        shouldFetch() ? '/api/categories/all' : null,
        () => {
            return apiGetCategoryList<GetCategoryListResponse>()
        },
        {
            revalidateOnFocus: false,
            errorRetryCount: 3,
            errorRetryInterval: 2000,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Don't retry on 404 or 401
                if (error.status === 404 || error.status === 401) return
                // Retry after delay
                setTimeout(() => revalidate({ retryCount }), 2000)
            }
        },
    )

    // Handle different response formats
    let categoryList: Category[] = []
    
    if (data) {
        if (data.data && Array.isArray(data.data)) {
            categoryList = data.data
        } else if (data.list && Array.isArray(data.list)) {
            categoryList = data.list
        } else if (data.categories && Array.isArray(data.categories)) {
            categoryList = data.categories
        } else if (Array.isArray(data)) {
            categoryList = data
        }
    }

    const categoryListTotal = data?.total || categoryList.length

    return {
        error,
        isLoading,
        mutate,
        categoryList,
        categoryListTotal,
    }
}

export default useCategoryList