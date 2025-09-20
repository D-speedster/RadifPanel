import { HiOutlineCurrencyDollar, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineShoppingBag, HiPlus } from 'react-icons/hi'
import { Button } from '@/components/ui'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import KeyMetricsCard from './components/KeyMetricsCard'
import SalesChart from './components/SalesChart'
import TopProducts from './components/TopProducts'
import RecentOrders from './components/RecentOrders'
import NewSellers from './components/NewSellers'

const EcommerceDashboard = () => {

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-6">
                    {/* هدر */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                نمای کلی
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                خوش آمدید . آماده بررسی گزارشات روزانه هستید ؟
                            </p>
                        </div>
                        <Button 
                            variant="solid" 
                            size="sm" 
                            icon={<HiPlus />}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            افزودن محصول
                        </Button>
                    </div>
            
                    {/* کارت‌های آمار کلیدی */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <KeyMetricsCard
                            title="کل فروش"
                            value="۱,۲۳۴,۵۶۷ تومان"
                            change="+۱۲.۵%"
                            changeType="increase"
                            icon={<HiOutlineCurrencyDollar className="w-6 h-6" />}
                            iconBgColor="#EBF8FF"
                            iconColor="#3182CE"
                        />
                        <KeyMetricsCard
                            title="سفارشات"
                            value="۸۹۲"
                            change="+۸.۲%"
                            changeType="increase"
                            icon={<HiOutlineShoppingCart className="w-6 h-6" />}
                            iconBgColor="#F0FFF4"
                            iconColor="#38A169"
                        />
                        <KeyMetricsCard
                            title="مشتریان"
                            value="۱,۵۶۷"
                            change="+۱۵.۳%"
                            changeType="increase"
                            icon={<HiOutlineUsers className="w-6 h-6" />}
                            iconBgColor="#FFFAF0"
                            iconColor="#DD6B20"
                        />
                        <KeyMetricsCard
                            title="محصولات"
                            value="۲۳۴"
                            change="-۲.۱%"
                            changeType="decrease"
                            icon={<HiOutlineShoppingBag className="w-6 h-6" />}
                            iconBgColor="#FFF5F5"
                            iconColor="#E53E3E"
                        />
                    </div>

                    {/* نمودارها و جداول */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <SalesChart />
                        <TopProducts />
                    </div>

                    {/* جداول اطلاعات */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <RecentOrders />
                        <NewSellers />
                    </div>
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default EcommerceDashboard
