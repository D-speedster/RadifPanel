import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { HiX, HiUpload } from 'react-icons/hi'
import { faToEnSlug } from '@/utils/slugify'

interface Category {
    id: string
    name: string
    slug: string
    description?: string
    image?: string
    parent_id?: string | null
    children?: Category[]
    productCount?: number
    isExpanded?: boolean
    level?: number
}

interface CategoryModalProps {
    isOpen: boolean
    mode: 'add' | 'edit'
    category?: Category | null
    categories: Category[]
    onClose: () => void
    onSave: (categoryData: Partial<Category>) => void
}

const CategoryModal = ({ isOpen, mode, category, categories, onClose, onSave }: CategoryModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        parent_id: '',
        image: ''
    })
    const [autoSlug, setAutoSlug] = useState(true)

    // Helper function to build hierarchical category options
    const buildCategoryOptions = (categories: Category[], level = 0): JSX.Element[] => {
        const options: JSX.Element[] = []
        
        categories.forEach(cat => {
            // Add current category
            const indent = '—'.repeat(level)
            options.push(
                <option key={cat.id} value={cat.id}>
                    {indent} {cat.name}
                </option>
            )
            
            // Add children recursively
            if (cat.children && cat.children.length > 0) {
                options.push(...buildCategoryOptions(cat.children, level + 1))
            }
        })
        
        return options
    }

    // Get parent categories (categories without parent_id) and build tree structure
    const getParentCategoriesWithChildren = (): Category[] => {
        const parentCategories = categories.filter(cat => !cat.parent_id || cat.parent_id === null || cat.parent_id === '')
        // Build tree structure
        const buildTree = (parents: Category[]): Category[] => {
            return parents.map(parent => ({
                ...parent,
                children: categories.filter(cat => cat.parent_id === parent.id)
            }))
        }
        return buildTree(parentCategories)
    }

    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && category) {
                setFormData({
                    name: category.name || '',
                    slug: category.slug || '',
                    description: category.description || '',
                    parent_id: category.parent_id || '',
                    image: category.image || ''
                })
            } else {
                setFormData({
                    name: '',
                    slug: '',
                    description: '',
                    parent_id: '',
                    image: ''
                })
            }
        }
    }, [isOpen, mode, category])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        if (field === 'name' && autoSlug) {
            const slug = faToEnSlug(value)
            setFormData(prev => ({
                ...prev,
                slug
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            ...formData,
            parent_id: formData.parent_id || null
        })
    }

    if (!isOpen) return null

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div 
                className="bg-white w-full max-w-md mx-4"
                style={{
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                    maxHeight: '90vh',
                    overflow: 'auto'
                }}
            >
                {/* هدر مودال */}
                <div 
                    className="flex items-center justify-between p-6"
                    style={{ borderBottom: '1px solid #F7FAFC' }}
                >
                    <h2 
                        className="font-bold"
                        style={{
                            fontSize: '1.25rem',
                            color: '#1A202C'
                        }}
                    >
                        {mode === 'add' ? 'افزودن دسته‌بندی جدید' : 'ویرایش دسته‌بندی'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        style={{ color: '#A0AEC0' }}
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                </div>

                {/* محتوای مودال */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* نام دسته‌بندی */}
                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1A202C' }}
                        >
                            نام دسته‌بندی *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
                            style={{
                                borderColor: '#E2E8F0',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem'
                            }}
                            placeholder="نام دسته‌بندی را وارد کنید"
                            required
                        />
                    </div>

                    {/* اسلاگ */}
                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1A202C' }}
                        >
                            اسلاگ
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleInputChange('slug', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors font-mono"
                            style={{
                                borderColor: '#E2E8F0',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem',
                                backgroundColor: autoSlug ? '#F7FAFC' : 'white'
                            }}
                            placeholder="category-slug"
                            disabled={autoSlug}
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={autoSlug}
                                onChange={(e) => {
                                    const checked = e.target.checked
                                    setAutoSlug(checked)
                                    if (checked) {
                                        setFormData(prev => ({
                                            ...prev,
                                            slug: faToEnSlug(prev.name)
                                        }))
                                    }
                                }}
                            />
                            <span className="text-sm" style={{ color: '#4A5568' }}>
                                تولید خودکار اسلاگ انگلیسی از نام
                            </span>
                        </div>
                    </div>

                    {/* دسته‌بندی مادر */}
                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1A202C' }}
                        >
                            دسته‌بندی مادر
                        </label>
                        <select
                            value={formData.parent_id}
                            onChange={(e) => handleInputChange('parent_id', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
                            style={{
                                borderColor: '#E2E8F0',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="">بدون دسته‌بندی مادر</option>
                            {buildCategoryOptions(getParentCategoriesWithChildren())}
                        </select>
                    </div>

                    {/* توضیحات */}
                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1A202C' }}
                        >
                            توضیحات
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none"
                            style={{
                                borderColor: '#E2E8F0',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem'
                            }}
                            placeholder="توضیحات اختیاری برای دسته‌بندی"
                        />
                    </div>

                    {/* آپلود تصویر */}
                    <div>
                        <label 
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1A202C' }}
                        >
                            تصویر دسته‌بندی
                        </label>
                        <div 
                            className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                            style={{ borderColor: '#E2E8F0' }}
                        >
                            <HiUpload 
                                className="mx-auto mb-2" 
                                style={{ 
                                    color: '#A0AEC0',
                                    fontSize: '2rem'
                                }} 
                            />
                            <p style={{ color: '#A0AEC0', fontSize: '0.85rem' }}>
                                کلیک کنید یا فایل را اینجا بکشید
                            </p>
                        </div>
                    </div>

                    {/* دکمه‌های عملیات */}
                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            type="submit"
                            variant="solid"
                            className="flex-1"
                            style={{
                                backgroundColor: '#7A52F4',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}
                        >
                            {mode === 'add' ? 'ایجاد دسته‌بندی' : 'ذخیره تغییرات'}
                        </Button>
                        <Button
                            type="button"
                            variant="plain"
                            onClick={onClose}
                            style={{
                                color: '#A0AEC0',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}
                        >
                            انصراف
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal