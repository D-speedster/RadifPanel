import { useState } from 'react'
import { Card, Button, Input, Select, Switcher } from '@/components/ui'
import { Option } from '@/components/ui/Select'
import { HiCog, HiSave, HiRefresh } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface CrawlerSettings {
    autoCrawl: boolean
    notifications: boolean
    autoSave: boolean
    maxConcurrentCrawls: number
    defaultDelay: number
    maxCrawlDepth: number
    respectRobots: boolean
    userAgent: string
    timeout: number
}

const CrawlerSettings = () => {
    const [settings, setSettings] = useState<CrawlerSettings>({
        autoCrawl: true,
        notifications: true,
        autoSave: true,
        maxConcurrentCrawls: 3,
        defaultDelay: 1000,
        maxCrawlDepth: 5,
        respectRobots: true,
        userAgent: 'Mozilla/5.0 (compatible; WebCrawler/1.0)',
        timeout: 30000
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSaveSettings = () => {
        setIsLoading(true)
        
        // شبیه‌سازی ذخیره تنظیمات
        setTimeout(() => {
            setIsLoading(false)
            toast.success('تنظیمات با موفقیت ذخیره شد')
        }, 1000)
    }

    const handleResetSettings = () => {
        setSettings({
            autoCrawl: true,
            notifications: true,
            autoSave: true,
            maxConcurrentCrawls: 3,
            defaultDelay: 1000,
            maxCrawlDepth: 5,
            respectRobots: true,
            userAgent: 'Mozilla/5.0 (compatible; WebCrawler/1.0)',
            timeout: 30000
        })
        toast.success('تنظیمات به حالت پیش‌فرض بازگردانده شد')
    }

    const updateSetting = (key: keyof CrawlerSettings, value: any) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="space-y-6">
            {/* هدر صفحه */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <HiCog className="w-8 h-8" />
                        تنظیمات کرالر
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        پیکربندی و تنظیمات سرویس کرال وب‌سایت‌ها
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        size="sm" 
                        variant="outline"
                        icon={<HiRefresh />}
                        onClick={handleResetSettings}
                    >
                        بازنشانی
                    </Button>
                    <Button 
                        size="sm" 
                        icon={<HiSave />}
                        loading={isLoading}
                        onClick={handleSaveSettings}
                    >
                        ذخیره تنظیمات
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* تنظیمات عمومی */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                            تنظیمات عمومی
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">کرال خودکار</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        شروع خودکار کرال‌های برنامه‌ریزی شده
                                    </p>
                                </div>
                                <Switcher 
                                    checked={settings.autoCrawl}
                                    onChange={(checked) => updateSetting('autoCrawl', checked)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">اعلان‌ها</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        دریافت اعلان برای تکمیل کرال‌ها
                                    </p>
                                </div>
                                <Switcher 
                                    checked={settings.notifications}
                                    onChange={(checked) => updateSetting('notifications', checked)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">ذخیره خودکار</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ذخیره خودکار داده‌های استخراج شده
                                    </p>
                                </div>
                                <Switcher 
                                    checked={settings.autoSave}
                                    onChange={(checked) => updateSetting('autoSave', checked)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">احترام به robots.txt</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        رعایت قوانین robots.txt وب‌سایت‌ها
                                    </p>
                                </div>
                                <Switcher 
                                    checked={settings.respectRobots}
                                    onChange={(checked) => updateSetting('respectRobots', checked)}
                                />
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* تنظیمات کارایی */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                            تنظیمات کارایی
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    حداکثر کرال همزمان
                                </label>
                                <Select 
                                    value={settings.maxConcurrentCrawls}
                                    onChange={(value) => updateSetting('maxConcurrentCrawls', value)}
                                >
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={20}>20</Option>
                                </Select>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    تعداد کرال‌هایی که می‌توانند همزمان اجرا شوند
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    تاخیر پیش‌فرض (میلی‌ثانیه)
                                </label>
                                <Input 
                                    type="number" 
                                    value={settings.defaultDelay}
                                    onChange={(e) => updateSetting('defaultDelay', parseInt(e.target.value))}
                                    min={100} 
                                    max={10000} 
                                    step={100} 
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    تاخیر بین درخواست‌ها برای جلوگیری از محدودیت
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    حداکثر عمق کرال
                                </label>
                                <Select 
                                    value={settings.maxCrawlDepth}
                                    onChange={(value) => updateSetting('maxCrawlDepth', value)}
                                >
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={-1}>نامحدود</Option>
                                </Select>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    حداکثر سطح عمق برای دنبال کردن لینک‌ها
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    تایم‌اوت (میلی‌ثانیه)
                                </label>
                                <Input 
                                    type="number" 
                                    value={settings.timeout}
                                    onChange={(e) => updateSetting('timeout', parseInt(e.target.value))}
                                    min={5000} 
                                    max={120000} 
                                    step={1000} 
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    حداکثر زمان انتظار برای پاسخ از سرور
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* تنظیمات پیشرفته */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        تنظیمات پیشرفته
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                User Agent
                            </label>
                            <Input 
                                value={settings.userAgent}
                                onChange={(e) => updateSetting('userAgent', e.target.value)}
                                placeholder="Mozilla/5.0 (compatible; WebCrawler/1.0)"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                شناسه مرورگر که برای درخواست‌ها استفاده می‌شود
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* راهنما */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
                        راهنمای تنظیمات
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
                        <div>
                            <h4 className="font-medium mb-2">نکات مهم:</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>تاخیر کمتر ممکن است باعث محدودیت IP شود</li>
                                <li>کرال همزمان بیشتر منابع سیستم بیشتری مصرف می‌کند</li>
                                <li>عمق کرال بالا زمان بیشتری نیاز دارد</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">توصیه‌ها:</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>برای سایت‌های بزرگ تاخیر 2-5 ثانیه استفاده کنید</li>
                                <li>کرال همزمان را بر اساس قدرت سرور تنظیم کنید</li>
                                <li>همیشه robots.txt را رعایت کنید</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

export default CrawlerSettings