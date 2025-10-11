import { useEffect, useState } from 'react'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { apiGetCategoryList } from '@/services/CategoryService'
import type { Control, FieldErrors } from 'react-hook-form'
import type { ProductFormSchema } from '../types'

type Category = {
    id: number
    name: string
    slug: string
    parent_id: number | null
    created_at: string
    updated_at: string
}

type CategoryOption = {
    label: string
    value: string
    id: number
    parent_id: number | null
}

type HierarchicalCategorySelectProps = {
    control: Control<ProductFormSchema>
    errors: FieldErrors<ProductFormSchema>
    value?: string
    onChange?: (value: string | undefined) => void
}

const HierarchicalCategorySelect = ({ 
    control, 
    errors, 
    value, 
    onChange 
}: HierarchicalCategorySelectProps) => {
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [categoryLevels, setCategoryLevels] = useState<CategoryOption[][]>([])
    const [selectedCategories, setSelectedCategories] = useState<(CategoryOption | null)[]>([])
    const [loading, setLoading] = useState(true)

    // دریافت تمام دسته‌بندی‌ها از API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await apiGetCategoryList<{
                    message: string
                    categories: Category[]
                }>()
                
                setAllCategories(response.categories)
                
                // نمایش دسته‌بندی‌های سطح اول (parent_id === null)
                const rootCategories = response.categories
                    .filter(cat => cat.parent_id === null)
                    .map(cat => ({
                        label: cat.name,
                        value: cat.slug,
                        id: cat.id,
                        parent_id: cat.parent_id
                    }))
                
                setCategoryLevels([rootCategories])
                setSelectedCategories([null])
                
            } catch (error) {
                console.error('خطا در دریافت دسته‌بندی‌ها:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // بازسازی سلسله مراتب بر اساس مقدار موجود
    useEffect(() => {
        if (value && allCategories.length > 0) {
            reconstructHierarchy(value)
        }
    }, [value, allCategories])

    // بازسازی سلسله مراتب دسته‌بندی بر اساس slug انتخاب شده
    const reconstructHierarchy = (selectedSlug: string) => {
        const selectedCategory = allCategories.find(cat => cat.slug === selectedSlug)
        if (!selectedCategory) return

        // پیدا کردن مسیر از ریشه تا دسته‌بندی انتخاب شده
        const path: Category[] = []
        let current = selectedCategory
        
        while (current) {
            path.unshift(current)
            current = allCategories.find(cat => cat.id === current.parent_id) || null
        }

        // ساخت سطوح دسته‌بندی
        const newLevels: CategoryOption[][] = []
        const newSelected: (CategoryOption | null)[] = []

        for (let i = 0; i < path.length; i++) {
            const parentId = i === 0 ? null : path[i - 1].id
            
            // دسته‌بندی‌های این سطح
            const levelCategories = allCategories
                .filter(cat => cat.parent_id === parentId)
                .map(cat => ({
                    label: cat.name,
                    value: cat.slug,
                    id: cat.id,
                    parent_id: cat.parent_id
                }))
            
            newLevels.push(levelCategories)
            
            // دسته‌بندی انتخاب شده در این سطح
            const selectedInLevel = levelCategories.find(cat => cat.id === path[i].id)
            newSelected.push(selectedInLevel || null)
        }

        // اگر دسته‌بندی انتخاب شده زیرمجموعه دارد، سطح بعدی را نیز اضافه کن
        const hasChildren = allCategories.some(cat => cat.parent_id === selectedCategory.id)
        if (hasChildren) {
            const childCategories = allCategories
                .filter(cat => cat.parent_id === selectedCategory.id)
                .map(cat => ({
                    label: cat.name,
                    value: cat.slug,
                    id: cat.id,
                    parent_id: cat.parent_id
                }))
            
            newLevels.push(childCategories)
            newSelected.push(null)
        }

        setCategoryLevels(newLevels)
        setSelectedCategories(newSelected)
    }

    // انتخاب دسته‌بندی در سطح مشخص
    const handleCategorySelect = (levelIndex: number, selectedOption: CategoryOption | null) => {
        const newSelected = [...selectedCategories]
        const newLevels = [...categoryLevels]

        // تنظیم انتخاب در سطح فعلی
        newSelected[levelIndex] = selectedOption

        // حذف سطوح بعدی
        newSelected.splice(levelIndex + 1)
        newLevels.splice(levelIndex + 1)

        if (selectedOption) {
            // بررسی وجود زیرمجموعه
            const hasChildren = allCategories.some(cat => cat.parent_id === selectedOption.id)
            
            if (hasChildren) {
                // اضافه کردن سطح بعدی
                const childCategories = allCategories
                    .filter(cat => cat.parent_id === selectedOption.id)
                    .map(cat => ({
                        label: cat.name,
                        value: cat.slug,
                        id: cat.id,
                        parent_id: cat.parent_id
                    }))
                
                newLevels.push(childCategories)
                newSelected.push(null)
            }
        }

        setSelectedCategories(newSelected)
        setCategoryLevels(newLevels)

        // ارسال آخرین دسته‌بندی انتخاب شده
        const lastSelected = newSelected.filter(Boolean).pop()
        onChange?.(lastSelected?.value)
    }

    return (
        <div className="space-y-4">
            {categoryLevels.map((levelCategories, levelIndex) => (
                <FormItem
                    key={levelIndex}
                    label={`دسته‌بندی ${levelIndex === 0 ? 'اصلی' : `سطح ${levelIndex + 1}`}`}
                    invalid={levelIndex === 0 ? Boolean(errors.parent_id) : false}
                    errorMessage={levelIndex === 0 ? errors.parent_id?.message : undefined}
                >
                    <Select
                        placeholder={loading ? "در حال بارگذاری..." : "انتخاب کنید..."}
                        options={levelCategories}
                        isDisabled={loading}
                        value={selectedCategories[levelIndex]}
                        onChange={(option) => handleCategorySelect(levelIndex, option as CategoryOption | null)}
                        isClearable
                    />
                </FormItem>
            ))}
        </div>
    )
}

export default HierarchicalCategorySelect