import { Card } from '@/components/ui'
import { HiOutlineChartBar, HiOutlineUsers, HiOutlineCurrencyDollar, HiOutlineShoppingCart } from 'react-icons/hi'

const SalesDashboard = () => {
    const statsData = [
        {
            title: 'کل فروش',
            value: '۲,۵۰۰,۰۰۰ تومان',
            icon: <HiOutlineCurrencyDollar className="text-2xl" />,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100'
        },
        {
            title: 'سفارشات',
            value: '۳۵۶',
            icon: <HiOutlineShoppingCart className="text-2xl" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'مشتریان',
            value: '۱,۲۵۰',
            icon: <HiOutlineUsers className="text-2xl" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            title: 'آمار بازدید',
            value: '۸,۹۲۰',
            icon: <HiOutlineChartBar className="text-2xl" />,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ]

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">داشبورد فروش</h1>
                <p className="text-gray-600">خلاصه‌ای از عملکرد فروش و آمار کلی</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">فعالیت‌های اخیر</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                                <p className="font-medium">سفارش جدید #۱۰۰۱</p>
                                <p className="text-sm text-gray-600">علی محمدی - ۱,۲۵۰,۰۰۰ تومان</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">تکمیل شده</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                                <p className="font-medium">سفارش جدید #۱۰۰۲</p>
                                <p className="text-sm text-gray-600">سارا احمدی - ۸۵۰,۰۰۰ تومان</p>
                            </div>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">در حال پردازش</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium">سفارش جدید #۱۰۰۳</p>
                                <p className="text-sm text-gray-600">محمد رضایی - ۲,۱۰۰,۰۰۰ تومان</p>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">ارسال شده</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">محصولات پرفروش</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                                <p className="font-medium">لپ تاپ ایسوس</p>
                                <p className="text-sm text-gray-600">۱۲ فروش این ماه</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">۵,۲۳۰,۰۰۰ تومان</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                                <p className="font-medium">گوشی سامسونگ</p>
                                <p className="text-sm text-gray-600">۸ فروش این ماه</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">۴,۳۲۰,۰۰۰ تومان</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium">هدفون بلوتوث</p>
                                <p className="text-sm text-gray-600">۱۵ فروش این ماه</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">۳,۲۰۰,۰۰۰ تومان</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SalesDashboard
