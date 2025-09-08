import type { Category } from '@/views/concepts/categories/CategoryList/hooks/useCategoryList'

interface GetCategoryListResponse {
    data: Category[]
    total: number
}

const mockCategories: Category[] = [
    {
        id: '1',
        name: 'الکترونیک',
        slug: 'electronics',
        description: 'محصولات الکترونیکی شامل موبایل، لپ تاپ و تجهیزات جانبی',
        level: 0,
        isActive: true,
        productsCount: 1250,
        image: '',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
    },
    {
        id: '2',
        name: 'مد و پوشاک',
        slug: 'fashion',
        description: 'لباس، کفش و اکسسوری های مد روز',
        level: 0,
        isActive: true,
        productsCount: 890,
        image: '/img/categories/fashion.jpg',
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-18T12:00:00Z'
    },
    {
        id: '3',
        name: 'موبایل و تبلت',
        slug: 'mobile-tablet',
        description: 'گوشی های هوشمند، تبلت و لوازم جانبی',
        parentId: '1',
        parentName: 'الکترونیک',
        level: 1,
        isActive: true,
        productsCount: 450,
        image: '/img/categories/mobile.jpg',
        createdAt: '2024-01-16T09:00:00Z',
        updatedAt: '2024-01-21T11:00:00Z'
    },
    {
        id: '4',
        name: 'لباس مردانه',
        slug: 'mens-clothing',
        description: 'پیراهن، شلوار، کت و جلیقه مردانه',
        parentId: '2',
        parentName: 'مد و پوشاک',
        level: 1,
        isActive: true,
        productsCount: 320,
        image: '/img/categories/mens-clothing.jpg',
        createdAt: '2024-01-12T07:30:00Z',
        updatedAt: '2024-01-19T15:00:00Z'
    },
    {
        id: '5',
        name: 'لباس زنانه',
        slug: 'womens-clothing',
        description: 'پیراهن، شلوار، مانتو و لباس مجلسی زنانه',
        parentId: '2',
        parentName: 'مد و پوشاک',
        level: 1,
        isActive: false,
        productsCount: 280,
        image: '/img/categories/womens-clothing.jpg',
        createdAt: '2024-01-11T10:30:00Z',
        updatedAt: '2024-01-17T09:00:00Z'
    }
]

const CategoryMockService = {
    async getCategoryList(): Promise<GetCategoryListResponse> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        return {
            data: mockCategories,
            total: mockCategories.length,
            success: true,
            message: 'Categories retrieved successfully'
        }
    },

    async getCategory(id: string) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const category = mockCategories.find(cat => cat.id === id)
        
        if (!category) {
            throw new Error('Category not found')
        }
        
        return { data: category }
    },

    async createCategory(data: any) {
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const newCategory: Category = {
            id: String(Date.now()),
            ...data,
            productsCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        
        mockCategories.push(newCategory)
        
        return { data: newCategory }
    },

    async updateCategory(id: string, data: any) {
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const index = mockCategories.findIndex(cat => cat.id === id)
        if (index === -1) {
            throw new Error('Category not found')
        }
        
        mockCategories[index] = {
            ...mockCategories[index],
            ...data,
            updatedAt: new Date().toISOString()
        }
        
        return { data: mockCategories[index] }
    },

    async deleteCategory(id: string) {
        await new Promise(resolve => setTimeout(resolve, 400))
        
        const index = mockCategories.findIndex(cat => cat.id === id)
        if (index === -1) {
            throw new Error('Category not found')
        }
        
        mockCategories.splice(index, 1)
        
        return { success: true }
    }
}

export default CategoryMockService