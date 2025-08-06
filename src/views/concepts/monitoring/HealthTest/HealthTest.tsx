import { useState, useEffect } from 'react'
import { Card, Button, Badge, Progress, Notification, toast, Tabs } from '@/components/ui'
import { HiRefresh, HiCheckCircle, HiXCircle, HiClock, HiGlobeAlt, HiServer, HiDatabase, HiChartBar, HiClipboardList } from 'react-icons/hi'
import { motion } from 'framer-motion'
import SystemReport from './components/SystemReport'
import ActivityLog from './components/ActivityLog'

interface HealthCheck {
    id: string
    name: string
    url: string
    status: 'healthy' | 'unhealthy' | 'checking' | 'unknown'
    responseTime: number
    lastChecked: Date
    uptime: number
    description: string
    icon: React.ComponentType<any>
}

interface SystemMetrics {
    cpu: number
    memory: number
    disk: number
    network: number
}

const HealthTest = () => {
    const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([
        {
            id: '1',
            name: 'وب سایت اصلی',
            url: 'https://example.com',
            status: 'healthy',
            responseTime: 245,
            lastChecked: new Date(),
            uptime: 99.9,
            description: 'سرویس اصلی وب سایت',
            icon: HiGlobeAlt
        },
        {
            id: '2',
            name: 'API سرور',
            url: 'https://api.example.com',
            status: 'healthy',
            responseTime: 156,
            lastChecked: new Date(),
            uptime: 99.5,
            description: 'سرویس API اصلی',
            icon: HiServer
        },
        {
            id: '3',
            name: 'پایگاه داده',
            url: 'database://localhost:5432',
            status: 'unhealthy',
            responseTime: 0,
            lastChecked: new Date(),
            uptime: 95.2,
            description: 'پایگاه داده اصلی',
            icon: HiDatabase
        }
    ])

    const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
        cpu: 45,
        memory: 68,
        disk: 32,
        network: 12
    })

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [lastRefresh, setLastRefresh] = useState(new Date())

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy':
                return 'emerald'
            case 'unhealthy':
                return 'red'
            case 'checking':
                return 'amber'
            default:
                return 'gray'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
                return HiCheckCircle
            case 'unhealthy':
                return HiXCircle
            case 'checking':
                return HiClock
            default:
                return HiClock
        }
    }

    const refreshHealthChecks = async () => {
        setIsRefreshing(true)
        
        // شبیه‌سازی بررسی سلامت
        setHealthChecks(prev => prev.map(check => ({ ...check, status: 'checking' })))
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // شبیه‌سازی نتایج جدید
        setHealthChecks(prev => prev.map(check => ({
            ...check,
            status: Math.random() > 0.3 ? 'healthy' : 'unhealthy',
            responseTime: Math.floor(Math.random() * 500) + 50,
            lastChecked: new Date(),
            uptime: Math.random() * 5 + 95
        })))
        
        setSystemMetrics({
            cpu: Math.floor(Math.random() * 40) + 20,
            memory: Math.floor(Math.random() * 30) + 50,
            disk: Math.floor(Math.random() * 20) + 25,
            network: Math.floor(Math.random() * 20) + 5
        })
        
        setLastRefresh(new Date())
        setIsRefreshing(false)
        
        toast.push(
            <Notification
                title="بروزرسانی موفق"
                type="success"
            />,
            {
                placement: 'top-center',
            },
        )
    }

    const getMetricColor = (value: number) => {
        if (value < 50) return 'emerald'
        if (value < 80) return 'amber'
        return 'red'
    }

    useEffect(() => {
        const interval = setInterval(() => {
            refreshHealthChecks()
        }, 30000) // بروزرسانی هر 30 ثانیه

        return () => clearInterval(interval)
    }, [])

    const healthyCount = healthChecks.filter(check => check.status === 'healthy').length
    const totalCount = healthChecks.length
    const overallHealth = (healthyCount / totalCount) * 100

    return (
        <div className="space-y-6">
            {/* هدر */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        تست سلامت سیستم
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        مانیتورینگ و بررسی وضعیت سرویس‌ها
                    </p>
                </div>
                <Button
                    variant="solid"
                    onClick={refreshHealthChecks}
                    loading={isRefreshing}
                    icon={<HiRefresh />}
                >
                    بروزرسانی
                </Button>
            </div>

            {/* خلاصه وضعیت کلی */}
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600">
                            {healthyCount}/{totalCount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            سرویس‌های سالم
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                            {overallHealth.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            سلامت کلی
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                            {Math.round(healthChecks.reduce((acc, check) => acc + check.responseTime, 0) / healthChecks.length)}ms
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            میانگین پاسخ
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">
                            {lastRefresh.toLocaleTimeString('fa-IR')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            آخرین بروزرسانی
                        </div>
                    </div>
                </div>
            </Card>

            {/* تب‌های اطلاعات تفصیلی */}
            <Tabs defaultValue="services">
                <Tabs.TabList>
                    <Tabs.TabNav value="services" icon={<HiServer />}>
                        سرویس‌ها
                    </Tabs.TabNav>
                    <Tabs.TabNav value="metrics" icon={<HiChartBar />}>
                        متریک‌های سیستم
                    </Tabs.TabNav>
                    <Tabs.TabNav value="logs" icon={<HiClipboardList />}>
                        تاریخچه فعالیت‌ها
                    </Tabs.TabNav>
                </Tabs.TabList>
                
                <div className="mt-6">
                    <Tabs.TabContent value="services">
                        {/* لیست سرویس‌ها */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {healthChecks.map((check, index) => {
                                const StatusIcon = getStatusIcon(check.status)
                                const ServiceIcon = check.icon
                                
                                return (
                                    <motion.div
                                        key={check.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="p-6 hover:shadow-lg transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3 space-x-reverse">
                                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                        <ServiceIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {check.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {check.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={`flex items-center space-x-1 space-x-reverse`}
                                                    variant={getStatusColor(check.status) as any}
                                                >
                                                    <StatusIcon className="w-3 h-3" />
                                                    <span>
                                                        {check.status === 'healthy' && 'سالم'}
                                                        {check.status === 'unhealthy' && 'ناسالم'}
                                                        {check.status === 'checking' && 'در حال بررسی'}
                                                        {check.status === 'unknown' && 'نامشخص'}
                                                    </span>
                                                </Badge>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">زمان پاسخ:</span>
                                                    <span className="font-medium">{check.responseTime}ms</span>
                                                </div>
                                                
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">آپتایم:</span>
                                                    <span className="font-medium">{check.uptime.toFixed(1)}%</span>
                                                </div>
                                                
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">آخرین بررسی:</span>
                                                    <span className="font-medium">
                                                        {check.lastChecked.toLocaleTimeString('fa-IR')}
                                                    </span>
                                                </div>
                                                
                                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                        {check.url}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </Tabs.TabContent>
                    
                    <Tabs.TabContent value="metrics">
                        <SystemReport metrics={systemMetrics} />
                    </Tabs.TabContent>
                    
                    <Tabs.TabContent value="logs">
                        <ActivityLog />
                    </Tabs.TabContent>
                </div>
            </Tabs>


        </div>
    )
}

export default HealthTest