import { HiOutlineCurrencyDollar, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineShoppingBag, HiPlus } from 'react-icons/hi'
import { Button } from '@/components/ui'
import KeyMetricsCard from './components/KeyMetricsCard'
import SalesChart from './components/SalesChart'
import TopProducts from './components/TopProducts'
import RecentOrders from './components/RecentOrders'
import NewSellers from './components/NewSellers'

const SalesDashboard = () => {

    return (
        <div 
            className="min-h-screen" 
            style={{ 
                backgroundColor: '#F8F9FC',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
        >
            {/* هدر مدرن */}
            <div 
                className="bg-white" 
                style={{ 
                    padding: '2rem 2.5rem',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.03)'
                }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 
                            className="font-bold mb-2" 
                            style={{ 
                                fontSize: '2rem',
                                color: '#1A202C',
                                lineHeight: '1.2',
                                letterSpacing: '-0.025em'
                            }}
                        >
                            نمای کلی
                        </h1>
                        <p style={{ 
                            color: '#A0AEC0', 
                            fontSize: '0.9rem',
                            fontWeight: '400'
                        }}>
                           خوش آمدید . آماده برسی گزارشات روزانه هستید ؟
                        </p>
                    </div>
                    <Button 
                        variant="solid" 
                        size="lg"
                        className="flex items-center gap-2"
                        style={{
                            backgroundColor: '#7A52F4',
                            color: 'white',
                            padding: '0.875rem 1.75rem',
                            borderRadius: '1rem',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px 0 rgb(122 82 244 / 0.3)',
                            border: 'none'
                        }}
                    >
                        <HiPlus className="text-lg" />
                        ساخت گزارش
                    </Button>
                </div>
            </div>
            
            <div style={{ padding: '2.5rem' }}>
                
                {/* کارت‌های آمار کلیدی */}
                <div className="grid grid-cols-12" style={{ gap: '2rem', marginBottom: '2.5rem' }}>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <KeyMetricsCard
                            title="مجموع درآمد"
                            value="$87,450"
                            description="30 روز گذشته"
                            change="+12.5%"
                            icon={<HiOutlineCurrencyDollar className="text-xl" />}
                            iconBgColor="rgba(52, 211, 153, 0.1)"
                            iconColor="#34D399"
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <KeyMetricsCard
                            title="سفارشات جدید"
                            value="240"
                            description="30 روز گذشته"
                            change="+8.2%"
                            icon={<HiOutlineShoppingCart className="text-xl" />}
                            iconBgColor="rgba(122, 82, 244, 0.1)"
                            iconColor="#7A52F4"
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <KeyMetricsCard
                            title="یوزر جدید"
                            value="430"
                            description="30 روز گذشته"
                            change="+32.5%"
                            icon={<HiOutlineUsers className="text-xl" />}
                            iconBgColor="rgba(251, 191, 36, 0.1)"
                            iconColor="#FBBF24"
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <KeyMetricsCard
                            title="فروشندگان فعال"
                            value="222"
                            description="30 روز گذشته"
                            change="+5.1%"
                            icon={<HiOutlineShoppingBag className="text-xl" />}
                            iconBgColor="rgba(248, 113, 113, 0.1)"
                            iconColor="#F87171"
                        />
                    </div>
                </div>

                {/* نمودار و محصولات */}
                <div className="grid grid-cols-12" style={{ gap: '2rem', marginBottom: '2.5rem' }}>
                    {/* نمودار فروش */}
                    <div className="col-span-12 lg:col-span-8">
                        <SalesChart />
                    </div>
                    {/* پرفروش‌ترین محصولات */}
                    <div className="col-span-12 lg:col-span-4">
                        <TopProducts />
                    </div>
                </div>

                {/* جداول داده‌ها */}
                <div className="grid grid-cols-12" style={{ gap: '2rem' }}>
                    {/* آخرین سفارشات */}
                    <div className="col-span-12 lg:col-span-7">
                        <RecentOrders />
                    </div>
                    {/* کاربران جدید */}
                    <div className="col-span-12 lg:col-span-5">
                        <NewSellers />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesDashboard
