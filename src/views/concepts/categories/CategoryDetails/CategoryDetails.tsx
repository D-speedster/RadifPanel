import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Card,
    Button,
    Badge,
    Avatar,
    Tabs,
    Table,
    Input,
    Select,
    Notification,
    toast,
    Tooltip
} from '@/components/ui'
import {
    HiOutlineArrowLeft,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineEye,
    HiOutlineSearch,
    HiOutlineFilter
} from 'react-icons/hi'
import { TbCategory } from 'react-icons/tb'
import { MdCategory, MdTrendingUp, MdInventory } from 'react-icons/md'

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
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
}

interface Product {
    id: string
    name: string
    sku: string
    price: number
    stock: number
    status: 'active' | 'inactive' | 'out_of_stock'
    image?: string
    createdAt: string
}

interface CategoryStats {
    totalProducts: number
    activeProducts: number
    totalRevenue: number
    avgPrice: number
    topSellingProduct: string
}

const { Tr, Th, Td, THead, TBody } = Table
const { Option } = Select

const CategoryDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    
    const [category, setCategory] = useState<Category | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [stats, setStats] = useState<CategoryStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    // Mock data
    const mockCategory: Category = {
        id: '1',
        name: 'الکترونیک',
        slug: 'electronics',
        description: 'محصولات الکترونیکی و دیجیتال شامل گوشی، لپ تاپ، تبلت و سایر لوازم الکترونیکی',
        level: 1,
        isActive: true,
        productsCount: 245,
        image: '/src/img/categories/electronics.jpg',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        metaTitle: 'خرید محصولات الکترونیک | فروشگاه آنلاین',
        metaDescription: 'خرید انواع محصولات الکترونیک با بهترین قیمت و کیفیت از فروشگاه آنلاین ما',
        metaKeywords: 'الکترونیک، گوشی، لپ تاپ، تبلت'
    }

    const mockProducts: Product[] = [
        {
            id: '1',
            name: 'آیفون 15 پرو',
            sku: 'IP15P-128',
            price: 45000000,
            stock: 12,
            status: 'active',
            image: '/img/products/iphone15.jpg',
            createdAt: '2024-01-20'
        },
        {
            id: '2',
            name: 'سامسونگ گلکسی S24',
            sku: 'SGS24-256',
            price: 38000000,
            stock: 8,
            status: 'active',
            image: '/img/products/galaxy-s24.jpg',
            createdAt: '2024-01-18'
        },
        {
            id: '3',
            name: 'لپ تاپ ایسوس',
            sku: 'ASUS-X515',
            price: 25000000,
            stock: 0,
            status: 'out_of_stock',
            image: '/img/products/asus-laptop.jpg',
            createdAt: '2024-01-15'
        },
        {
            id: '4',
            name: 'تبلت آیپد',
            sku: 'IPAD-AIR',
            price: 32000000,
            stock: 15,
            status: 'active',
            image: '/img/products/ipad.jpg',
            createdAt: '2024-01-12'
        }
    ]

    const mockStats: CategoryStats = {
        totalProducts: 245,
        activeProducts: 198,
        totalRevenue: 1250000000,
        avgPrice: 28500000,
        topSellingProduct: 'آیفون 15 پرو'
    }

    useEffect(() => {
        loadCategoryData()
    }, [id])

    useEffect(() => {
        filterProducts()
    }, [products, searchTerm, statusFilter])

    const loadCategoryData = async () => {
        setLoading(true)
        try {
            // Simulate API calls
            await new Promise(resolve => setTimeout(resolve, 1000))
            setCategory(mockCategory)
            setProducts(mockProducts)
            setStats(mockStats)
        } catch (error) {
            toast.push(
                <Notification title="خطا" type="danger">
                    خطا در بارگذاری اطلاعات دسته‌بندی
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    const filterProducts = () => {
        let filtered = products

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(product => product.status === statusFilter)
        }

        setFilteredProducts(filtered)
    }

    const handleEdit = () => {
        navigate(`/categories/${id}/edit`)
    }

    const handleDelete = () => {
        // Handle delete logic
        console.log('Delete category:', id)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { label: 'فعال', className: 'bg-green-100 text-green-800' },
            inactive: { label: 'غیرفعال', className: 'bg-red-100 text-red-800' },
            out_of_stock: { label: 'ناموجود', className: 'bg-yellow-100 text-yellow-800' }
        }
        
        const config = statusConfig[status as keyof typeof statusConfig]
        return (
            <Badge className={config.className}>
                {config.label}
            </Badge>
        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">در حال بارگذاری...</p>
                </div>
            </div>
        )
    }

    if (!category) {
        return (
            <div className="text-center py-12">
                <TbCategory className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">دسته‌بندی یافت نشد</h2>
                <p className="text-gray-600 mb-4">دسته‌بندی مورد نظر وجود ندارد یا حذف شده است</p>
                <Button onClick={() => navigate('/categories')}>بازگشت به لیست</Button>
            </div>
        )
    }

    const tabList = [
        { label: 'نمای کلی', value: 'overview' },
        { label: 'محصولات', value: 'products' },
        { label: 'آمار و گزارش', value: 'analytics' },
        { label: 'تنظیمات سئو', value: 'seo' }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="plain"
                        icon={<HiOutlineArrowLeft />}
                        onClick={() => navigate('/categories')}
                    >
                        بازگشت
                    </Button>
                    <div className="flex items-center gap-3">
                        <Avatar
                            size="lg"
                            src={category.image}
                            icon={<TbCategory />}
                            className="bg-blue-100"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge className={category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {category.isActive ? 'فعال' : 'غیرفعال'}
                                </Badge>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">
                                    {category.productsCount.toLocaleString('fa-IR')} محصول
                                </span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">
                                    سطح {category.level}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        icon={<HiOutlinePencil />}
                        onClick={handleEdit}
                    >
                        ویرایش
                    </Button>
                    <Button
                        variant="outline"
                        icon={<HiOutlineTrash />}
                        onClick={handleDelete}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                        حذف
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.TabList>
                    {tabList.map((tab) => (
                        <Tabs.TabNav key={tab.value} value={tab.value}>
                            {tab.label}
                        </Tabs.TabNav>
                    ))}
                </Tabs.TabList>

                {/* Overview Tab */}
                <Tabs.TabContent value="overview">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Category Info */}
                        <div className="lg:col-span-2">
                            <Card>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">اطلاعات دسته‌بندی</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">نام:</label>
                                            <p className="text-gray-900">{category.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">نامک (Slug):</label>
                                            <p className="text-gray-900 font-mono">{category.slug}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">توضیحات:</label>
                                            <p className="text-gray-900">{category.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">تاریخ ایجاد:</label>
                                                <p className="text-gray-900">
                                                    {new Date(category.createdAt).toLocaleDateString('fa-IR')}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">آخرین بروزرسانی:</label>
                                                <p className="text-gray-900">
                                                    {new Date(category.updatedAt).toLocaleDateString('fa-IR')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-4">
                            {stats && (
                                <>
                                    <Card>
                                        <div className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <MdInventory className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">کل محصولات</p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        {stats.totalProducts.toLocaleString('fa-IR')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    
                                    <Card>
                                        <div className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <MdTrendingUp className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">کل فروش</p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {formatPrice(stats.totalRevenue)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    
                                    <Card>
                                        <div className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <TbCategory className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">میانگین قیمت</p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {formatPrice(stats.avgPrice)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                </Tabs.TabContent>

                {/* Products Tab */}
                <Tabs.TabContent value="products">
                    <Card>
                        {/* Filters */}
                        <div className="p-4 border-b">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    placeholder="جستجو در محصولات..."
                                    prefix={<HiOutlineSearch />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Select
                                    placeholder="فیلتر بر اساس وضعیت"
                                    value={statusFilter}
                                    onChange={(value) => setStatusFilter(value as string)}
                                >
                                    <Option value="all">همه وضعیت‌ها</Option>
                                    <Option value="active">فعال</Option>
                                    <Option value="inactive">غیرفعال</Option>
                                    <Option value="out_of_stock">ناموجود</Option>
                                </Select>
                                <div className="flex items-center gap-2">
                                    <HiOutlineFilter className="text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        {filteredProducts.length} از {products.length} محصول
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>محصول</Th>
                                    <Th>کد محصول</Th>
                                    <Th>قیمت</Th>
                                    <Th>موجودی</Th>
                                    <Th>وضعیت</Th>
                                    <Th>تاریخ ایجاد</Th>
                                    <Th>عملیات</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {filteredProducts.length === 0 ? (
                                    <Tr>
                                        <Td colSpan={7}>
                                            <div className="text-center py-8">
                                                <MdInventory className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-600">هیچ محصولی یافت نشد</p>
                                            </div>
                                        </Td>
                                    </Tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <Tr key={product.id}>
                                            <Td>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        size="sm"
                                                        src={product.image}
                                                        icon={<MdInventory />}
                                                        className="bg-gray-100"
                                                    />
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <span className="font-mono text-sm">{product.sku}</span>
                                            </Td>
                                            <Td>
                                                <span className="font-semibold">{formatPrice(product.price)}</span>
                                            </Td>
                                            <Td>
                                                <span className={`font-semibold ${
                                                    product.stock === 0 ? 'text-red-600' : 
                                                    product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                    {product.stock.toLocaleString('fa-IR')}
                                                </span>
                                            </Td>
                                            <Td>{getStatusBadge(product.status)}</Td>
                                            <Td>
                                                <span className="text-sm text-gray-600">
                                                    {new Date(product.createdAt).toLocaleDateString('fa-IR')}
                                                </span>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-2">
                                                    <Tooltip title="مشاهده">
                                                        <Button
                                                            size="xs"
                                                            variant="plain"
                                                            icon={<HiOutlineEye />}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="ویرایش">
                                                        <Button
                                                            size="xs"
                                                            variant="plain"
                                                            icon={<HiOutlinePencil />}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </Td>
                                        </Tr>
                                    ))
                                )}
                            </TBody>
                        </Table>
                    </Card>
                </Tabs.TabContent>

                {/* Analytics Tab */}
                <Tabs.TabContent value="analytics">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats && (
                            <>
                                <Card>
                                    <div className="p-6 text-center">
                                        <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                                            <MdInventory className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {stats.totalProducts.toLocaleString('fa-IR')}
                                        </h3>
                                        <p className="text-gray-600">کل محصولات</p>
                                    </div>
                                </Card>
                                
                                <Card>
                                    <div className="p-6 text-center">
                                        <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                                            <MdTrendingUp className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {stats.activeProducts.toLocaleString('fa-IR')}
                                        </h3>
                                        <p className="text-gray-600">محصولات فعال</p>
                                    </div>
                                </Card>
                                
                                <Card>
                                    <div className="p-6 text-center">
                                        <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
                                            <TbCategory className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {formatPrice(stats.avgPrice)}
                                        </h3>
                                        <p className="text-gray-600">میانگین قیمت</p>
                                    </div>
                                </Card>
                                
                                <Card>
                                    <div className="p-6 text-center">
                                        <div className="p-3 bg-yellow-100 rounded-full w-fit mx-auto mb-3">
                                            <MdTrendingUp className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {stats.topSellingProduct}
                                        </h3>
                                        <p className="text-gray-600">پرفروش‌ترین</p>
                                    </div>
                                </Card>
                            </>
                        )}
                    </div>
                </Tabs.TabContent>

                {/* SEO Tab */}
                <Tabs.TabContent value="seo">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-6">تنظیمات سئو (SEO)</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        عنوان متا (Meta Title)
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {category.metaTitle || 'تعریف نشده'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        توضیحات متا (Meta Description)
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {category.metaDescription || 'تعریف نشده'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        کلمات کلیدی متا
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                                        {category.metaKeywords || 'تعریف نشده'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        آدرس صفحه (URL)
                                    </label>
                                    <p className="text-blue-600 bg-gray-50 p-3 rounded-lg font-mono">
                                        /categories/{category.slug}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Tabs.TabContent>
            </Tabs>
        </div>
    )
}

export default CategoryDetails