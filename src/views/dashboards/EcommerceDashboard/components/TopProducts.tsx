import { Card } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'

type Product = {
    id: string
    name: string
    category: string
    image: string
    sales: number
    revenue: string
}

type TopProductsProps = {
    className?: string
}

const TopProducts = ({ className }: TopProductsProps) => {
    // داده‌های نمونه برای محصولات پرفروش
    const topProducts: Product[] = [
        {
            id: '1',
            name: 'MacBook Pro 16"',
            category: 'Laptops',
            image: '/img/others/laptop-1.jpg',
            sales: 2847,
            revenue: '$2,847,000'
        },
        {
            id: '2',
            name: 'iPhone 15 Pro',
            category: 'Smartphones',
            image: '/img/others/phone-1.jpg',
            sales: 1923,
            revenue: '$1,923,000'
        },
        {
            id: '3',
            name: 'AirPods Pro',
            category: 'Audio',
            image: '/img/others/headphone-1.jpg',
            sales: 1456,
            revenue: '$364,000'
        },
        {
            id: '4',
            name: 'Apple Watch Ultra',
            category: 'Wearables',
            image: '/img/others/watch-1.jpg',
            sales: 987,
            revenue: '$789,600'
        },
        {
            id: '5',
            name: 'iPad Pro 12.9"',
            category: 'Tablets',
            image: '/img/others/tablet-1.jpg',
            sales: 743,
            revenue: '$892,000'
        }
    ]

    return (
        <Card 
            className={`bg-white ${className || ''}`}
            style={{
                padding: '1.75rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
                border: 'none'
            }}
        >
            <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
                <h3 
                    className="font-bold" 
                    style={{ 
                        color: '#1A202C',
                        fontSize: '1.25rem',
                        fontWeight: '600'
                    }}
                >
                    برترین محصولات
                </h3>
            </div>
            <div className="space-y-4">
                {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                        {/* تصویر محصول */}
                        <div className="flex-shrink-0">
                            <div 
                                className="bg-gray-100 flex items-center justify-center"
                                style={{
                                    width: '3rem',
                                    height: '3rem',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                <Avatar
                                    size={40}
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        
                        {/* اطلاعات محصول */}
                        <div className="flex-1 min-w-0">
                            <p 
                                className="font-semibold truncate mb-1" 
                                style={{ 
                                    color: '#1A202C',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}
                            >
                                {product.name}
                            </p>
                            <p 
                                className="text-sm truncate" 
                                style={{ 
                                    color: '#A0AEC0',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {product.category}
                            </p>
                        </div>
                        
                        {/* درآمد */}
                        <div className="flex-shrink-0 text-right">
                            <p 
                                className="font-bold mb-1" 
                                style={{ 
                                    color: '#1A202C',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                            >
                                {product.revenue}
                            </p>
                            <p 
                                style={{ 
                                    color: '#A0AEC0',
                                    fontSize: '0.75rem'
                                }}
                            >
                                {product.sales.toLocaleString()} sold
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default TopProducts