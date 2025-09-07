import ApiService from './ApiService'
import type { Website, GetWebsiteListResponse } from '@/views/concepts/websites/weblist/types'

function normalizeStatus(value: any): Website['crawlerStatus'] {
    const s = String(value ?? '').toLowerCase()
    if (['success', 'ok', 'done', 'completed', 'complete'].includes(s)) return 'success'
    if (['error', 'failed', 'fail'].includes(s)) return 'error'
    if (['pending', 'in_progress', 'queued', 'queue', 'running', 'processing'].includes(s)) return 'pending'
    return 'unknown'
}

function coalesce<T>(...vals: T[]): T | undefined {
    for (const v of vals) if (v !== undefined && v !== null) return v
    return undefined
}

function toNumber(val: any, fallback = 0): number {
    const n = Number(val)
    return Number.isFinite(n) ? n : fallback
}

function normalizeWebsite(input: any): Website {
    const id = toNumber(coalesce(input?.id, input?.website_id, input?.ID, input?._id), 0)
    const name = String(coalesce(input?.name, input?.title, input?.domain, 'نامشخص'))
    const url = String(coalesce(input?.url, input?.link, input?.domain, ''))
    const isActive = Boolean(coalesce(input?.isActive, input?.active, input?.is_active, input?.status === 'active', true))
    const lastCrawlDate = coalesce(input?.lastCrawlDate, input?.last_crawl_date, input?.lastCrawlAt, input?.last_crawl_at) ?? null
    const statusRaw = coalesce(input?.crawlerStatus, input?.crawler_status, input?.status, 'unknown')
    const crawlerStatus = normalizeStatus(statusRaw)
    const productCount = toNumber(coalesce(input?.productCount, input?.product_count, input?.productsCount, input?.products_count), 0)
    const created_at = String(coalesce(input?.created_at, input?.createdAt, new Date().toISOString()))
    const updated_at = String(coalesce(input?.updated_at, input?.updatedAt, new Date().toISOString()))

    return { id, name, url, isActive, lastCrawlDate, crawlerStatus, productCount, created_at, updated_at }
}

export async function apiGetWebsitesList<T, U extends Record<string, unknown>>(
    params: U,
): Promise<T> {
    try {
        const response: any = await ApiService.fetchDataWithAxios<any>({
            url: '/websites/all',
            method: 'get',
            params,
            headers: { Accept: 'application/json' },
        })

        // If already in expected format
        if (response && Array.isArray(response.list)) {
            return response as T
        }

        let items: any[] = []
        if (Array.isArray(response)) {
            items = response
        } else if (Array.isArray(response?.websites)) {
            items = response.websites
        } else if (Array.isArray(response?.data)) {
            items = response.data
        } else if (Array.isArray(response?.items)) {
            items = response.items
        }

        if (items.length) {
            const list = items.map(normalizeWebsite)
            const result: GetWebsiteListResponse = { list, total: list.length }
            return result as unknown as T
        }

        // Fallback to empty
        return { list: [], total: 0 } as unknown as T
    } catch (error) {
        // Graceful fallback to avoid UI crash
        return { list: [], total: 0 } as unknown as T
    }
}

export async function apiGetWebsite<T>(id: number): Promise<T> {
    const response: any = await ApiService.fetchDataWithAxios<any>({
        url: `/websites/${id}`,
        method: 'get',
        headers: { Accept: 'application/json' },
    })

    // Some APIs wrap the entity
    const raw = response?.website ?? response?.data ?? response
    const normalized = normalizeWebsite(raw)
    return normalized as T
}

export async function apiUpdateWebsite<T, U extends Record<string, unknown>>(
    id: number,
    data: U,
): Promise<T> {
    return ApiService.fetchDataWithAxios<T>({
        url: `/websites/${id}`,
        method: 'put',
        data,
        headers: { Accept: 'application/json' },
    })
}

export async function apiDeleteWebsite<T>(id: number): Promise<T> {
    return ApiService.fetchDataWithAxios<T>({
        url: `/websites/${id}`,
        method: 'delete',
        headers: { Accept: 'application/json' },
    })
}

export async function apiCrawlWebsite<T>(id: number): Promise<T> {
    // Endpoint assumption; adjust if backend differs
    return ApiService.fetchDataWithAxios<T>({
        url: `/websites/${id}/crawl`,
        method: 'post',
        headers: { Accept: 'application/json' },
    })
}