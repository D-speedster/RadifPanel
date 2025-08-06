import { useState, useEffect } from 'react'
import { Card, Badge, Button, Input, Tabs, Progress, Select, Switcher } from '@/components/ui'
import { Option } from '@/components/ui/Select'
import { 
    HiPlay, HiStop, HiRefresh, HiCog, HiGlobe, HiClock, 
    HiCheckCircle, HiXCircle, HiExclamation, HiExclamationCircle, HiEye, HiTrash,
    HiDownload, HiChartBar, HiDatabase, HiServer, HiCube
} from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface CrawlerJob {
    id: string
    name: string
    url: string
    status: 'running' | 'completed' | 'failed' | 'pending' | 'paused'
    progress: number
    startTime: Date
    endTime?: Date
    pagesFound: number
    pagesProcessed: number
    errors: number
    dataExtracted: number
    crawlDepth: number
    respectRobots: boolean
    delay: number
}

interface CrawlerStats {
    totalJobs: number
    activeJobs: number
    completedJobs: number
    failedJobs: number
    totalPages: number
    totalData: number
    avgProcessingTime: number
    successRate: number
}

interface SystemMetrics {
    cpuUsage: number
    memoryUsage: number
    diskUsage: number
    networkSpeed: number
    activeConnections: number
}

interface CrawlerStatus {
    status: 'Running' | 'Idle' | 'Crashed'
    currentStartTime: Date
    currentRunDuration: number // in milliseconds
    currentCrawlingSource: string
    activeQueueItems: number
    currentSpeed: number // URLs per second
    lastCrawledUrl: string
    processedPages: number
}

interface CrawlerError {
    id: string
    type: string
    message: string
    url: string
    timestamp: Date
    source: string
    level: 'warning' | 'error' | 'fatal'
}

interface CrawlHistory {
    id: string
    startTime: Date
    endTime: Date
    duration: number // in milliseconds
    crawledSourcesCount: number
    successRate: number
    endType: 'Success' | 'Crash' | 'Timeout'
}

const CrawlerService = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [newJobName, setNewJobName] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [crawlDepth, setCrawlDepth] = useState(3)
    const [respectRobots, setRespectRobots] = useState(true)
    const [delay, setDelay] = useState(1000)
    const [jobs, setJobs] = useState<CrawlerJob[]>([])
    const [selectedJobs, setSelectedJobs] = useState<string[]>([])
    const [stats, setStats] = useState<CrawlerStats>({
        totalJobs: 0,
        activeJobs: 0,
        completedJobs: 0,
        failedJobs: 0,
        totalPages: 0,
        totalData: 0,
        avgProcessingTime: 0,
        successRate: 0
    })
    const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkSpeed: 0,
        activeConnections: 0
    })
    const [isLoading, setIsLoading] = useState(false)
    const [crawlerStatus, setCrawlerStatus] = useState<CrawlerStatus>({
        status: 'Idle',
        currentStartTime: new Date(),
        currentRunDuration: 0,
        currentCrawlingSource: '',
        activeQueueItems: 0,
        currentSpeed: 0,
        lastCrawledUrl: ''
    })
    const [errorLogs, setErrorLogs] = useState<CrawlerError[]>([])
    const [crawlHistory, setCrawlHistory] = useState<CrawlHistory[]>([])

    // شبیه‌سازی داده‌های اولیه
    useEffect(() => {
        const mockJobs: CrawlerJob[] = [
            {
                id: '1',
                name: 'فروشگاه آنلاین اصلی',
                url: 'https://shop.example.com',
                status: 'running',
                progress: 65,
                startTime: new Date(Date.now() - 180000),
                pagesFound: 1250,
                pagesProcessed: 812,
                errors: 3,
                dataExtracted: 2340,
                crawlDepth: 5,
                respectRobots: true,
                delay: 1000
            },
            {
                id: '2',
                name: 'سایت اخبار تکنولوژی',
                url: 'https://tech-news.example.com',
                status: 'completed',
                progress: 100,
                startTime: new Date(Date.now() - 900000),
                endTime: new Date(Date.now() - 300000),
                pagesFound: 890,
                pagesProcessed: 890,
                errors: 0,
                dataExtracted: 1780,
                crawlDepth: 3,
                respectRobots: true,
                delay: 500
            },
            {
                id: '3',
                name: 'پورتال خدمات',
                url: 'https://services.example.com',
                status: 'failed',
                progress: 23,
                startTime: new Date(Date.now() - 600000),
                endTime: new Date(Date.now() - 480000),
                pagesFound: 340,
                pagesProcessed: 78,
                errors: 15,
                dataExtracted: 156,
                crawlDepth: 4,
                respectRobots: false,
                delay: 2000
            },
            {
                id: '4',
                name: 'بلاگ شخصی',
                url: 'https://blog.example.com',
                status: 'pending',
                progress: 0,
                startTime: new Date(),
                pagesFound: 0,
                pagesProcessed: 0,
                errors: 0,
                dataExtracted: 0,
                crawlDepth: 2,
                respectRobots: true,
                delay: 1500
            }
        ]
        setJobs(mockJobs)

        // شبیه‌سازی وضعیت کرالر
        setCrawlerStatus({
            status: 'Running',
            currentStartTime: new Date(Date.now() - 332000),
            currentRunDuration: 332000,
            currentCrawlingSource: 'digikala.com',
            activeQueueItems: 37,
            currentSpeed: 1.4,
            lastCrawledUrl: 'https://www.digikala.com/product/dkp-123456/example-product',
            processedPages: 0 // Initialize processedPages
        })

        // شبیه‌سازی خطاهای لحظه‌ای
        setErrorLogs([
            {
                id: 'err1',
                type: 'Timeout',
                message: 'Connection timeout after 5000ms',
                url: 'https://example.com/broken-link',
                timestamp: new Date(Date.now() - 120000),
                source: 'technolife.ir',
                level: 'error'
            },
            {
                id: 'err2',
                type: 'ParseError',
                message: 'Failed to parse HTML content',
                url: 'https://example.com/malformed-page',
                timestamp: new Date(Date.now() - 60000),
                source: 'bamilo.com',
                level: 'warning'
            }
        ])

        // شبیه‌سازی تاریخچه اجراها
        setCrawlHistory([
            {
                id: 'hist1',
                startTime: new Date(2024, 6, 16, 2, 10),
                endTime: new Date(2024, 6, 16, 4, 28),
                duration: 2 * 3600 * 1000 + 18 * 60 * 1000,
                crawledSourcesCount: 1780,
                successRate: 95,
                endType: 'Success'
            },
            {
                id: 'hist2',
                startTime: new Date(2024, 6, 15, 10, 0),
                endTime: new Date(2024, 6, 15, 10, 15),
                duration: 15 * 60 * 1000,
                crawledSourcesCount: 50,
                successRate: 80,
                endType: 'Crash'
            }
        ])

        // محاسبه آمار
        const totalJobs = mockJobs.length
        const activeJobs = mockJobs.filter(job => job.status === 'running').length
        const completedJobs = mockJobs.filter(job => job.status === 'completed').length
        const failedJobs = mockJobs.filter(job => job.status === 'failed').length
        const totalPages = mockJobs.reduce((sum, job) => sum + job.pagesProcessed, 0)
        const totalData = mockJobs.reduce((sum, job) => sum + job.dataExtracted, 0)
        const successRate = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0

        setStats({
            totalJobs,
            activeJobs,
            completedJobs,
            failedJobs,
            totalPages,
            totalData,
            avgProcessingTime: 4.2,
            successRate
        })
    }, [])

    // شبیه‌سازی متریک‌های سیستم
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemMetrics({
                cpuUsage: Math.floor(Math.random() * 30) + 20,
                memoryUsage: Math.floor(Math.random() * 20) + 60,
                diskUsage: Math.floor(Math.random() * 10) + 45,
                networkSpeed: Math.floor(Math.random() * 50) + 100,
                activeConnections: Math.floor(Math.random() * 20) + 15
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    // شبیه‌سازی به‌روزرسانی پیشرفت کارها و وضعیت کلی کرالر
    useEffect(() => {
        const jobUpdateInterval = setInterval(() => {
            setJobs(prevJobs => 
                prevJobs.map(job => {
                    if (job.status === 'running' && job.progress < 100) {
                        const newProgress = Math.min(job.progress + Math.random() * 5, 100)
                        const newPagesProcessed = Math.floor((newProgress / 100) * job.pagesFound)
                        
                        return {
                            ...job,
                            progress: newProgress,
                            pagesProcessed: newPagesProcessed,
                            dataExtracted: Math.floor(newPagesProcessed * 2.1),
                            ...(newProgress >= 100 && {
                                status: 'completed' as const,
                                endTime: new Date()
                            })
                        }
                    }
                    return job
                })
            )
        }, 2000)

        const statusUpdateInterval = setInterval(() => {
            const statuses = ['Running', 'Idle', 'Paused', 'Error']
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
            const randomSource = ['digikala.com', 'bamilo.com', 'technolife.ir', 'zoomit.ir'][Math.floor(Math.random() * 4)]
            
            setCrawlerStatus({
                status: randomStatus,
                lastActivity: new Date(),
                targetSource: randomSource,
                processedPagesLastHour: Math.floor(Math.random() * 500) + 100,
                errorsLastHour: Math.floor(Math.random() * 5)
            })

            // شبیه‌سازی خطاهای جدید گاهی اوقات
            if (Math.random() < 0.2) { // 20% chance to add a new error
                const errorTypes = ['NetworkError', 'ParseError', 'Timeout', 'AuthenticationError']
                const randomErrorType = errorTypes[Math.floor(Math.random() * errorTypes.length)]
                const errorSources = ['digikala.com', 'bamilo.com', 'technolife.ir']
                const randomErrorSource = errorSources[Math.floor(Math.random() * errorSources.length)]
                const errorMessages = [
                    'Failed to connect to host',
                    'Invalid HTML structure',
                    'Request timed out',
                    'Authentication failed'
                ]
                const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]

                setErrorLogs(prev => [
                    {
                        id: `err${Date.now()}`,
                        type: randomErrorType,
                        message: randomErrorMessage,
                        url: `https://example.com/${randomErrorSource}/${Date.now()}`,
                        timestamp: new Date(),
                        source: randomErrorSource,
                        level: 'error'
                    },
                    ...prev
                ].slice(0, 10)) // Keep only the last 10 errors
            }
        }, 5000) // Update status every 5 seconds

        return () => {
            clearInterval(jobUpdateInterval)
            clearInterval(statusUpdateInterval)
        }
    }, [])

    const formatDuration = (ms: number) => {
        const seconds = Math.floor((ms / 1000) % 60)
        const minutes = Math.floor((ms / (1000 * 60)) % 60)
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
        const days = Math.floor(ms / (1000 * 60 * 60 * 24))

        const parts = []
        if (days > 0) parts.push(`${days} روز`)
        if (hours > 0) parts.push(`${hours} ساعت`)
        if (minutes > 0) parts.push(`${minutes} دقیقه`)
        if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ثانیه`)

        return parts.join(' ')
    }

    const handleStartCrawl = () => {
        if (!newJobName.trim() || !newUrl.trim()) {
            toast.error('لطفاً نام کار و URL را وارد کنید')
            return
        }

        setIsLoading(true)
        
        setTimeout(() => {
            const newJob: CrawlerJob = {
                id: Date.now().toString(),
                name: newJobName,
                url: newUrl,
                status: 'running',
                progress: 0,
                startTime: new Date(),
                pagesFound: Math.floor(Math.random() * 500) + 100,
                pagesProcessed: 0,
                errors: 0,
                dataExtracted: 0,
                crawlDepth,
                respectRobots,
                delay
            }
            
            setJobs(prev => [newJob, ...prev])
            setNewJobName('')
            setNewUrl('')
            setIsLoading(false)
            toast.success('کرال جدید با موفقیت شروع شد')
        }, 1000)
    }

    const handleStopJob = (jobId: string) => {
        setJobs(prev => 
            prev.map(job => 
                job.id === jobId && job.status === 'running'
                    ? { ...job, status: 'paused', endTime: new Date() }
                    : job
            )
        )
        toast.success('کرال متوقف شد')
    }

    const handleResumeJob = (jobId: string) => {
        setJobs(prev => 
            prev.map(job => 
                job.id === jobId && job.status === 'paused'
                    ? { ...job, status: 'running', endTime: undefined }
                    : job
            )
        )
        toast.success('کرال از سر گرفته شد')
    }

    const handleDeleteJob = (jobId: string) => {
        setJobs(prev => prev.filter(job => job.id !== jobId))
        toast.success('کرال حذف شد')
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'running': return 'bg-blue-500'
            case 'completed': return 'bg-green-500'
            case 'failed': return 'bg-red-500'
            case 'paused': return 'bg-yellow-500'
            default: return 'bg-gray-500'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'running': return <HiPlay className="w-4 h-4" />
            case 'completed': return <HiCheckCircle className="w-4 h-4" />
            case 'failed': return <HiXCircle className="w-4 h-4" />
            case 'paused': return <HiStop className="w-4 h-4" />
            default: return <HiClock className="w-4 h-4" />
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'running': return 'در حال اجرا'
            case 'completed': return 'تکمیل شده'
            case 'failed': return 'ناموفق'
            case 'paused': return 'متوقف شده'
            default: return 'در انتظار'
        }
    }

    const tabList = [
        { value: 'dashboard', label: 'داشبورد' },
        { value: 'jobs', label: 'مدیریت کرال‌ها' },
        { value: 'reports', label: 'گزارش‌ها' }
    ]

    return (
        <div className="space-y-6">
            {/* هدر صفحه */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        سرویس مانیتورینگ کرالر
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        مدیریت و نظارت بر فرآیند کرال وب‌سایت‌ها
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        size="sm" 
                        variant="outline"
                        icon={<HiRefresh />}
                        onClick={() => window.location.reload()}
                    >
                        بروزرسانی
                    </Button>
                    <Button 
                        size="sm" 
                        icon={<HiDownload />}
                    >
                        دانلود گزارش
                    </Button>
                </div>
            </div>

            {/* تب‌ها */}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.TabList>
                    {tabList.map((tab) => (
                        <Tabs.TabNav key={tab.value} value={tab.value}>
                            {tab.label}
                        </Tabs.TabNav>
                    ))}
                </Tabs.TabList>

                {/* داشبورد */}
                <Tabs.TabContent value="dashboard">
                    <div className="space-y-6">
                        {/* کارت‌های آمار اصلی */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">کل کرال‌ها</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {stats.totalJobs}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <HiGlobe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">در حال اجرا</p>
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {stats.activeJobs}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                            <HiPlay className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">صفحات پردازش شده</p>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {stats.totalPages.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                            <HiDatabase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">نرخ موفقیت</p>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {stats.successRate.toFixed(1)}%
                                            </p>
                                        </div>
                                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                            <HiChartBar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        {/* متریک‌های سیستم */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        متریک‌های سیستم
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">CPU</span>
                                                <span className="text-sm font-medium">{systemMetrics.cpuUsage}%</span>
                                            </div>
                                            <Progress 
                                                percent={systemMetrics.cpuUsage} 
                                                color={systemMetrics.cpuUsage > 80 ? 'red' : systemMetrics.cpuUsage > 60 ? 'yellow' : 'green'}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">حافظه</span>
                                                <span className="text-sm font-medium">{systemMetrics.memoryUsage}%</span>
                                            </div>
                                            <Progress 
                                                percent={systemMetrics.memoryUsage} 
                                                color={systemMetrics.memoryUsage > 80 ? 'red' : systemMetrics.memoryUsage > 60 ? 'yellow' : 'green'}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">دیسک</span>
                                                <span className="text-sm font-medium">{systemMetrics.diskUsage}%</span>
                                            </div>
                                            <Progress 
                                                percent={systemMetrics.diskUsage} 
                                                color={systemMetrics.diskUsage > 80 ? 'red' : systemMetrics.diskUsage > 60 ? 'yellow' : 'green'}
                                            />
                                        </div>
                                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">سرعت شبکه</span>
                                                <span className="text-sm font-medium">{systemMetrics.networkSpeed} KB/s</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">اتصالات فعال</span>
                                                <span className="text-sm font-medium">{systemMetrics.activeConnections}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* وضعیت زنده کرالر */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        وضعیت زنده کرالر
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت فعلی:</span>
                                            <span className={`text-sm font-medium ${getStatusColor(crawlerStatus.status)}`}>
                                                {getStatusText(crawlerStatus.status)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">منبع هدف:</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {crawlerStatus.targetSource}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">صفحات پردازش شده:</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {crawlerStatus.processedPages?.toLocaleString() || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">خطاهای اخیر:</span>
                                            <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                                {crawlerStatus.recentErrors}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">زمان اجرا:</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatDuration(crawlerStatus.uptimeSeconds)}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* خطاهای بلادرنگ */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        خطاهای بلادرنگ
                                    </h3>
                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {errorLogs.length === 0 ? (
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                هیچ خطایی یافت نشد.
                                            </p>
                                        ) : (
                                            errorLogs.map((error, index) => (
                                                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                                    <HiExclamationCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-red-800 dark:text-red-300">
                                                            {error.type}: {error.message}
                                                        </p>
                                                        <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                                                            {new Date(error.timestamp).toLocaleString('fa-IR')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </Card>
                            </motion.div>

                            {/* تاریخچه اجرا */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.1 }}
                            >
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        تاریخچه اجرا
                                    </h3>
                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {crawlHistory.length === 0 ? (
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                هیچ تاریخچه اجرایی یافت نشد.
                                            </p>
                                        ) : (
                                            crawlHistory.map((entry, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    <div className={`p-2 rounded-full ${getStatusColor(entry.status)}`}>
                                                        {getStatusIcon(entry.status)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                            {entry.source} - {getStatusText(entry.status)}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            شروع: {new Date(entry.startTime).toLocaleString('fa-IR')} - مدت: {formatDuration(entry.durationSeconds)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </Card>
                            </motion.div>

                            {/* آخرین فعالیت‌ها */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        آخرین فعالیت‌ها
                                    </h3>
                                    <div className="space-y-3">
                                        {jobs.slice(0, 5).map((job, index) => (
                                            <div key={job.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className={`p-2 rounded-full ${getStatusColor(job.status)}`}>
                                                    {getStatusIcon(job.status)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {job.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {getStatusText(job.status)} - {job.progress.toFixed(0)}%
                                                    </p>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {job.startTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </Tabs.TabContent>

                {/* مدیریت کرال‌ها */}
                <Tabs.TabContent value="jobs">
                    <div className="space-y-6">
                        {/* فرم ایجاد کرال جدید */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                ایجاد کرال جدید
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Input
                                    placeholder="نام کرال"
                                    value={newJobName}
                                    onChange={(e) => setNewJobName(e.target.value)}
                                />
                                <Input
                                    placeholder="URL وب‌سایت"
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                />
                                <Select
                                    placeholder="عمق کرال"
                                    value={crawlDepth}
                                    onChange={(value) => setCrawlDepth(Number(value))}
                                >
                                    <Option value={1}>سطح 1</Option>
                                    <Option value={2}>سطح 2</Option>
                                    <Option value={3}>سطح 3</Option>
                                    <Option value={4}>سطح 4</Option>
                                    <Option value={5}>سطح 5</Option>
                                </Select>
                                <Button
                                    onClick={handleStartCrawl}
                                    loading={isLoading}
                                    icon={<HiPlay />}
                                    className="w-full"
                                >
                                    شروع کرال
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <Switcher 
                                        checked={respectRobots}
                                        onChange={setRespectRobots}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        رعایت robots.txt
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">تاخیر:</span>
                                    <Input
                                        type="number"
                                        value={delay}
                                        onChange={(e) => setDelay(Number(e.target.value))}
                                        className="w-20"
                                        min={100}
                                        max={10000}
                                        step={100}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">ms</span>
                                </div>
                            </div>
                        </Card>

                        {/* لیست کرال‌ها */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    لیست کرال‌ها ({jobs.length})
                                </h3>
                                <div className="flex items-center gap-2">
                                    {selectedJobs.length > 0 && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            icon={<HiTrash />}
                                            onClick={() => {
                                                setJobs(prev => prev.filter(job => !selectedJobs.includes(job.id)))
                                                setSelectedJobs([])
                                                toast.success(`${selectedJobs.length} کرال حذف شد`)
                                            }}
                                        >
                                            حذف انتخاب شده‌ها
                                        </Button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {jobs.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedJobs.includes(job.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedJobs(prev => [...prev, job.id])
                                                            } else {
                                                                setSelectedJobs(prev => prev.filter(id => id !== job.id))
                                                            }
                                                        }}
                                                        className="rounded"
                                                    />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                                            {job.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {job.url}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge className={`${getStatusColor(job.status)} text-white`}>
                                                        {getStatusIcon(job.status)}
                                                        <span className="mr-1">{getStatusText(job.status)}</span>
                                                    </Badge>
                                                    <div className="flex items-center gap-1">
                                                        {job.status === 'running' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                icon={<HiStop />}
                                                                onClick={() => handleStopJob(job.id)}
                                                            />
                                                        )}
                                                        {job.status === 'paused' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                icon={<HiPlay />}
                                                                onClick={() => handleResumeJob(job.id)}
                                                            />
                                                        )}
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            icon={<HiEye />}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            icon={<HiTrash />}
                                                            onClick={() => handleDeleteJob(job.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        پیشرفت: {job.pagesProcessed} از {job.pagesFound} صفحه
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {job.progress.toFixed(1)}%
                                                    </span>
                                                </div>
                                                <Progress 
                                                    percent={job.progress} 
                                                    color={job.status === 'failed' ? 'red' : job.status === 'completed' ? 'green' : 'blue'}
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">داده استخراج شده:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white mr-1">
                                                        {job.dataExtracted.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">خطاها:</span>
                                                    <span className="font-medium text-red-600 dark:text-red-400 mr-1">
                                                        {job.errors}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">شروع:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white mr-1">
                                                        {job.startTime.toLocaleString('fa-IR')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">عمق:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white mr-1">
                                                        {job.crawlDepth}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>
                </Tabs.TabContent>



                {/* گزارش‌ها */}
                <Tabs.TabContent value="reports">
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                گزارش عملکرد
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {stats.totalPages.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        کل صفحات پردازش شده
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {stats.totalData.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        کل داده استخراج شده
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                        {stats.avgProcessingTime}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        میانگین زمان پردازش (ثانیه)
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                آمار وضعیت کرال‌ها
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {stats.completedJobs}
                                    </div>
                                    <div className="text-sm text-green-600 dark:text-green-400">
                                        تکمیل شده
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {stats.activeJobs}
                                    </div>
                                    <div className="text-sm text-blue-600 dark:text-blue-400">
                                        در حال اجرا
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                        {stats.failedJobs}
                                    </div>
                                    <div className="text-sm text-red-600 dark:text-red-400">
                                        ناموفق
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                                        {stats.totalJobs - stats.completedJobs - stats.activeJobs - stats.failedJobs}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        در انتظار
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Tabs.TabContent>
            </Tabs>
        </div>
    )
}

export default CrawlerService