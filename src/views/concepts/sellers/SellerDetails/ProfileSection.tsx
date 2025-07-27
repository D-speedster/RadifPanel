import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { FiUser, FiMail, FiPhone, FiCalendar, FiPackage } from 'react-icons/fi'
import type { Seller } from '../SellerList/types'

type ProfileSectionProps = {
    data: Seller
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/20 dark:text-emerald-400'
        case 'inactive':
            return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
        case 'pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'active':
            return 'فعال'
        case 'inactive':
            return 'غیرفعال'
        case 'pending':
            return 'در انتظار'
        default:
            return 'نامشخص'
    }
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
    return (
        <Card>
            <div className="flex flex-col items-center p-6">
                <Avatar
                    size={120}
                    shape="round"
                    {...(data.avatar ? { src: data.avatar } : { icon: <FiUser /> })}
                    className="mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {data.name}
                </h3>
                <Badge className={`mb-4 ${getStatusColor(data.status)}`}>
                    {getStatusText(data.status)}
                </Badge>
                
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <FiMail className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ایمیل</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {data.email}
                            </p>
                        </div>
                    </div>
                    
                    {data.phone && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <FiPhone className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">شماره تماس</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {data.phone}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <FiPackage className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">تعداد محصولات</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {data.product_count || 0} محصول
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <FiCalendar className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">تاریخ عضویت</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {new Date(data.created_at).toLocaleDateString('fa-IR')}
                            </p>
                        </div>
                    </div>
                    
                    {data.role && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <FiUser className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">نوع حساب</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {data.role === 'premium' ? 'پریمیوم' : 'استاندارد'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default ProfileSection