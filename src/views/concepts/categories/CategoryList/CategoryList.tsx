import { useState } from 'react'
import { Button } from '@/components/ui'
import { HiPlus, HiPencil, HiTrash, HiChevronRight, HiChevronDown } from 'react-icons/hi'
import CategoriesTable from './components/CategoriesTable'
import CategoryModal from './components/CategoryModal'
import ConfirmationDialog from './components/ConfirmationDialog'

// Enhanced category type with tree structure support
interface Category {
    id: string
    name: string
    slug: string
    description?: string
    image?: string
    parentId?: string | null
    children?: Category[]
    productCount: number
    isExpanded?: boolean
    level?: number
}

// Mock data for categories with tree structure
const mockCategories: Category[] = [
    {
        id: '1',
        name: 'الکترونیک',
        slug: 'electronics',
        description: 'محصولات الکترونیکی و دیجیتال',
        image: '/img/categories/electronics.jpg',
        parentId: null,
        productCount: 1250,
        isExpanded: true,
        children: [
            {
                id: '2',
                name: 'موبایل و تبلت',
                slug: 'mobile-tablet',
                parentId: '1',
                productCount: 450,
                isExpanded: false,
                children: [
                    {
                        id: '3',
                        name: 'گوشی هوشمند',
                        slug: 'smartphones',
                        parentId: '2',
                        productCount: 320,
                    },
                    {
                        id: '4',
                        name: 'تبلت',
                        slug: 'tablets',
                        parentId: '2',
                        productCount: 130,
                    }
                ]
            },
            {
                id: '5',
                name: 'لپ تاپ و کامپیوتر',
                slug: 'laptop-computer',
                parentId: '1',
                productCount: 280,
            },
            {
                id: '6',
                name: 'لوازم جانبی',
                slug: 'accessories',
                parentId: '1',
                productCount: 520,
            }
        ]
    },
    {
        id: '7',
        name: 'پوشاک و مد',
        slug: 'fashion',
        description: 'لباس، کفش و اکسسوری',
        parentId: null,
        productCount: 890,
        isExpanded: false,
        children: [
            {
                id: '8',
                name: 'لباس مردانه',
                slug: 'mens-clothing',
                parentId: '7',
                productCount: 340,
            },
            {
                id: '9',
                name: 'لباس زنانه',
                slug: 'womens-clothing',
                parentId: '7',
                productCount: 420,
            },
            {
                id: '10',
                name: 'کفش',
                slug: 'shoes',
                parentId: '7',
                productCount: 130,
            }
        ]
    },
    {
        id: '11',
        name: 'خانه و آشپزخانه',
        slug: 'home-kitchen',
        description: 'لوازم خانگی و آشپزخانه',
        parentId: null,
        productCount: 650,
        isExpanded: false
    }
]

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>(mockCategories)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')

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

    const confirmDelete = () => {
        if (selectedCategory) {
            // Here you would call the API to delete the category
            console.log('Deleting category:', selectedCategory.id)
            setIsDeleteDialogOpen(false)
            setSelectedCategory(null)
        }
    }

    const handleSaveCategory = (categoryData: Partial<Category>) => {
        if (modalMode === 'add') {
            // Add new category logic
            console.log('Adding category:', categoryData)
        } else {
            // Edit category logic
            console.log('Editing category:', categoryData)
        }
        setIsModalOpen(false)
        setSelectedCategory(null)
    }

    return (
        <div 
            className="min-h-screen" 
            style={{ 
                backgroundColor: '#F8F9FC',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
        >
            {/* هدر صفحه */}
            <div 
                className="bg-white" 
                style={{ 
                    padding: '2rem 2.5rem',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.03)',
                    borderBottom: '1px solid #E2E8F0'
                }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 
                            className="font-bold mb-2" 
                            style={{ 
                                fontSize: '2rem',
                                color: '#1A202C',
                                lineHeight: '1.2',
                                letterSpacing: '-0.025em'
                            }}
                        >
                            دسته‌بندی محصولات
                        </h1>
                        <p style={{ 
                            color: '#A0AEC0', 
                            fontSize: '0.9rem',
                            fontWeight: '400'
                        }}>
                            مدیریت و سازماندهی دسته‌بندی‌های فروشگاه
                        </p>
                    </div>
                    <Button 
                        variant="solid" 
                        size="lg"
                        className="flex items-center gap-2"
                        style={{
                            backgroundColor: '#7A52F4',
                            color: 'white',
                            padding: '0.875rem 1.75rem',
                            borderRadius: '1rem',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px 0 rgb(122 82 244 / 0.3)',
                            border: 'none'
                        }}
                        onClick={handleAddCategory}
                    >
                        <HiPlus className="text-lg" />
                        افزودن دسته‌بندی جدید
                    </Button>
                </div>
            </div>
            
            {/* محتوای اصلی */}
            <div style={{ padding: '2.5rem' }}>
                <CategoriesTable 
                    categories={categories}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                />
            </div>

            {/* مودال افزودن/ویرایش */}
            <CategoryModal
                isOpen={isModalOpen}
                mode={modalMode}
                category={selectedCategory}
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
        </div>
    )
}

export default CategoryList