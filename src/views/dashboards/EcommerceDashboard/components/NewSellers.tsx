import { Card } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'

type Seller = {
    id: string
    name: string
    shopName: string
    avatar: string
    joinDate: string
}

type NewSellersProps = {
    className?: string
}

const NewSellers = ({ className }: NewSellersProps) => {
    // داده‌های نمونه برای کاربران جدید
    const newUsers: Seller[] = [
        {
            id: '1',
            name: 'Alex Johnson',
            shopName: 'Premium Member',
            avatar: '/img/others/avatar-1.jpg',
            joinDate: '2024-01-15'
        },
        {
            id: '2',
            name: 'Sarah Wilson',
            shopName: 'Basic Member',
            avatar: '/img/others/avatar-2.jpg',
            joinDate: '2024-01-14'
        },
        {
            id: '3',
            name: 'Michael Chen',
            shopName: 'Pro Member',
            avatar: '/img/others/avatar-3.jpg',
            joinDate: '2024-01-13'
        },
        {
            id: '4',
            name: 'Emma Davis',
            shopName: 'Basic Member',
            avatar: '/img/others/avatar-4.jpg',
            joinDate: '2024-01-12'
        },
        {
            id: '5',
            name: 'James Brown',
            shopName: 'Premium Member',
            avatar: '/img/others/avatar-5.jpg',
            joinDate: '2024-01-11'
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
                    کاربران جدید
                </h3>
            </div>
            <div className="space-y-4">
                {newUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                            <Avatar
                                size={44}
                                src={user.avatar}
                                alt={user.name}
                                className="bg-gray-100"
                                style={{ borderRadius: '0.75rem' }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p 
                                className="text-sm font-medium truncate mb-1"
                                style={{ 
                                    color: '#1A202C',
                                    fontWeight: '500'
                                }}
                            >
                                {user.name}
                            </p>
                            <p 
                                className="text-sm truncate mb-1"
                                style={{ color: '#A0AEC0' }}
                            >
                                {user.shopName}
                            </p>
                            <p 
                                className="text-xs"
                                style={{ color: '#A0AEC0' }}
                            >
                                Joined {user.joinDate}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <span 
                                className="inline-flex items-center px-2.5 py-1 text-xs font-medium"
                                style={{
                                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                                    color: '#059669',
                                    borderRadius: '0.5rem'
                                }}
                            >
                                New
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default NewSellers