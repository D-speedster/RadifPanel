export type User = {
    id: number
    name: string
    email: string
    avatar?: string
    created_at: string
    updated_at: string
    // Optional fields for backward compatibility
    username?: string
    phone?: string
    mobile?: string
    role?: string
    status?: number | string
    // Role-specific fields
    shop_name?: string
    business_license?: string
    bank_account?: string
    department?: string
    access_level?: string
    shift?: string
    work_area?: string
}

export type Filter = {
    userStatus: string
    userRole: string[]
}

export type GetUserListResponse = {
    list: User[]
    total: number
}