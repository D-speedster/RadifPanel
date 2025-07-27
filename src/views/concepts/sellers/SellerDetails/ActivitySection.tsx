import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { FiClock, FiUser, FiPackage, FiDollarSign } from 'react-icons/fi'

type ActivitySectionProps = {
    sellerName: string
    id: string
}

// Mock activity data - در پروژه واقعی از API دریافت می‌شود
const mockActivities = [
    {
        id: 1,
        type: 'product_added',
        title: 'محصول جدید اضافه شد',
        description: 'محصول "لپ تاپ ایسوس" به فروشگاه اضافه شد',
        timestamp: '2024-01-15T10:30:00Z',
        icon: FiPackage,
        color: 'text-blue-500'
    },
    {
        id: 2,
        type: 'profile_updated',
        title: 'پروفایل به‌روزرسانی شد',
        description: 'اطلاعات پروفایل فروشنده ویرایش شد',
        timestamp: '2024-01-14T15:20:00Z',
        icon: FiUser,
        color: 'text-green-500'
    },
    {
        id: 3,
        type: 'sale_completed',
        title: 'فروش انجام شد',
        description: 'فروش محصول به مبلغ 2,500,000 تومان',
        timestamp: '2024-01-13T09:45:00Z',
        icon: FiDollarSign,
        color: 'text-emerald-500'
    },
    {
        id: 4,
        type: 'product_updated',
        title: 'محصول به‌روزرسانی شد',
        description: 'قیمت محصول "موبایل سامسونگ" تغییر کرد',
        timestamp: '2024-01-12T14:10:00Z',
        icon: FiPackage,
        color: 'text-orange-500'
    },
]

const ActivitySection = ({ sellerName, id }: ActivitySectionProps) => {
    const [activities] = useState(mockActivities)
    const [loading, setLoading] = useState(false)

    const loadMoreActivities = () => {
        setLoading(true)
        // شبیه‌سازی بارگذاری بیشتر
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    فعالیت‌های اخیر {sellerName}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activities.length} فعالیت
                </span>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => {
                    const IconComponent = activity.icon
                    return (
                        <Card key={activity.id} className="p-4">
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                        {activity.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <FiClock className="w-3 h-3" />
                                        <span>
                                            {new Date(activity.timestamp).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            <div className="flex justify-center pt-4">
                <Button
                    variant="plain"
                    size="sm"
                    loading={loading}
                    onClick={loadMoreActivities}
                >
                    نمایش فعالیت‌های بیشتر
                </Button>
            </div>
        </div>
    )
}

export default ActivitySection