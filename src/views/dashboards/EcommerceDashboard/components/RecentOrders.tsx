import { Card } from '@/components/ui'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

type Order = {
    id: string
    customer: string
    amount: number
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
    date: string
}

type RecentOrdersProps = {
    className?: string
}

const RecentOrders = ({ className }: RecentOrdersProps) => {
    // داده‌های نمونه برای سفارشات اخیر
    const recentOrders: Order[] = [
        {
            id: '#12548',
            customer: 'John Smith',
            amount: 2450,
            status: 'delivered',
            date: '2024-01-15'
        },
        {
            id: '#12547',
            customer: 'Sarah Johnson',
            amount: 1850,
            status: 'processing',
            date: '2024-01-14'
        },
        {
            id: '#12546',
            customer: 'Michael Brown',
            amount: 3200,
            status: 'shipped',
            date: '2024-01-14'
        },
        {
            id: '#12545',
            customer: 'Emily Davis',
            amount: 975,
            status: 'processing',
            date: '2024-01-13'
        },
        {
            id: '#12544',
            customer: 'David Wilson',
            amount: 1650,
            status: 'delivered',
            date: '2024-01-13'
        }
    ]

    const getStatusBadge = (status: Order['status']) => {
        const statusConfig = {
            processing: {
                label: 'Processing',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                color: '#D97706'
            },
            shipped: {
                label: 'Shipped',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#1D4ED8'
            },
            delivered: {
                label: 'Delivered',
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                color: '#059669'
            },
            cancelled: {
                label: 'Cancelled',
                backgroundColor: 'rgba(248, 113, 113, 0.1)',
                color: '#DC2626'
            }
        }

        const config = statusConfig[status]
        return (
            <span 
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium"
                style={{
                    backgroundColor: config.backgroundColor,
                    color: config.color,
                    borderRadius: '0.5rem'
                }}
            >
                {config.label}
            </span>
        )
    }

    const formatAmount = (amount: number) => {
        return '$' + amount.toLocaleString()
    }

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
                    سفارشات اخیر
                </h3>
                <Button 
                    size="sm" 
                    variant="plain"
                    style={{
                        color: '#7A52F4',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                    }}
                >
                    View All
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr style={{ borderBottom: '1px solid #F7FAFC' }}>
                            <th 
                                className="text-left py-3 px-0 text-xs font-medium"
                                style={{ color: '#A0AEC0' }}
                            >
                                ORDER ID
                            </th>
                            <th 
                                className="text-left py-3 px-0 text-xs font-medium"
                                style={{ color: '#A0AEC0' }}
                            >
                                CUSTOMER
                            </th>
                            <th 
                                className="text-left py-3 px-0 text-xs font-medium"
                                style={{ color: '#A0AEC0' }}
                            >
                                AMOUNT
                            </th>
                            <th 
                                className="text-left py-3 px-0 text-xs font-medium"
                                style={{ color: '#A0AEC0' }}
                            >
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, index) => (
                            <tr 
                                key={order.id} 
                                className="hover:bg-gray-50 transition-colors"
                                style={{
                                    borderBottom: index < recentOrders.length - 1 ? '1px solid #F7FAFC' : 'none'
                                }}
                            >
                                <td className="py-4 px-0">
                                    <span 
                                        className="text-sm font-medium"
                                        style={{ color: '#1A202C' }}
                                    >
                                        {order.id}
                                    </span>
                                </td>
                                <td className="py-4 px-0">
                                    <div>
                                        <p 
                                            className="text-sm font-medium mb-1"
                                            style={{ color: '#1A202C' }}
                                        >
                                            {order.customer}
                                        </p>
                                        <p 
                                            className="text-xs"
                                            style={{ color: '#A0AEC0' }}
                                        >
                                            {order.date}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-4 px-0">
                                    <span 
                                        className="text-sm font-semibold"
                                        style={{ color: '#1A202C' }}
                                    >
                                        {formatAmount(order.amount)}
                                    </span>
                                </td>
                                <td className="py-4 px-0">
                                    {getStatusBadge(order.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

export default RecentOrders