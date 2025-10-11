import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Card,
    Button,
    Input,
    FormItem,
    FormContainer,
    Select,
    Switcher,
    Upload,
    Avatar,
    Notification,
    toast,
    Tabs
} from '@/components/ui'
import { HiOutlineArrowLeft, HiOutlineSave, HiOutlineX } from 'react-icons/hi'
import { MdCategory } from 'react-icons/md'

interface Category {
    id: string
    name: string
    slug: string
    description: string
    parentId?: string
    parentName?: string
    level: number
    isActive: boolean
    productsCount: number
    image?: string
    createdAt: string
    updatedAt: string
}

const CategoryForm = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const isEdit = Boolean(id)
    
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        parentId: '',
        isActive: true,
        image: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        sortOrder: 0
    })
    
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    
    // Mock categories data
    const mockCategories: Category[] = [
        { id: '1', name: 'الکترونیک', slug: 'electronics', description: 'محصولات الکترونیکی', parentId: '', level: 0, isActive: true, image: '', sortOrder: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '2', name: 'پوشاک', slug: 'clothing', description: 'انواع پوشاک', parentId: '', level: 0, isActive: true, image: '', sortOrder: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '3', name: 'موبایل', slug: 'mobile', description: 'گوشی موبایل', parentId: '1', level: 1, isActive: true, image: '', sortOrder: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ]
    
    useEffect(() => {
        // Load categories
        setCategories(mockCategories)
        
        // Load category data if editing
        if (isEdit && id) {
            const category = mockCategories.find(cat => cat.id === id)
            if (category) {
                setFormData({
                    name: category.name,
                    slug: category.slug,
                    description: category.description || '',
                    parentId: category.parentId || '',
                    sortOrder: category.sortOrder || 0,
                    isActive: category.isActive,
                    image: category.image || '',
                    metaTitle: '',
                    metaDescription: '',
                    metaKeywords: ''
                })
                setImagePreview(category.image || '')
            }
        }
    }, [isEdit, id])
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description,
                parentId: category.parentId || '',
                isActive: category.isActive,
                image: category.image || '',
                metaTitle: category.name,
                metaDescription: category.description,
                metaKeywords: '',
                sortOrder: 0
            })
            setImagePreview(category.image || '')
        }
    }, [category])

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
            .replace(/\s+/g, '-')
            .trim()
    }

    const handleNameChange = (value: string) => {
        setFormData({
            ...formData,
            name: value,
            slug: generateSlug(value)
        })
        if (errors.name) {
            setErrors({ ...errors, name: '' })
        }
    }

    const handleImageUpload = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0]
            setImageFile(file)
            
            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImageFile(null)
        setImagePreview('')
        setFormData({ ...formData, image: '' })
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'نام دسته‌بندی الزامی است'
        }

        if (!formData.slug.trim()) {
            newErrors.slug = 'نامک (Slug) الزامی است'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'توضیحات الزامی است'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.push(
                <Notification title="خطا" type="danger">
                    لطفاً فیلدهای الزامی را تکمیل کنید
                </Notification>
            )
            return
        }

        setLoading(true)
        try {
            const submitData = {
                ...formData,
                image: imagePreview || formData.image
            }
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            toast.push(
                <Notification title="موفقیت" type="success">
                    دسته‌بندی با موفقیت {isEdit ? 'به‌روزرسانی' : 'ایجاد'} شد
                </Notification>
            )
            navigate('/categories')
        } catch (error) {
            toast.push(
                <Notification title="خطا" type="danger">
                    خطا در {isEdit ? 'به‌روزرسانی' : 'ایجاد'} دسته‌بندی
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        navigate('/categories')
    }

    const parentCategories = categories.filter(cat => cat.level === 0)

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <MdCategory className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {isEdit ? 'ویرایش دسته‌بندی' : 'ایجاد دسته‌بندی جدید'}
                            </h2>
                            <p className="text-gray-600">
                                {isEdit ? 'اطلاعات دسته‌بندی را ویرایش کنید' : 'اطلاعات دسته‌بندی جدید را وارد کنید'}
                            </p>
                        </div>
                    </div>

                    <FormContainer>
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    اطلاعات پایه
                                </h3>
                                
                                <FormItem label="نام دسته‌بندی" asterisk invalid={!!errors.name} errorMessage={errors.name}>
                                    <Input
                                        placeholder="نام دسته‌بندی را وارد کنید"
                                        value={formData.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                    />
                                </FormItem>
                                
                                <FormItem label="نامک (Slug)" asterisk invalid={!!errors.slug} errorMessage={errors.slug}>
                                    <Input
                                        placeholder="نامک دسته‌بندی"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    />
                                </FormItem>
                                
                                <FormItem label="دسته‌بندی والد">
                                    <Select
                                        placeholder="انتخاب دسته‌بندی والد (اختیاری)"
                                        value={formData.parentId}
                                        onChange={(value) => setFormData({ ...formData, parentId: value as string })}
                                    >
                                        <Option value="">بدون والد (دسته‌بندی اصلی)</Option>
                                        {parentCategories.map((cat) => (
                                            <Option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormItem>
                                
                                <FormItem label="توضیحات" asterisk invalid={!!errors.description} errorMessage={errors.description}>
                                    <Input
                                        textArea
                                        placeholder="توضیحات دسته‌بندی را وارد کنید"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                    />
                                </FormItem>
                                
                                <FormItem label="ترتیب نمایش">
                                    <Input
                                        type="number"
                                        placeholder="ترتیب نمایش (عدد)"
                                        value={formData.sortOrder}
                                        onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                                    />
                                </FormItem>
                                
                                <FormItem>
                                    <div className="flex items-center gap-3">
                                        <Switcher
                                            checked={formData.isActive}
                                            onChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                        />
                                        <span className="text-sm text-gray-700">
                                            دسته‌بندی فعال باشد
                                        </span>
                                    </div>
                                </FormItem>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    تصویر دسته‌بندی
                                </h3>
                                
                                <FormItem label="تصویر">
                                    <div className="space-y-4">
                                        {imagePreview ? (
                                            <div className="relative inline-block">
                                                <Avatar
                                                    size="xl"
                                                    src={imagePreview}
                                                    icon={<TbCategory />}
                                                    className="border-2 border-gray-200"
                                                />
                                                <Button
                                                    size="xs"
                                                    variant="solid"
                                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1"
                                                    icon={<HiOutlineX />}
                                                    onClick={removeImage}
                                                />
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                                <TbCategory className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-600">هیچ تصویری انتخاب نشده</p>
                                            </div>
                                        )}
                                        
                                        <Upload
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            showList={false}
                                        >
                                            <Button
                                                variant="outline"
                                                icon={<HiOutlineUpload />}
                                                block
                                            >
                                                انتخاب تصویر
                                            </Button>
                                        </Upload>
                                        
                                        <p className="text-xs text-gray-500">
                                            فرمت‌های مجاز: JPG, PNG, GIF - حداکثر حجم: 2MB
                                        </p>
                                    </div>
                                </FormItem>
                                
                                <FormItem label="آدرس تصویر (جایگزین)">
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image}
                                        onChange={(e) => {
                                            setFormData({ ...formData, image: e.target.value })
                                            if (e.target.value && !imageFile) {
                                                setImagePreview(e.target.value)
                                            }
                                        }}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        {/* SEO Information */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                                تنظیمات سئو (SEO)
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <FormItem label="عنوان متا (Meta Title)">
                                    <Input
                                        placeholder="عنوان صفحه برای موتورهای جستجو"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        maxLength={60}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formData.metaTitle.length}/60 کاراکتر
                                    </p>
                                </FormItem>
                                
                                <FormItem label="کلمات کلیدی متا">
                                    <Input
                                        placeholder="کلمات کلیدی با کاما جدا شده"
                                        value={formData.metaKeywords}
                                        onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                                    />
                                </FormItem>
                            </div>
                            
                            <FormItem label="توضیحات متا (Meta Description)">
                                <Input
                                    textArea
                                    placeholder="توضیحات صفحه برای موتورهای جستجو"
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                    rows={3}
                                    maxLength={160}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.metaDescription.length}/160 کاراکتر
                                </p>
                            </FormItem>
                        </div>
                    </FormContainer>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t">
                        <Button
                            variant="plain"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            انصراف
                        </Button>
                        <Button
                            variant="solid"
                            onClick={handleSubmit}
                            loading={loading}
                            disabled={!formData.name.trim()}
                            icon={<HiOutlineSave />}
                        >
                            {isEdit ? 'به‌روزرسانی دسته‌بندی' : 'ذخیره دسته‌بندی'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CategoryForm