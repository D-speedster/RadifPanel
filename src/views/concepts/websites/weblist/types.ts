export type Website = {
    id: number
    name: string
    url: string
    isActive: boolean
    lastCrawlDate: string | null
    crawlerStatus: 'success' | 'error' | 'pending' | 'unknown'
    productCount: number
    created_at: string
    updated_at: string
}

export type WebsiteColumn = {
    id: number
    name: string
    url: string
    isActive: boolean
    lastCrawlDate: string | null
    crawlerStatus: 'success' | 'error' | 'pending' | 'unknown'
    productCount: number
    created_at: string
    updated_at: string
}

export type WebsiteFilter = {
    status: string
    crawlerStatus: string
    dateRange: string[]
}

export type GetWebsiteListResponse = {
    list: Website[]
    total: number
}
