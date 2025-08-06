import { Card, Progress, Badge } from '@/components/ui'
import { HiCpuChip, HiCircleStack, HiServerStack, HiSignal } from 'react-icons/hi2'
import { motion } from 'framer-motion'

interface SystemReportProps {
    metrics: {
        cpu: number
        memory: number
        disk: number
        network: number
    }
}

const SystemReport = ({ metrics }: SystemReportProps) => {
    const getMetricColor = (value: number) => {
        if (value < 50) return 'emerald'
        if (value < 80) return 'amber'
        return 'red'
    }

    const getMetricStatus = (value: number) => {
        if (value < 50) return 'عادی'
        if (value < 80) return 'متوسط'
        return 'بحرانی'
    }

    const systemData = [
        {
            name: 'پردازنده',
            value: metrics.cpu,
            icon: HiCpuChip,
            description: 'استفاده از CPU',
            details: `${metrics.cpu}% در حال استفاده`
        },
        {
            name: 'حافظه',
            value: metrics.memory,
            icon: HiCircleStack,
            description: 'استفاده از RAM',
            details: `${metrics.memory}% از کل حافظه`
        },
        {
            name: 'دیسک',
            value: metrics.disk,
            icon: HiServerStack,
            description: 'فضای ذخیره‌سازی',
            details: `${metrics.disk}% پر شده`
        },
        {
            name: 'شبکه',
            value: metrics.network,
            icon: HiSignal,
            description: 'ترافیک شبکه',
            details: `${metrics.network}% پهنای باند`
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemData.map((item, index) => {
                const Icon = item.icon
                return (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <div className={`p-2 rounded-lg ${
                                        item.value < 50 ? 'bg-emerald-100 text-emerald-600' :
                                        item.value < 80 ? 'bg-amber-100 text-amber-600' :
                                        'bg-red-100 text-red-600'
                                    }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant={getMetricColor(item.value) as any}
                                    className="text-xs"
                                >
                                    {getMetricStatus(item.value)}
                                </Badge>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">{item.value}%</span>
                                    <span className="text-xs text-gray-500">{item.details}</span>
                                </div>
                                <Progress
                                    percent={item.value}
                                    color={getMetricColor(item.value)}
                                    size="sm"
                                    showInfo={false}
                                />
                            </div>
                        </Card>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default SystemReport