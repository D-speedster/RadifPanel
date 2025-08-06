import { useState } from 'react'
import { Card, Badge, Button, Input } from '@/components/ui'
import { HiSearch, HiFilter, HiCheckCircle, HiXCircle, HiExclamation, HiInformationCircle } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

interface LogEntry {
    id: string
    timestamp: Date
    type: 'success' | 'error' | 'warning' | 'info'
    service: string
    message: string
    details?: string
}

interface ActivityLogProps {
    logs?: LogEntry[]
}

const ActivityLog = ({ logs = [] }: ActivityLogProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState<string>('all')
    const [showDetails, setShowDetails] = useState<string | null>(null)

    // داده‌های نمونه برای لاگ‌ها
    const defaultLogs: LogEntry[] = [
        {
            id: '1',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            type: 'success',
            service: 'وب سایت اصلی',
            message: 'سرویس با موفقیت پاسخ داد',
            details: 'زمان پاسخ: 245ms، کد وضعیت: 200'
        },
        {
            id: '2',
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
            type: 'error',
            service: 'پایگاه داده',
            message: 'خطا در اتصال به پایگاه داده',
            details: 'Connection timeout after 30 seconds'
        },
        {
            id: '3',
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            type: 'warning',
            service: 'API سرور',
            message: 'زمان پاسخ بالاتر از حد معمول',
            details: 'زمان پاسخ: 1250ms (حد مجاز: 1000ms)'
        },
        {
            id: '4',
            timestamp: new Date(Date.now() - 20 * 60 * 1000),
            type: 'info',
            service: 'سیستم',
            message: 'شروع مانیتورینگ خودکار',
            details: 'بررسی سلامت هر 30 ثانیه'
        },
        {
            id: '5',
            timestamp: new Date(Date.now() - 25 * 60 * 1000),
            type: 'success',
            service: 'API سرور',
            message: 'سرویس API عادی شد',
            details: 'زمان پاسخ: 156ms'
        }
    ]

    const allLogs = logs.length > 0 ? logs : defaultLogs

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'success':
                return HiCheckCircle
            case 'error':
                return HiXCircle
            case 'warning':
                return HiExclamation
            case 'info':
                return HiInformationCircle
            default:
                return HiInformationCircle
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'emerald'
            case 'error':
                return 'red'
            case 'warning':
                return 'amber'
            case 'info':
                return 'blue'
            default:
                return 'gray'
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'success':
                return 'موفق'
            case 'error':
                return 'خطا'
            case 'warning':
                return 'هشدار'
            case 'info':
                return 'اطلاعات'
            default:
                return 'نامشخص'
        }
    }

    const filteredLogs = allLogs.filter(log => {
        const matchesSearch = log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.message.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterType === 'all' || log.type === filterType
        return matchesSearch && matchesFilter
    })

    const typeFilters = [
        { value: 'all', label: 'همه', count: allLogs.length },
        { value: 'success', label: 'موفق', count: allLogs.filter(l => l.type === 'success').length },
        { value: 'error', label: 'خطا', count: allLogs.filter(l => l.type === 'error').length },
        { value: 'warning', label: 'هشدار', count: allLogs.filter(l => l.type === 'warning').length },
        { value: 'info', label: 'اطلاعات', count: allLogs.filter(l => l.type === 'info').length }
    ]

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">تاریخچه فعالیت‌ها</h2>
                <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="relative">
                        <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="جستجو در لاگ‌ها..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pr-10 w-64"
                            size="sm"
                        />
                    </div>
                </div>
            </div>

            {/* فیلترهای نوع */}
            <div className="flex flex-wrap gap-2 mb-6">
                {typeFilters.map(filter => (
                    <Button
                        key={filter.value}
                        size="sm"
                        variant={filterType === filter.value ? 'solid' : 'plain'}
                        onClick={() => setFilterType(filter.value)}
                        className="flex items-center space-x-2 space-x-reverse"
                    >
                        <span>{filter.label}</span>
                        <Badge variant="solid" className="text-xs">
                            {filter.count}
                        </Badge>
                    </Button>
                ))}
            </div>

            {/* لیست لاگ‌ها */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                    {filteredLogs.map((log, index) => {
                        const Icon = getTypeIcon(log.type)
                        return (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                onClick={() => setShowDetails(showDetails === log.id ? null : log.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3 space-x-reverse flex-1">
                                        <div className={`p-1 rounded-full ${
                                            log.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                            log.type === 'error' ? 'bg-red-100 text-red-600' :
                                            log.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    <span className="font-medium text-sm">{log.service}</span>
                                                    <Badge
                                                        variant={getTypeColor(log.type) as any}
                                                        className="text-xs"
                                                    >
                                                        {getTypeLabel(log.type)}
                                                    </Badge>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {log.timestamp.toLocaleString('fa-IR')}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                {log.message}
                                            </p>
                                            
                                            <AnimatePresence>
                                                {showDetails === log.id && log.details && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400"
                                                    >
                                                        {log.details}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {filteredLogs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <HiInformationCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>هیچ لاگی یافت نشد</p>
                </div>
            )}
        </Card>
    )
}

export default ActivityLog