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
    role?: string
    status?: number
}

export type Filter = {
    userStatus: string
    userRole: string[]
}

export type GetUserListResponse = {
    list: User[]
    total: number
}