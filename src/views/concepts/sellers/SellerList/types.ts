export type Seller = {
    id: number
    name: string
    email: string
    avatar?: string
    created_at: string
    updated_at: string
    phone?: string
    role?: string
    status: 'active' | 'inactive' | 'pending'
    product_count?: number
    // Optional fields for backward compatibility
    username?: string
}

export type Filter = {
    sellerStatus: string
    sellerRole: string[]
}

export type GetSellerListResponse = {
    list: Seller[]
    total: number
}