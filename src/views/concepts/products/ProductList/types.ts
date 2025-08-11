export type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
    sales: number
    salesPercentage: number
}

export type ProductColumn = {
    id: number
    title: string
    slug: string
    image: string
    created_at: string
    updated_at: string
    // Optional fields for backward compatibility
    name?: string
    productCode?: string
    img?: string
    category?: string
    price?: number
    stock?: number
    status?: number
    sales?: number
    salesPercentage?: number
}

export type Filter = {
    minAmount: number | string
    maxAmount: number | string
    productStatus: string
    productType: string[]
}

export type GetProductListResponse = {
    list: Product[]
    total: number
}
