import { sellersData } from '../data/sellerData'
import type { Seller, Filter, GetSellerListResponse } from '@/views/concepts/sellers/SellerList/types'

export default function sellerFakeApi(mock: any) {
    mock.onGet('/sellers/all').reply((config: any) => {
        const { pageIndex = 0, pageSize = 10, sort, query } = config.params || {}
        
        let filteredSellers = [...sellersData]
        
        // Apply search filter
        if (query) {
            const searchTerm = query.toLowerCase()
            filteredSellers = filteredSellers.filter(
                (seller) =>
                    seller.name.toLowerCase().includes(searchTerm) ||
                    seller.email.toLowerCase().includes(searchTerm) ||
                    seller.phone?.includes(searchTerm)
            )
        }
        
        // Apply sorting
        if (sort) {
            const { key, order } = sort
            filteredSellers.sort((a: any, b: any) => {
                if (order === 'asc') {
                    return a[key] > b[key] ? 1 : -1
                }
                return a[key] < b[key] ? 1 : -1
            })
        }
        
        const total = filteredSellers.length
        const start = pageIndex * pageSize
        const end = start + pageSize
        const paginatedSellers = filteredSellers.slice(start, end)
        
        const response: GetSellerListResponse = {
            list: paginatedSellers,
            total,
        }
        
        return [200, response]
    })
    
    mock.onGet(/\/sellers\/.*/).reply((config: any) => {
        const idParam = config.url.split('/').pop()
        const id = parseInt(idParam)
        const seller = sellersData.find((s) => s.id === id)
        
        if (seller) {
            return [200, seller]
        }
        
        return [404, { message: 'Seller not found' }]
    })
    
    mock.onDelete(/\/sellers\/.*/).reply((config: any) => {
        const id = parseInt(config.url.split('/').pop())
        const index = sellersData.findIndex((s) => s.id === id)
        
        if (index !== -1) {
            sellersData.splice(index, 1)
            return [200, { message: 'Seller deleted successfully' }]
        }
        
        return [404, { message: 'Seller not found' }]
    })
    
    mock.onPut(/\/sellers\/.*/).reply((config: any) => {
        const id = parseInt(config.url.split('/').pop())
        const index = sellersData.findIndex((s) => s.id === id)
        
        if (index !== -1) {
            const updatedSeller = { ...sellersData[index], ...JSON.parse(config.data) }
            sellersData[index] = updatedSeller
            return [200, updatedSeller]
        }
        
        return [404, { message: 'Seller not found' }]
    })
    
    mock.onPost('/sellers').reply((config: any) => {
        const newSeller = JSON.parse(config.data)
        const seller: Seller = {
            id: Math.max(...sellersData.map(s => s.id)) + 1,
            ...newSeller,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
        
        sellersData.push(seller)
        return [201, seller]
    })
}