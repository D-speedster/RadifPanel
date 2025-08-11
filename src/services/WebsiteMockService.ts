// Mock service for websites since /api/websites endpoint doesn't exist
import type { GetWebsiteListResponse, Website } from '@/views/concepts/websites/weblist/types'

// Mock data for websites
const mockWebsites: Website[] = [
    {
        id: 1,
        name: 'فروشگاه آنلاین رادیف',
        url: 'https://shop.radif.org',
        isActive: true,
        lastCrawlDate: '2024-01-20T14:45:00Z',
        crawlerStatus: 'success',
        productCount: 150,
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-20T14:45:00Z'
    },
    {
        id: 2,
        name: 'بلاگ رادیف',
        url: 'https://blog.radif.org',
        isActive: true,
        lastCrawlDate: '2024-01-18T16:20:00Z',
        crawlerStatus: 'pending',
        productCount: 0,
        created_at: '2024-01-10T09:15:00Z',
        updated_at: '2024-01-18T16:20:00Z'
    },
    {
        id: 3,
        name: 'پنل مدیریت',
        url: 'https://admin.radif.org',
        isActive: false,
        lastCrawlDate: null,
        crawlerStatus: 'error',
        productCount: 0,
        created_at: '2024-01-05T08:00:00Z',
        updated_at: '2024-01-22T11:30:00Z'
    },
    {
        id: 4,
        name: 'API مستندات',
        url: 'https://docs.radif.org',
        isActive: true,
        lastCrawlDate: '2024-01-19T10:15:00Z',
        crawlerStatus: 'success',
        productCount: 25,
        created_at: '2024-01-12T13:45:00Z',
        updated_at: '2024-01-19T10:15:00Z'
    },
    {
        id: 5,
        name: 'پشتیبانی مشتریان',
        url: 'https://support.radif.org',
        isActive: true,
        lastCrawlDate: '2024-01-21T15:10:00Z',
        crawlerStatus: 'unknown',
        productCount: 5,
        created_at: '2024-01-08T12:20:00Z',
        updated_at: '2024-01-21T15:10:00Z'
    }
]

export async function apiGetWebsitesList(
    params: Record<string, unknown> = {},
): Promise<GetWebsiteListResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const { page = 1, limit = 10, search = '' } = params
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const searchStr = String(search).toLowerCase()
    
    // Filter websites based on search
    let filteredWebsites = mockWebsites
    if (searchStr) {
        filteredWebsites = mockWebsites.filter(website => 
            website.name.toLowerCase().includes(searchStr) ||
            website.url.toLowerCase().includes(searchStr)
        )
    }
    
    // Pagination
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedWebsites = filteredWebsites.slice(startIndex, endIndex)
    
    return {
        list: paginatedWebsites,
        total: filteredWebsites.length
    }
}

export async function apiGetWebsite(
    id: number,
): Promise<Website> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const website = mockWebsites.find(w => w.id === id)
    if (!website) {
        throw new Error(`Website with id ${id} not found`)
    }
    
    return website
}

export async function apiUpdateWebsite(
    id: number,
    data: Partial<Website>,
): Promise<Website> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const websiteIndex = mockWebsites.findIndex(w => w.id === id)
    if (websiteIndex === -1) {
        throw new Error(`Website with id ${id} not found`)
    }
    
    // Update the website
    mockWebsites[websiteIndex] = {
        ...mockWebsites[websiteIndex],
        ...data,
        updated_at: new Date().toISOString()
    }
    
    return mockWebsites[websiteIndex]
}

export async function apiDeleteWebsite(
    id: number,
): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const websiteIndex = mockWebsites.findIndex(w => w.id === id)
    if (websiteIndex === -1) {
        throw new Error(`Website with id ${id} not found`)
    }
    
    // Remove the website
    mockWebsites.splice(websiteIndex, 1)
    
    return { message: 'Website deleted successfully' }
}

export async function apiCrawlWebsite(
    id: number,
): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const website = mockWebsites.find(w => w.id === id)
    if (!website) {
        throw new Error(`Website with id ${id} not found`)
    }
    
    return { message: `Crawling started for ${website.name}` }
}