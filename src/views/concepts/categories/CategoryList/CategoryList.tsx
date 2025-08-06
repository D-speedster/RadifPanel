import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    Button,
    Table,
    Badge,
    Dialog,
    Input,
    FormItem,
    FormContainer,
    Notification,
    toast,
    Tooltip,
    Avatar,
    Select,
    Switcher
} from '@/components/ui'
import {
    HiOutlinePlus,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineEye,
    HiOutlineSearch,
    HiOutlineFilter,
    HiOutlineRefresh
} from 'react-icons/hi'
import { TbCategory } from 'react-icons/tb'
import { MdCategory } from 'react-icons/md'
import type { ColumnDef } from '@tanstack/react-table'

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

interface CategoryFormData {
    name: string
    slug: string
    description: string
    parentId: string
    isActive: boolean
    image?: string
}

const { Tr, Th, Td, THead, TBody } = Table
const { Option } = Select

const CategoryList = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterLevel, setFilterLevel] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    
    // Dialog states
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    
    // Form state
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        slug: '',
        description: '',
        parentId: '',
        isActive: true,
        image: ''
    })

    // Mock data
    const mockCategories: Category[] = [
        {
            id: '1',
            name: 'الکترونیک',
            slug: 'electronics',
            description: 'محصولات الکترونیکی و دیجیتال',
            level: 1,
            isActive: true,
            productsCount: 245,
            image: '/img/categories/electronics.jpg',
            createdAt: '2024-01-15',
            updatedAt: '2024-01-20'
        },
        {
            id: '2',
            name: 'موبایل و تبلت',
            slug: 'mobile-tablet',
            description: 'گوشی هوشمند و تبلت',
            parentId: '1',
            parentName: 'الکترونیک',
            level: 2,
            isActive: true,
            productsCount: 89,
            image: '/img/categories/mobile.jpg',
            createdAt: '2024-01-16',
            updatedAt: '2024-01-21'
        },
        {
            id: '3',
            name: 'لپ تاپ',
            slug: 'laptop',
            description: 'انواع لپ تاپ و نوت بوک',
            parentId: '1',
            parentName: 'الکترونیک',
            level: 2,
            isActive: true,
            productsCount: 67,
            image: '/img/categories/laptop.jpg',
            createdAt: '2024-01-17',
            updatedAt: '2024-01-22'
        },
        {
            id: '4',
            name: 'پوشاک',
            slug: 'clothing',
            description: 'انواع پوشاک و لباس',
            level: 1,
            isActive: true,
            productsCount: 156,
            image: '/img/categories/clothing.jpg',
            createdAt: '2024-01-18',
            updatedAt: '2024-01-23'
        },
        {
            id: '5',
            name: 'لباس مردانه',
            slug: 'mens-clothing',
            description: 'پوشاک مردانه',
            parentId: '4',
            parentName: 'پوشاک',
            level: 2,
            isActive: false,
            productsCount: 78,
            image: '/img/categories/mens.jpg',
            createdAt: '2024-01-19',
            updatedAt: '2024-01-24'
        },
        {
            id: '6',
            name: 'خانه و آشپزخانه',
            slug: 'home-kitchen',
            description: 'لوازم خانگی و آشپزخانه',
            level: 1,
            isActive: true,
            productsCount: 203,
            image: '/img/categories/home.jpg',
            createdAt: '2024-01-20',
            updatedAt: '2024-01-25'
        }
    ]

    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        filterCategories()
    }, [categories, searchTerm, filterLevel, filterStatus])

    const loadCategories = async () => {
        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setCategories(mockCategories)
        } catch (error) {
            toast.push(
                <Notification title="خطا" type="danger">
                    خطا در بارگذاری دسته‌بندی‌ها
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    const filterCategories = () => {
        let filtered = categories

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Level filter
        if (filterLevel !== 'all') {
            filtered = filtered.filter(category => category.level === parseInt(filterLevel))
        }

        // Status filter
        if (filterStatus !== 'all') {
            filtered = filtered.filter(category => 
                filterStatus === 'active' ? category.isActive : !category.isActive
            )
        }

        setFilteredCategories(filtered)
    }

    const handleCreate = () => {
        navigate('/categories/new')
    }

    const handleEdit = (category: Category) => {
        setSelectedCategory(category)
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description,
            parentId: category.parentId || '',
            isActive: category.isActive,
            image: category.image || ''
        })
        setIsEditDialogOpen(true)
    }

    const handleDelete = (category: Category) => {
        setSelectedCategory(category)
        setIsDeleteDialogOpen(true)
    }

    const handleSave = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            if (selectedCategory) {
                // Update existing category
                const updatedCategories = categories.map(cat =>
                    cat.id === selectedCategory.id
                        ? { ...cat, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
                        : cat
                )
                setCategories(updatedCategories)
                toast.push(
                    <Notification title="موفقیت" type="success">
                        دسته‌بندی با موفقیت به‌روزرسانی شد
                    </Notification>
                )
            } else {
                // Create new category
                const newCategory: Category = {
                    id: Date.now().toString(),
                    ...formData,
                    level: formData.parentId ? 2 : 1,
                    parentName: formData.parentId ? categories.find(c => c.id === formData.parentId)?.name : undefined,
                    productsCount: 0,
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                setCategories([...categories, newCategory])
                toast.push(
                    <Notification title="موفقیت" type="success">
                        دسته‌بندی جدید با موفقیت ایجاد شد
                    </Notification>
                )
            }
            
            setIsCreateDialogOpen(false)
            setIsEditDialogOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            toast.push(
                <Notification title="خطا" type="danger">
                    خطا در ذخیره دسته‌بندی
                </Notification>
            )
        }
    }

    const handleDeleteConfirm = async () => {
        if (!selectedCategory) return
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            const updatedCategories = categories.filter(cat => cat.id !== selectedCategory.id)
            setCategories(updatedCategories)
            
            toast.push(
                <Notification title="موفقیت" type="success">
                    دسته‌بندی با موفقیت حذف شد
                </Notification>
            )
            
            setIsDeleteDialogOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            toast.push(
                <Notification title="خطا" type="danger">
                    خطا در حذف دسته‌بندی
                </Notification>
            )
        }
    }

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
    }

    const columns: ColumnDef<Category>[] = [
        {
            header: 'دسته‌بندی',
            accessorKey: 'name',
            cell: ({ row }) => {
                const category = row.original
                return (
                    <div className="flex items-center gap-3">
                        <Avatar
                            size="sm"
                            src={category.image}
                            icon={<TbCategory />}
                            className="bg-gray-100"
                        />
                        <div>
                            <div className="font-semibold text-gray-900">
                                {category.level > 1 && '└─ '}
                                {category.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {category.slug}
                            </div>
                            {category.parentName && (
                                <div className="text-xs text-blue-600">
                                    زیرمجموعه: {category.parentName}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        },
        {
            header: 'توضیحات',
            accessorKey: 'description',
            cell: ({ row }) => (
                <div className="max-w-xs">
                    <Tooltip title={row.original.description}>
                        <span className="text-sm text-gray-600 line-clamp-2">
                            {row.original.description}
                        </span>
                    </Tooltip>
                </div>
            )
        },
        {
            header: 'سطح',
            accessorKey: 'level',
            cell: ({ row }) => (
                <Badge
                    variant={row.original.level === 1 ? 'solid' : 'outline'}
                    className={row.original.level === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                >
                    سطح {row.original.level}
                </Badge>
            )
        },
        {
            header: 'تعداد محصولات',
            accessorKey: 'productsCount',
            cell: ({ row }) => (
                <div className="text-center">
                    <span className="font-semibold text-gray-900">
                        {row.original.productsCount.toLocaleString('fa-IR')}
                    </span>
                </div>
            )
        },
        {
            header: 'وضعیت',
            accessorKey: 'isActive',
            cell: ({ row }) => (
                <Badge
                    variant={row.original.isActive ? 'solid' : 'outline'}
                    className={row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                >
                    {row.original.isActive ? 'فعال' : 'غیرفعال'}
                </Badge>
            )
        },
        {
            header: 'تاریخ ایجاد',
            accessorKey: 'createdAt',
            cell: ({ row }) => (
                <div className="text-sm text-gray-600">
                    {new Date(row.original.createdAt).toLocaleDateString('fa-IR')}
                </div>
            )
        },
        {
            header: 'عملیات',
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Tooltip title="مشاهده">
                        <Button
                            size="xs"
                            variant="plain"
                            icon={<HiOutlineEye />}
                            onClick={() => navigate(`/categories/${row.original.id}`)}
                        />
                    </Tooltip>
                    <Tooltip title="ویرایش">
                        <Button
                            size="xs"
                            variant="plain"
                            icon={<HiOutlinePencil />}
                            onClick={() => navigate(`/categories/${row.original.id}/edit`)}
                        />
                    </Tooltip>
                    <Tooltip title="حذف">
                        <Button
                            size="xs"
                            variant="plain"
                            icon={<HiOutlineTrash />}
                            onClick={() => handleDelete(row.original)}
                        />
                    </Tooltip>
                </div>
            )
        }
    ]

    const parentCategories = categories.filter(cat => cat.level === 1)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <MdCategory className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">مدیریت دسته‌بندی‌ها</h1>
                        <p className="text-gray-600">مدیریت و سازماندهی دسته‌بندی‌های محصولات</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="plain"
                        icon={<HiOutlineRefresh />}
                        onClick={loadCategories}
                        loading={loading}
                    >
                        بروزرسانی
                    </Button>
                    <Button
                        variant="solid"
                        icon={<HiOutlinePlus />}
                        onClick={handleCreate}
                    >
                        دسته‌بندی جدید
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <Input
                            placeholder="جستجو در دسته‌بندی‌ها..."
                            prefix={<HiOutlineSearch />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <Select
                            placeholder="فیلتر بر اساس سطح"
                            value={filterLevel}
                            onChange={(value) => setFilterLevel(value as string)}
                        >
                            <Option value="all">همه سطوح</Option>
                            <Option value="1">سطح ۱ (اصلی)</Option>
                            <Option value="2">سطح ۲ (زیرمجموعه)</Option>
                        </Select>
                    </div>
                    <div>
                        <Select
                            placeholder="فیلتر بر اساس وضعیت"
                            value={filterStatus}
                            onChange={(value) => setFilterStatus(value as string)}
                        >
                            <Option value="all">همه وضعیت‌ها</Option>
                            <Option value="active">فعال</Option>
                            <Option value="inactive">غیرفعال</Option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiOutlineFilter className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {filteredCategories.length} از {categories.length} دسته‌بندی
                        </span>
                    </div>
                </div>
            </Card>

            {/* Categories Table */}
            <Card>
                <Table>
                    <THead>
                        <Tr>
                            {columns.map((column) => (
                                <Th key={column.id || column.accessorKey}>
                                    {column.header}
                                </Th>
                            ))}
                        </Tr>
                    </THead>
                    <TBody>
                        {loading ? (
                            <Tr>
                                <Td colSpan={columns.length}>
                                    <div className="flex items-center justify-center py-8">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                            <p className="text-gray-600">در حال بارگذاری...</p>
                                        </div>
                                    </div>
                                </Td>
                            </Tr>
                        ) : filteredCategories.length === 0 ? (
                            <Tr>
                                <Td colSpan={columns.length}>
                                    <div className="text-center py-8">
                                        <TbCategory className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-600">هیچ دسته‌بندی یافت نشد</p>
                                    </div>
                                </Td>
                            </Tr>
                        ) : (
                            filteredCategories.map((category) => (
                                <Tr key={category.id}>
                                    {columns.map((column) => (
                                        <Td key={column.id || column.accessorKey}>
                                            {column.cell ? column.cell({ row: { original: category } } as any) : 
                                             category[column.accessorKey as keyof Category]}
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                        )}
                    </TBody>
                </Table>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog
                isOpen={isCreateDialogOpen || isEditDialogOpen}
                onClose={() => {
                    setIsCreateDialogOpen(false)
                    setIsEditDialogOpen(false)
                    setSelectedCategory(null)
                }}
                width={600}
            >
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {selectedCategory ? 'ویرایش دسته‌بندی' : 'ایجاد دسته‌بندی جدید'}
                    </h3>
                    
                    <FormContainer>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem label="نام دسته‌بندی" asterisk>
                                <Input
                                    placeholder="نام دسته‌بندی را وارد کنید"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                            </FormItem>
                            
                            <FormItem label="نامک (Slug)" asterisk>
                                <Input
                                    placeholder="نامک دسته‌بندی"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </FormItem>
                        </div>
                        
                        <FormItem label="دسته‌بندی والد">
                            <Select
                                placeholder="انتخاب دسته‌بندی والد (اختیاری)"
                                value={formData.parentId}
                                onChange={(value) => setFormData({ ...formData, parentId: value as string })}
                            >
                                <Option value="">بدون والد (دسته‌بندی اصلی)</Option>
                                {parentCategories.map((category) => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        
                        <FormItem label="توضیحات">
                            <Input
                                textArea
                                placeholder="توضیحات دسته‌بندی را وارد کنید"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </FormItem>
                        
                        <FormItem label="تصویر دسته‌بندی">
                            <Input
                                placeholder="آدرس تصویر دسته‌بندی"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                    </FormContainer>
                    
                    <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
                        <Button
                            variant="plain"
                            onClick={() => {
                                setIsCreateDialogOpen(false)
                                setIsEditDialogOpen(false)
                                setSelectedCategory(null)
                            }}
                        >
                            انصراف
                        </Button>
                        <Button
                            variant="solid"
                            onClick={handleSave}
                            disabled={!formData.name.trim()}
                        >
                            {selectedCategory ? 'به‌روزرسانی' : 'ایجاد'}
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false)
                    setSelectedCategory(null)
                }}
                width={400}
            >
                <div className="p-6">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <HiOutlineTrash className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            حذف دسته‌بندی
                        </h3>
                        <p className="text-gray-600 mb-6">
                            آیا از حذف دسته‌بندی "{selectedCategory?.name}" اطمینان دارید؟
                            <br />
                            این عمل قابل بازگشت نیست.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <Button
                                variant="plain"
                                onClick={() => {
                                    setIsDeleteDialogOpen(false)
                                    setSelectedCategory(null)
                                }}
                            >
                                انصراف
                            </Button>
                            <Button
                                variant="solid"
                                className="bg-red-600 hover:bg-red-700"
                                onClick={handleDeleteConfirm}
                            >
                                حذف
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default CategoryList