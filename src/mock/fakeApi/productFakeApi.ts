import { mock } from '../MockAdapter'
import { productListData } from '../data/productData'
import type { GetProductListResponse } from '@/views/concepts/products/ProductList/types'

// Mock API for getting product list
mock.onGet('/api/products').reply((config) => {
    const { pageIndex = 1, pageSize = 10 } = config.params || {}
    
    const startIndex = (pageIndex - 1) * pageSize
    const endIndex = startIndex + pageSize
    
    const paginatedData = productListData.slice(startIndex, endIndex)
    
    const response: GetProductListResponse = {
        list: paginatedData,
        total: productListData.length
    }
    
    return [200, response]
})

// Mock API for getting single product
mock.onGet(/\/api\/products\/\d+/).reply((config) => {
    const url = config.url || ''
    const productId = url.split('/').pop()
    
    const product = productListData.find(p => p.id === productId)
    
    if (product) {
        return [200, product]
    } else {
        return [404, { message: 'Product not found' }]
    }
})