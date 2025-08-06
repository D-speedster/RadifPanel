export const websitesData = [
    {
        id: 1,
        name: 'فروشگاه دیجی‌کالا',
        url: 'https://www.digikala.com',
        isActive: true,
        lastCrawlDate: '2024-01-15T10:30:00',
        crawlerStatus: 'success' as const,
        productCount: 1250,
        created_at: '2023-01-15T10:30:00',
        updated_at: '2024-01-15T10:30:00'
    },
    {
        id: 2,
        name: 'فروشگاه بامیلو',
        url: 'https://www.bamilo.com',
        isActive: true,
        lastCrawlDate: '2024-01-14T15:45:00',
        crawlerStatus: 'pending' as const,
        productCount: 890,
        created_at: '2023-02-10T09:15:00',
        updated_at: '2024-01-14T15:45:00'
    },
    {
        id: 3,
        name: 'فروشگاه ترب',
        url: 'https://www.torob.com',
        isActive: false,
        lastCrawlDate: '2024-01-10T08:20:00',
        crawlerStatus: 'error' as const,
        productCount: 567,
        created_at: '2023-03-05T14:30:00',
        updated_at: '2024-01-10T08:20:00'
    },
    {
        id: 4,
        name: 'فروشگاه اسنپ‌مارکت',
        url: 'https://snappmarket.com',
        isActive: true,
        lastCrawlDate: null,
        crawlerStatus: 'unknown' as const,
        productCount: 0,
        created_at: '2024-01-01T12:00:00',
        updated_at: '2024-01-01T12:00:00'
    },
    {
        id: 5,
        name: 'فروشگاه کالا مارکت',
        url: 'https://www.kalamarket.com',
        isActive: true,
        lastCrawlDate: '2024-01-16T11:15:00',
        crawlerStatus: 'success' as const,
        productCount: 2100,
        created_at: '2023-06-20T16:45:00',
        updated_at: '2024-01-16T11:15:00'
    }
]

export const getWebsiteById = (id: number) => {
    return websitesData.find(website => website.id === id)
}