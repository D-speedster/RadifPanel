import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { HiPlus, HiPencil, HiTrash, HiChevronRight, HiChevronDown } from 'react-icons/hi'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import CategoryTreeView from './components/CategoryTreeView'
import CategoryModal from './components/CategoryModal'
import ConfirmationDialog from './components/ConfirmationDialog'
import { apiCreateCategory, apiGetCategoryList, apiDeleteCategory, apiUpdateCategory } from '@/services/CategoryService'

// Enhanced category type with tree structure support
interface Category {
    id: string | number
    name: string
    slug: string
    description?: string
    image?: string
    parent_id?: string | number | null
    children?: Category[]
    productCount?: number
    isExpanded?: boolean
    level?: number
}



// Function to convert flat list to tree structure
const buildCategoryTree = (categories: Category[]): Category[] => {
    const categoryMap = new Map<string | number, Category>()
    const rootCategories: Category[] = []

    // First pass: create map of all categories
    categories.forEach(category => {
        categoryMap.set(category.id, { ...category, children: [], level: 0 })
    })

    // Second pass: build tree structure
    categories.forEach(category => {
        const categoryNode = categoryMap.get(category.id)!
        
        if (category.parent_id && categoryMap.has(category.parent_id)) {
            // This is a child category
            const parent = categoryMap.get(category.parent_id)!
            categoryNode.level = (parent.level || 0) + 1
            parent.children!.push(categoryNode)
        } else {
            // This is a root category
            categoryNode.level = 0
            rootCategories.push(categoryNode)
        }
    })

    return rootCategories
}

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // Process API response to flat categories array
    const processApiResponse = (response: any): Category[] => {
        let flatCategories: Category[] = []
        
        // Handle different response structures
        if (Array.isArray(response)) {
            // Direct array response
            flatCategories = response.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image: cat.image,
                parent_id: cat.parent_id,
                children: [],
                productCount: cat.product_count || 0,
                isExpanded: false,
                level: 0
            }))
        } else if (response && response.categories && Array.isArray(response.categories)) {
            // Response with categories property
            flatCategories = response.categories.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image: cat.image,
                parent_id: cat.parent_id,
                children: [],
                productCount: cat.product_count || 0,
                isExpanded: false,
                level: 0
            }))
        } else if (response && response.data && response.data.categories && Array.isArray(response.data.categories)) {
            // Response with data.categories property
            flatCategories = response.data.categories.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image: cat.image,
                parent_id: cat.parent_id,
                children: [],
                productCount: cat.product_count || 0,
                isExpanded: false,
                level: 0
            }))
        }
        
        return flatCategories
    }

    // Convert flat categories to hierarchical tree structure
    const buildCategoryTree = (flatCategories: Category[]): Category[] => {
        const categoryMap = new Map<string | number, Category>()
        const rootCategories: Category[] = []

        // First pass: create a map of all categories
        flatCategories.forEach(category => {
            categoryMap.set(category.id, { ...category, children: [] })
        })

        // Second pass: build the tree structure
        flatCategories.forEach(category => {
            const categoryWithChildren = categoryMap.get(category.id)!
            
            if (!category.parent_id || category.parent_id === null || category.parent_id === '') {
                // This is a root category
                rootCategories.push(categoryWithChildren)
            } else {
                // This is a child category
                const parent = categoryMap.get(category.parent_id)
                if (parent) {
                    parent.children = parent.children || []
                    parent.children.push(categoryWithChildren)
                }
            }
        })

        return rootCategories
    }

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await apiGetCategoryList<{ categories: any[] }>()
                
                const flatCategories = processApiResponse(response)
                
                // Convert flat list to tree structure
                const treeCategories = buildCategoryTree(flatCategories)
                setCategories(treeCategories)
            } catch (error) {
                console.error('Error fetching categories:', error)
                setCategories([])
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // Handler functions
    const handleAddCategory = () => {
        setModalMode('add')
        setSelectedCategory(null)
        setIsModalOpen(true)
    }

    const handleEditCategory = (category: Category) => {
        setModalMode('edit')
        setSelectedCategory(category)
        setIsModalOpen(true)
    }

    const handleDeleteCategory = (category: Category) => {
        setSelectedCategory(category)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (!selectedCategory) return
        
        try {
            await apiDeleteCategory(selectedCategory.id)
            await refreshCategories()
            setIsDeleteDialogOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            // Handle error silently or show user-friendly message
        }
    }

    // Function to refresh categories list
    const refreshCategories = async () => {
        try {
            setLoading(true)
            const response = await apiGetCategoryList<{ categories: any[] }>()
            
            const flatCategories = processApiResponse(response)
            
            // Convert flat list to tree structure
            const treeCategories = buildCategoryTree(flatCategories)
            setCategories(treeCategories)
        } catch (error) {
            console.error('Error refreshing categories:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveCategory = async (categoryData: Partial<Category>) => {
        try {
            // Prepare data for API
            const apiData: any = {
                name: categoryData.name || '',
                slug: categoryData.slug || ''
            }
            
            // Only include parent_id if it has a valid value
            if (categoryData.parent_id && categoryData.parent_id !== '') {
                apiData.parent_id = parseInt(String(categoryData.parent_id))
            }

            if (modalMode === 'add') {
                await apiCreateCategory(apiData)
            } else if (modalMode === 'edit' && selectedCategory) {
                await apiUpdateCategory(selectedCategory.id, apiData)
            }
            
            await refreshCategories()
            setIsModalOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            console.error('Error saving category:', error)
            // Handle error silently or show user-friendly message
        }
    }

    const handleReorder = (reorderedCategories: Category[]) => {
        setCategories(reorderedCategories)
    }

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-6">
                    {/* هدر صفحه */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                دسته‌بندی محصولات
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                مدیریت و سازماندهی دسته‌بندی‌های فروشگاه
                            </p>
                        </div>
                        <Button 
                            variant="solid" 
                            size="sm"
                            icon={<HiPlus />}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={handleAddCategory}
                        >
                            افزودن دسته‌بندی جدید
                        </Button>
                    </div>
                    
                    {/* محتوای اصلی */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                                <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری دسته‌بندی‌ها...</p>
                            </div>
                        </div>
                    ) : (
                        <CategoryTreeView 
                            categories={buildCategoryTree(categories)}
                            onEdit={handleEditCategory}
                            onDelete={handleDeleteCategory}
                        />
                    )}
                </div>
            </AdaptiveCard>

            {/* مودال افزودن/ویرایش */}
            <CategoryModal
                isOpen={isModalOpen}
                mode={modalMode}
                category={selectedCategory}
                categories={categories}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCategory}
            />

            {/* دیالوگ تایید حذف */}
            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                title="حذف دسته‌بندی"
                message={`آیا از حذف دسته‌بندی "${selectedCategory?.name}" اطمینان دارید؟`}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteDialogOpen(false)}
            />
        </Container>
    )
}

export default CategoryList