import { websitesData, getWebsiteById } from '../data/websiteData'

export default function websiteFakeApi(mock: any) {
    mock.onGet('/api/websites').reply((config: any) => {
        const { pageIndex = 0, pageSize = 10, sort, query } = config.params || {}
        
        let filteredWebsites = [...websitesData]
        
        // Apply search filter
        if (query) {
            const searchTerm = query.toLowerCase()
            filteredWebsites = filteredWebsites.filter(
                (website) =>
                    website.name.toLowerCase().includes(searchTerm) ||
                    website.url.toLowerCase().includes(searchTerm)
            )
        }
        
        // Apply sorting
        if (sort) {
            const { key, order } = sort
            filteredWebsites.sort((a: any, b: any) => {
                if (order === 'asc') {
                    return a[key] > b[key] ? 1 : -1
                }
                return a[key] < b[key] ? 1 : -1
            })
        }
        
        const total = filteredWebsites.length
        const start = pageIndex * pageSize
        const end = start + pageSize
        const paginatedWebsites = filteredWebsites.slice(start, end)
        
        const response = {
            list: paginatedWebsites,
            total,
        }
        
        return [200, response]
    })
    
    mock.onGet(/\/api\/websites\/\d+/).reply((config: any) => {
        const id = parseInt(config.url.split('/').pop())
        const website = getWebsiteById(id)
        
        if (website) {
            return [200, website]
        }
        
        return [404, { message: 'وب‌سایت یافت نشد' }]
    })
    
    mock.onPut(/\/api\/websites\/\d+/).reply((config: any) => {
        const id = parseInt(config.url.split('/').pop())
        const website = getWebsiteById(id)
        
        if (website) {
            const updatedData = JSON.parse(config.data)
            Object.assign(website, updatedData, { updated_at: new Date().toISOString() })
            return [200, website]
        }
        
        return [404, { message: 'وب‌سایت یافت نشد' }]
    })
    
    mock.onDelete(/\/api\/websites\/\d+/).reply((config: any) => {
        const id = parseInt(config.url.split('/').pop())
        const websiteIndex = websitesData.findIndex(w => w.id === id)
        
        if (websiteIndex !== -1) {
            websitesData.splice(websiteIndex, 1)
            return [200, { message: 'وب‌سایت با موفقیت حذف شد' }]
        }
        
        return [404, { message: 'وب‌سایت یافت نشد' }]
    })
    
    mock.onPost(/\/api\/websites\/\d+\/crawl/).reply((config: any) => {
        const id = parseInt(config.url.split('/')[2])
        const website = getWebsiteById(id)
        
        if (website) {
            // Simulate crawl process
            website.crawlerStatus = 'pending'
            website.lastCrawlDate = new Date().toISOString()
            
            // Simulate async crawl completion after 2 seconds
            setTimeout(() => {
                website.crawlerStatus = 'success'
                website.productCount += Math.floor(Math.random() * 50) + 1
            }, 2000)
            
            return [200, { message: 'کرال با موفقیت شروع شد' }]
        }
        
        return [404, { message: 'وب‌سایت یافت نشد' }]
    })
}