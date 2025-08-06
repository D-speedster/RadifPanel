import ApiService from './ApiService'
import type { GetWebsiteListResponse, Website } from '@/views/concepts/websites/weblist/types'

export async function apiGetWebsitesList(
    params: Record<string, unknown> = {},
) {
    return ApiService.fetchDataWithAxios<GetWebsiteListResponse>({
        url: '/websites',
        method: 'get',
        params,
    })
}

export async function apiGetWebsite(
    id: number,
) {
    return ApiService.fetchDataWithAxios<Website>({
        url: `/websites/${id}`,
        method: 'get',
    })
}

export async function apiUpdateWebsite(
    id: number,
    data: Partial<Website>,
) {
    return ApiService.fetchDataWithAxios<Website>({
        url: `/websites/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteWebsite(
    id: number,
) {
    return ApiService.fetchDataWithAxios<{ message: string }>({
        url: `/websites/${id}`,
        method: 'delete',
    })
}

export async function apiCrawlWebsite(
    id: number,
) {
    return ApiService.fetchDataWithAxios<{ message: string }>({
        url: `/websites/${id}/crawl`,
        method: 'post',
    })
}