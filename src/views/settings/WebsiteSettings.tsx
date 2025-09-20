import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    Button,
    Input,
    FormItem,
    FormContainer,
    Select,
    Switcher,
    Upload,
    Avatar,
    Notification,
    toast,
    Tabs
} from '@/components/ui'
import { Option } from '@/components/ui/Select'
import ApiService from '@/services/ApiService'
import {
    HiOutlineArrowLeft,
    HiOutlineSave,
    HiOutlineRefresh,
    HiOutlineGlobe,
    HiOutlineCog,
    HiOutlineColorSwatch,
    HiOutlineShieldCheck,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker
} from 'react-icons/hi'
import { MdSettings, MdLanguage, MdSecurity } from 'react-icons/md'

interface WebsiteSettings {
    // اطلاعات عمومی
    siteName: string
    siteDescription: string
    siteKeywords: string
    siteUrl: string
    adminEmail: string
    contactEmail: string
    contactPhone: string
    address: string
    
    // تنظیمات زبان و منطقه
    defaultLanguage: string
    timezone: string
    currency: string
    dateFormat: string
    
    // تنظیمات ظاهری
    logo: string
    favicon: string
    primaryColor: string
    secondaryColor: string
    theme: string
    
    // تنظیمات SEO
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalyticsId: string
    googleTagManagerId: string
    
    // تنظیمات امنیتی
    maintenanceMode: boolean
    registrationEnabled: boolean
    emailVerificationRequired: boolean
    twoFactorEnabled: boolean
    
    // تنظیمات ایمیل
    smtpHost: string
    smtpPort: number
    smtpUsername: string
    smtpPassword: string
    smtpEncryption: string
    
    // تنظیمات شبکه‌های اجتماعی
    facebookUrl: string
    twitterUrl: string
    instagramUrl: string
    linkedinUrl: string
    telegramUrl: string
}



const WebsiteSettings = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState('general')
    
    const [settings, setSettings] = useState<WebsiteSettings>({
        // اطلاعات عمومی
        siteName: 'پنل مدیریت رادیف',
        siteDescription: 'سیستم مدیریت محتوا و فروشگاه آنلاین',
        siteKeywords: 'فروشگاه آنلاین، مدیریت محتوا، ای‌کامرس',
        siteUrl: 'https://panel-radif.com',
        adminEmail: 'admin@panel-radif.com',
        contactEmail: 'contact@panel-radif.com',
        contactPhone: '+98 21 1234 5678',
        address: 'تهران، خیابان ولیعصر، پلاک 123',
        
        // تنظیمات زبان و منطقه
        defaultLanguage: 'fa',
        timezone: 'Asia/Tehran',
        currency: 'IRR',
        dateFormat: 'YYYY/MM/DD',
        
        // تنظیمات ظاهری
        logo: '',
        favicon: '',
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        theme: 'light',
        
        // تنظیمات SEO
        metaTitle: 'پنل مدیریت رادیف - سیستم مدیریت محتوا',
        metaDescription: 'بهترین سیستم مدیریت محتوا و فروشگاه آنلاین',
        metaKeywords: 'CMS، فروشگاه، آنلاین، مدیریت',
        googleAnalyticsId: '',
        googleTagManagerId: '',
        
        // تنظیمات امنیتی
        maintenanceMode: false,
        registrationEnabled: true,
        emailVerificationRequired: true,
        twoFactorEnabled: false,
        
        // تنظیمات ایمیل
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUsername: '',
        smtpPassword: '',
        smtpEncryption: 'tls',
        
        // تنظیمات شبکه‌های اجتماعی
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        telegramUrl: ''
    })
    
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [faviconFile, setFaviconFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string>('')
    const [faviconPreview, setFaviconPreview] = useState<string>('')
    
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true)
            try {
                const resp: any = await ApiService.fetchDataWithAxios({
                    url: '/setting/website',
                    method: 'get',
                    headers: { Accept: 'application/json' },
                })
                setSettings(prev => ({ ...prev, ...(resp?.settings || resp || {}) }))
            } catch (e: any) {
                toast.push(
                    <Notification title="خطا" type="danger">
                        بارگیری تنظیمات با خطا مواجه شد
                    </Notification>
                )
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])
    
    const handleInputChange = (field: keyof WebsiteSettings, value: any) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }))
    }
    
    const handleLogoUpload = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0]
            setLogoFile(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setLogoPreview(result)
                setSettings(prev => ({ ...prev, logo: result }))
            }
            reader.readAsDataURL(file)
        }
    }
    
    const handleFaviconUpload = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0]
            setFaviconFile(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setFaviconPreview(result)
                setSettings(prev => ({ ...prev, favicon: result }))
            }
            reader.readAsDataURL(file)
        }
    }
    
    const handleSave = async () => {
        setSaving(true)
        try {
            await ApiService.fetchDataWithAxios({
                url: '/setting/website',
                method: 'post',
                data: settings,
                headers: { 'Content-Type': 'application/json' },
            })
            toast.push(
                <Notification title="موفق" type="success">
                    تنظیمات با موفقیت ذخیره شد
                </Notification>
            )
        } catch (e: any) {
            toast.push(
                <Notification title="خطا" type="danger">
                    ذخیره تنظیمات با خطا مواجه شد
                </Notification>
            )
        } finally {
            setSaving(false)
        }
    }
    
    const handleReset = () => {
        // بازگردانی تنظیمات به حالت پیش‌فرض
        setSettings({
            siteName: 'پنل مدیریت رادیف',
            siteDescription: 'سیستم مدیریت محتوا و فروشگاه آنلاین',
            siteKeywords: 'فروشگاه آنلاین، مدیریت محتوا، ای‌کامرس',
            siteUrl: 'https://panel-radif.com',
            adminEmail: 'admin@panel-radif.com',
            contactEmail: 'contact@panel-radif.com',
            contactPhone: '+98 21 1234 5678',
            address: 'تهران، خیابان ولیعصر، پلاک 123',
            defaultLanguage: 'fa',
            timezone: 'Asia/Tehran',
            currency: 'IRR',
            dateFormat: 'YYYY/MM/DD',
            logo: '',
            favicon: '',
            primaryColor: '#3B82F6',
            secondaryColor: '#10B981',
            theme: 'light',
            metaTitle: 'پنل مدیریت رادیف - سیستم مدیریت محتوا',
            metaDescription: 'بهترین سیستم مدیریت محتوا و فروشگاه آنلاین',
            metaKeywords: 'CMS، فروشگاه، آنلاین، مدیریت',
            googleAnalyticsId: '',
            googleTagManagerId: '',
            maintenanceMode: false,
            registrationEnabled: true,
            emailVerificationRequired: true,
            twoFactorEnabled: false,
            smtpHost: 'smtp.gmail.com',
            smtpPort: 587,
            smtpUsername: '',
            smtpPassword: '',
            smtpEncryption: 'tls',
            facebookUrl: '',
            twitterUrl: '',
            instagramUrl: '',
            linkedinUrl: '',
            telegramUrl: ''
        })
        setLogoPreview('')
        setFaviconPreview('')
    }
    
    const tabs = [
        { value: 'general', label: 'عمومی', icon: <HiOutlineGlobe /> },
        { value: 'appearance', label: 'ظاهر', icon: <HiOutlineColorSwatch /> },
        { value: 'seo', label: 'SEO', icon: <HiOutlineCog /> },
        { value: 'security', label: 'امنیت', icon: <HiOutlineShieldCheck /> },
        { value: 'email', label: 'ایمیل', icon: <HiOutlineMail /> },
        { value: 'social', label: 'شبکه‌های اجتماعی', icon: <MdLanguage /> }
    ]
    
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="plain"
                                size="sm"
                                icon={<HiOutlineArrowLeft />}
                                onClick={() => navigate('/dashboard')}
                            >
                                بازگشت
                            </Button>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <MdSettings className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">تنظیمات وب‌سایت</h1>
                                <p className="text-gray-600">مدیریت تنظیمات عمومی وب‌سایت</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="plain"
                                onClick={handleReset}
                                icon={<HiOutlineRefresh />}
                            >
                                بازنشانی
                            </Button>
                            <Button
                                variant="solid"
                                onClick={handleSave}
                                loading={saving}
                                icon={<HiOutlineSave />}
                            >
                                ذخیره تنظیمات
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <Card>
                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <Tabs.TabList>
                                {tabs.map((tab) => (
                                    <Tabs.TabNav key={tab.value} value={tab.value} icon={tab.icon}>
                                        {tab.label}
                                    </Tabs.TabNav>
                                ))}
                            </Tabs.TabList>
                        
                        {/* تب عمومی */}
                        <Tabs.TabContent value="general">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="نام سایت" required>
                                        <Input
                                            value={settings.siteName}
                                            onChange={(e) => handleInputChange('siteName', e.target.value)}
                                            placeholder="نام سایت را وارد کنید"
                                        />
                                    </FormItem>
                                    
                                    <FormItem label="آدرس سایت" required>
                                        <Input
                                            value={settings.siteUrl}
                                            onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                                            placeholder="https://example.com"
                                        />
                                    </FormItem>
                                </div>
                                
                                <FormItem label="توضیحات سایت">
                                    <Input
                                        textArea
                                        value={settings.siteDescription}
                                        onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                                        placeholder="توضیح کوتاهی از سایت"
                                        rows={3}
                                    />
                                </FormItem>
                                
                                <FormItem label="کلمات کلیدی">
                                    <Input
                                        value={settings.siteKeywords}
                                        onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                                        placeholder="کلمات کلیدی را با کاما جدا کنید"
                                    />
                                </FormItem>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="ایمیل مدیر">
                                        <Input
                                            type="email"
                                            value={settings.adminEmail}
                                            onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                                            placeholder="admin@example.com"
                                        />
                                    </FormItem>
                                    
                                    <FormItem label="ایمیل تماس">
                                        <Input
                                            type="email"
                                            value={settings.contactEmail}
                                            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                            placeholder="contact@example.com"
                                        />
                                    </FormItem>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="شماره تماس">
                                        <Input
                                            value={settings.contactPhone}
                                            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                            placeholder="+98 21 1234 5678"
                                        />
                                    </FormItem>
                                    
                                    <FormItem label="زبان پیش‌فرض">
                                        <Select
                                            value={settings.defaultLanguage}
                                            onChange={(value) => handleInputChange('defaultLanguage', value)}
                                        >
                                            <Option value="fa">فارسی</Option>
                                            <Option value="en">انگلیسی</Option>
                                            <Option value="ar">عربی</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                                
                                <FormItem label="آدرس">
                                    <Input
                                        textArea
                                        value={settings.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        placeholder="آدرس کامل"
                                        rows={2}
                                    />
                                </FormItem>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <FormItem label="منطقه زمانی">
                                        <Select
                                            value={settings.timezone}
                                            onChange={(value) => handleInputChange('timezone', value)}
                                        >
                                            <Option value="Asia/Tehran">تهران</Option>
                                            <Option value="UTC">UTC</Option>
                                            <Option value="Europe/London">لندن</Option>
                                        </Select>
                                    </FormItem>
                                    
                                    <FormItem label="واحد پول">
                                        <Select
                                            value={settings.currency}
                                            onChange={(value) => handleInputChange('currency', value)}
                                        >
                                            <Option value="IRR">ریال</Option>
                                            <Option value="USD">دلار</Option>
                                            <Option value="EUR">یورو</Option>
                                        </Select>
                                    </FormItem>
                                    
                                    <FormItem label="فرمت تاریخ">
                                        <Select
                                            value={settings.dateFormat}
                                            onChange={(value) => handleInputChange('dateFormat', value)}
                                        >
                                            <Option value="YYYY/MM/DD">YYYY/MM/DD</Option>
                                            <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                                            <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                            </div>
                        </Tabs.TabContent>
                        
                        {/* تب ظاهر */}
                        <Tabs.TabContent value="appearance">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="لوگو سایت">
                                        <div className="space-y-3">
                                            <Upload
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                            >
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                                    {logoPreview ? (
                                                        <img src={logoPreview} alt="Logo" className="mx-auto h-20 object-contain" />
                                                    ) : (
                                                        <div>
                                                            <HiOutlineGlobe className="mx-auto h-12 w-12 text-gray-400" />
                                                            <p className="mt-2 text-sm text-gray-600">کلیک کنید یا فایل را بکشید</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Upload>
                                        </div>
                                    </FormItem>
                                    
                                    <FormItem label="فاویکون">
                                        <div className="space-y-3">
                                            <Upload
                                                accept="image/*"
                                                onChange={handleFaviconUpload}
                                            >
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                                    {faviconPreview ? (
                                                        <img src={faviconPreview} alt="Favicon" className="mx-auto h-8 w-8 object-contain" />
                                                    ) : (
                                                        <div>
                                                            <HiOutlineGlobe className="mx-auto h-8 w-8 text-gray-400" />
                                                            <p className="mt-2 text-xs text-gray-600">فاویکون (16x16)</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Upload>
                                        </div>
                                    </FormItem>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <FormItem label="رنگ اصلی">
                                        <div className="flex gap-3">
                                            <Input
                                                type="color"
                                                value={settings.primaryColor}
                                                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                                                className="w-16 h-10 p-1 border rounded"
                                            />
                                            <Input
                                                value={settings.primaryColor}
                                                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                                                placeholder="#3B82F6"
                                            />
                                        </div>
                                    </FormItem>
                                    
                                    <FormItem label="رنگ ثانویه">
                                        <div className="flex gap-3">
                                            <Input
                                                type="color"
                                                value={settings.secondaryColor}
                                                onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                                                className="w-16 h-10 p-1 border rounded"
                                            />
                                            <Input
                                                value={settings.secondaryColor}
                                                onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                                                placeholder="#10B981"
                                            />
                                        </div>
                                    </FormItem>
                                    
                                    <FormItem label="تم">
                                        <Select
                                            value={settings.theme}
                                            onChange={(value) => handleInputChange('theme', value)}
                                        >
                                            <Option value="light">روشن</Option>
                                            <Option value="dark">تیره</Option>
                                            <Option value="auto">خودکار</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                            </div>
                        </Tabs.TabContent>

                        {/* تب SEO */}
                        <Tabs.TabContent value="seo">
                            <div className="space-y-6">
                                <FormItem label="عنوان متا">
                                    <Input
                                        value={settings.metaTitle}
                                        onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                                        placeholder="عنوان صفحه در نتایج جستجو"
                                    />
                                </FormItem>
                                
                                <FormItem label="توضیحات متا">
                                    <Input
                                        textArea
                                        value={settings.metaDescription}
                                        onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                                        placeholder="توضیحات صفحه در نتایج جستجو"
                                        rows={3}
                                    />
                                </FormItem>
                                
                                <FormItem label="کلمات کلیدی متا">
                                    <Input
                                        value={settings.metaKeywords}
                                        onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                                        placeholder="کلمات کلیدی را با کاما جدا کنید"
                                    />
                                </FormItem>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="Google Analytics ID">
                                        <Input
                                            value={settings.googleAnalyticsId}
                                            onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                                            placeholder="GA-XXXXXXXXX-X"
                                        />
                                    </FormItem>
                                    
                                    <FormItem label="Google Tag Manager ID">
                                        <Input
                                            value={settings.googleTagManagerId}
                                            onChange={(e) => handleInputChange('googleTagManagerId', e.target.value)}
                                            placeholder="GTM-XXXXXXX"
                                        />
                                    </FormItem>
                                </div>
                            </div>
                        </Tabs.TabContent>

                        {/* تب امنیت */}
                        <Tabs.TabContent value="security">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="حالت تعمیر">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">فعال‌سازی حالت تعمیر</p>
                                                <p className="text-sm text-gray-600">سایت برای کاربران غیرفعال می‌شود</p>
                                            </div>
                                            <Switcher
                                                checked={settings.maintenanceMode}
                                                onChange={(checked) => handleInputChange('maintenanceMode', checked)}
                                            />
                                        </div>
                                    </FormItem>
                                    
                                    <FormItem label="ثبت‌نام کاربران">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">امکان ثبت‌نام</p>
                                                <p className="text-sm text-gray-600">کاربران جدید می‌توانند ثبت‌نام کنند</p>
                                            </div>
                                            <Switcher
                                                checked={settings.registrationEnabled}
                                                onChange={(checked) => handleInputChange('registrationEnabled', checked)}
                                            />
                                        </div>
                                    </FormItem>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="تأیید ایمیل">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">تأیید ایمیل الزامی</p>
                                                <p className="text-sm text-gray-600">کاربران باید ایمیل خود را تأیید کنند</p>
                                            </div>
                                            <Switcher
                                                checked={settings.emailVerificationRequired}
                                                onChange={(checked) => handleInputChange('emailVerificationRequired', checked)}
                                            />
                                        </div>
                                    </FormItem>
                                    
                                    <FormItem label="احراز هویت دو مرحله‌ای">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">2FA</p>
                                                <p className="text-sm text-gray-600">احراز هویت دو مرحله‌ای</p>
                                            </div>
                                            <Switcher
                                                checked={settings.twoFactorEnabled}
                                                onChange={(checked) => handleInputChange('twoFactorEnabled', checked)}
                                            />
                                        </div>
                                    </FormItem>
                                </div>
                            </div>
                        </Tabs.TabContent>

                        {/* تب ایمیل */}
                        <Tabs.TabContent value="email">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="SMTP Host">
                                        <Input
                                            value={settings.smtpHost}
                                            onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                                            placeholder="smtp.gmail.com"
                                        />
                                    </FormItem>
                                    
                                    <FormItem label="SMTP Port">
                                        <Input
                                            type="number"
                                            value={settings.smtpPort}
                                            onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
                                            placeholder="587"
                                        />
                                    </FormItem>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <FormItem label="نام کاربری SMTP">
                                        <Input
                                            value={settings.smtpUsername}
                                            onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                                            placeholder="your-email@gmail.com"
                                        />
                                    </FormItem>
                                    
                                    <FormItem label="رمز عبور SMTP">
                                        <Input
                                            type="password"
                                            value={settings.smtpPassword}
                                            onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                                            placeholder="رمز عبور"
                                        />
                                    </FormItem>
                                </div>
                                
                                <FormItem label="نوع رمزگذاری">
                                    <Select
                                        value={settings.smtpEncryption}
                                        onChange={(value) => handleInputChange('smtpEncryption', value)}
                                    >
                                        <Option value="tls">TLS</Option>
                                        <Option value="ssl">SSL</Option>
                                        <Option value="none">بدون رمزگذاری</Option>
                                    </Select>
                                </FormItem>
                            </div>
                        </Tabs.TabContent>

                        {/* تب شبکه‌های اجتماعی */}
                        <Tabs.TabContent value="social">
                            <div className="space-y-6">
                                <FormItem label="فیس‌بوک">
                                    <Input
                                        value={settings.facebookUrl}
                                        onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                                        placeholder="https://facebook.com/yourpage"
                                    />
                                </FormItem>
                                
                                <FormItem label="توییتر">
                                    <Input
                                        value={settings.twitterUrl}
                                        onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                                        placeholder="https://twitter.com/youraccount"
                                    />
                                </FormItem>
                                
                                <FormItem label="اینستاگرام">
                                    <Input
                                        value={settings.instagramUrl}
                                        onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                                        placeholder="https://instagram.com/youraccount"
                                    />
                                </FormItem>
                                
                                <FormItem label="لینکدین">
                                    <Input
                                        value={settings.linkedinUrl}
                                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                                        placeholder="https://linkedin.com/company/yourcompany"
                                    />
                                </FormItem>
                                
                                <FormItem label="تلگرام">
                                    <Input
                                        value={settings.telegramUrl}
                                        onChange={(e) => handleInputChange('telegramUrl', e.target.value)}
                                        placeholder="https://t.me/yourchannel"
                                    />
                                </FormItem>
                            </div>
                        </Tabs.TabContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    )
}

export default WebsiteSettings