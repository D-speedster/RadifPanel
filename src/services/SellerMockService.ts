interface Seller {
    id: string
    name: string
    email: string
    phone: string
    status: 'active' | 'inactive' | 'pending'
    product_count: number
    role: string
    created_at: string
    updated_at: string
    avatar?: string
    // Additional fields for compatibility
    company?: string
    totalProducts?: number
    totalOrders?: number
    totalRevenue?: number
    rating?: number
    joinDate?: string
    lastActive?: string
    address?: string
    description?: string
}

interface GetSellerListResponse {
    list: Seller[]
    total: number
}

const mockSellers: Seller[] = [
    {
        id: '1',
        name: 'علی رضایی',
        email: 'ali.rezaei@example.com',
        phone: '09123456789',
        status: 'active',
        product_count: 156,
        role: 'premium',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-03-15T14:30:00Z',
        avatar: '/img/avatars/seller1.jpg',
        company: 'فروشگاه دیجیتال رضا',
        totalProducts: 156,
        totalOrders: 1243,
        totalRevenue: 125000000,
        rating: 4.8,
        joinDate: '2024-01-15T10:00:00Z',
        lastActive: '2024-03-15T14:30:00Z',
        address: 'تهران، خیابان ولیعصر',
        description: 'تخصص در محصولات دیجیتال و الکترونیک'
    },
    {
        id: '2',
        name: 'زهرا محمدی',
        email: 'zahra.mohammadi@example.com',
        phone: '09129876543',
        status: 'active',
        product_count: 89,
        role: 'standard',
        created_at: '2024-02-01T09:00:00Z',
        updated_at: '2024-03-14T16:45:00Z',
        avatar: '/img/avatars/seller2.jpg',
        company: 'زیبایی و مد زهرا',
        totalProducts: 89,
        totalOrders: 876,
        totalRevenue: 89000000,
        rating: 4.6,
        joinDate: '2024-02-01T09:00:00Z',
        lastActive: '2024-03-14T16:45:00Z',
        address: 'اصفهان، چهارراه خواجو',
        description: 'پوشاک زنانه و اکسسوری'
    },
    {
        id: '3',
        name: 'حسین احمدی',
        email: 'hossein.ahmadi@example.com',
        phone: '09121234567',
        status: 'pending',
        product_count: 45,
        role: 'standard',
        created_at: '2024-03-01T11:00:00Z',
        updated_at: '2024-03-15T10:15:00Z',
        avatar: '/img/avatars/seller3.jpg',
        company: 'کفش و پوشاک حسین',
        totalProducts: 45,
        totalOrders: 234,
        totalRevenue: 45000000,
        rating: 4.2,
        joinDate: '2024-03-01T11:00:00Z',
        lastActive: '2024-03-15T10:15:00Z',
        address: 'شیراز، خیابان انقلاب',
        description: 'تخصص در کفش و پوشاک مردانه'
    },
    {
        id: '4',
        name: 'فاطمه کریمی',
        email: 'fatemeh.karimi@example.com',
        phone: '09122345678',
        status: 'active',
        product_count: 203,
        role: 'premium',
        created_at: '2023-12-10T08:30:00Z',
        updated_at: '2024-03-15T15:20:00Z',
        avatar: '/img/avatars/seller4.jpg',
        company: 'خانه و آشپزخانه فاطمه',
        totalProducts: 203,
        totalOrders: 1567,
        totalRevenue: 234000000,
        rating: 4.9,
        joinDate: '2023-12-10T08:30:00Z',
        lastActive: '2024-03-15T15:20:00Z',
        address: 'تبریز، خیابان امام',
        description: 'محصولات خانگی و آشپزخانه'
    },
    {
        id: '5',
        name: 'محمد جوادی',
        email: 'mohammad.javadi@example.com',
        phone: '09123456780',
        status: 'inactive',
        product_count: 78,
        role: 'basic',
        created_at: '2024-01-20T14:00:00Z',
        updated_at: '2024-02-28T12:00:00Z',
        avatar: '/img/avatars/seller5.jpg',
        company: 'کتاب و لوازم التحریر محمد',
        totalProducts: 78,
        totalOrders: 445,
        totalRevenue: 67000000,
        rating: 4.4,
        joinDate: '2024-01-20T14:00:00Z',
        lastActive: '2024-02-28T12:00:00Z',
        address: 'مشهد، خیابان احمدآباد',
        description: 'کتاب، لوازم التحریر و محصولات فرهنگی'
    }
]

const SellerMockService = {
    async getSellerList(params: any): Promise<GetSellerListResponse> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        let filteredSellers = [...mockSellers]
        
        // Apply filters based on params
        if (params.query) {
            const query = params.query.toLowerCase()
            filteredSellers = filteredSellers.filter(seller => 
                seller.name.toLowerCase().includes(query) ||
                seller.company.toLowerCase().includes(query) ||
                seller.email.toLowerCase().includes(query)
            )
        }
        
        if (params.sellerStatus) {
            filteredSellers = filteredSellers.filter(seller => seller.status === params.sellerStatus)
        }
        
        // Apply pagination
        const pageIndex = params.pageIndex || 0
        const pageSize = params.pageSize || 10
        const startIndex = pageIndex * pageSize
        const endIndex = startIndex + pageSize
        
        const paginatedSellers = filteredSellers.slice(startIndex, endIndex)
        
        return {
            list: paginatedSellers,
            total: filteredSellers.length
        }
    },

    async getSeller(id: string) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const seller = mockSellers.find(s => s.id === id)
        
        if (!seller) {
            throw new Error('Seller not found')
        }
        
        return { data: seller }
    },

    async createSeller(data: any) {
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const newSeller: Seller = {
            id: String(Date.now()),
            ...data,
            product_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Additional fields for compatibility
            totalProducts: 0,
            totalOrders: 0,
            totalRevenue: 0,
            rating: 0,
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString()
        }
        
        mockSellers.push(newSeller)
        
        return { data: newSeller }
    },

    async updateSeller(id: string, data: any) {
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const index = mockSellers.findIndex(s => s.id === id)
        if (index === -1) {
            throw new Error('Seller not found')
        }
        
        mockSellers[index] = {
            ...mockSellers[index],
            ...data,
            updated_at: new Date().toISOString(),
            lastActive: new Date().toISOString()
        }
        
        return { data: mockSellers[index] }
    },

    async deleteSeller(id: string) {
        await new Promise(resolve => setTimeout(resolve, 400))
        
        const index = mockSellers.findIndex(s => s.id === id)
        if (index === -1) {
            throw new Error('Seller not found')
        }
        
        mockSellers.splice(index, 1)
        
        return { success: true }
    }
}

export default SellerMockService