import { useState } from 'react'
import { Button } from '@/components/ui'
import { HiPlus, HiPencil, HiTrash, HiChevronRight, HiChevronDown } from 'react-icons/hi'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
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
        image: '',
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

    const handleReorder = (reorderedCategories: Category[]) => {
        setCategories(reorderedCategories)
        console.log('Categories reordered:', reorderedCategories)
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
                    <CategoriesTable 
                        categories={categories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        onReorder={handleReorder}
                    />
                </div>
            </AdaptiveCard>

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
        </Container>
    )
}

export default CategoryList