import Input from '@/components/ui/Input'
import { Select } from '@/components/ui'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type RoleSpecificFieldsProps = FormSectionBaseProps & {
    selectedRole: string
}

const departmentOptions = [
    { value: '', label: 'بخش را انتخاب کنید' },
    { value: 'sales', label: 'فروش' },
    { value: 'marketing', label: 'بازاریابی' },
    { value: 'technical', label: 'فنی' },
    { value: 'finance', label: 'مالی' },
    { value: 'hr', label: 'منابع انسانی' },
]

const accessLevelOptions = [
    { value: '', label: 'سطح دسترسی را انتخاب کنید' },
    { value: 'full', label: 'دسترسی کامل' },
    { value: 'limited', label: 'دسترسی محدود' },
    { value: 'read_only', label: 'فقط خواندن' },
]

const shiftOptions = [
    { value: '', label: 'شیفت کاری را انتخاب کنید' },
    { value: 'morning', label: 'صبح (۸-۱۶)' },
    { value: 'evening', label: 'عصر (۱۶-۲۴)' },
    { value: 'night', label: 'شب (۲۴-۸)' },
    { value: 'flexible', label: 'انعطاف‌پذیر' },
]

const workAreaOptions = [
    { value: '', label: 'حوزه کاری را انتخاب کنید' },
    { value: 'customer_service', label: 'خدمات مشتریان' },
    { value: 'technical_support', label: 'پشتیبانی فنی' },
    { value: 'quality_control', label: 'کنترل کیفیت' },
    { value: 'data_entry', label: 'ورود اطلاعات' },
]

const RoleSpecificFields = ({ control, errors, selectedRole }: RoleSpecificFieldsProps) => {
    if (!selectedRole) return null

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
                اطلاعات تخصصی {selectedRole === 'seller' ? 'فروشنده' : 
                selectedRole === 'admin' ? 'مدیر' : 
                selectedRole === 'operator' ? 'اپراتور' : 'کاربر'}
            </h3>
            
            {/* فیلدهای فروشنده */}
            {selectedRole === 'seller' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            نام فروشگاه <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="shopName"
                            control={control}
                            rules={{ required: 'نام فروشگاه الزامی است' }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="نام فروشگاه خود را وارد کنید"
                                    invalid={Boolean(errors.shopName)}
                                />
                            )}
                        />
                        {errors.shopName && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.shopName.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            مجوز کسب و کار
                        </label>
                        <Controller
                            name="businessLicense"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="شماره مجوز کسب و کار"
                                    invalid={Boolean(errors.businessLicense)}
                                />
                            )}
                        />
                        {errors.businessLicense && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.businessLicense.message}
                            </span>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            شماره حساب بانکی
                        </label>
                        <Controller
                            name="bankAccount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="شماره حساب برای واریز درآمد"
                                    invalid={Boolean(errors.bankAccount)}
                                />
                            )}
                        />
                        {errors.bankAccount && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.bankAccount.message}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* فیلدهای مدیر */}
            {selectedRole === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            بخش مسئولیت <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="department"
                            control={control}
                            rules={{ required: 'انتخاب بخش الزامی است' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="بخش را انتخاب کنید"
                                    options={departmentOptions}
                                    invalid={Boolean(errors.department)}
                                    onChange={(option) => {
                                        field.onChange(option?.value || '')
                                    }}
                                    value={departmentOptions.find(option => option.value === field.value)}
                                />
                            )}
                        />
                        {errors.department && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.department.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            سطح دسترسی <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="accessLevel"
                            control={control}
                            rules={{ required: 'انتخاب سطح دسترسی الزامی است' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="سطح دسترسی را انتخاب کنید"
                                    options={accessLevelOptions}
                                    invalid={Boolean(errors.accessLevel)}
                                    onChange={(option) => {
                                        field.onChange(option?.value || '')
                                    }}
                                    value={accessLevelOptions.find(option => option.value === field.value)}
                                />
                            )}
                        />
                        {errors.accessLevel && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.accessLevel.message}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* فیلدهای اپراتور */}
            {selectedRole === 'operator' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            شیفت کاری <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="shift"
                            control={control}
                            rules={{ required: 'انتخاب شیفت الزامی است' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="شیفت کاری را انتخاب کنید"
                                    options={shiftOptions}
                                    invalid={Boolean(errors.shift)}
                                    onChange={(option) => {
                                        field.onChange(option?.value || '')
                                    }}
                                    value={shiftOptions.find(option => option.value === field.value)}
                                />
                            )}
                        />
                        {errors.shift && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.shift.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            حوزه کاری <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="workArea"
                            control={control}
                            rules={{ required: 'انتخاب حوزه کاری الزامی است' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="حوزه کاری را انتخاب کنید"
                                    options={workAreaOptions}
                                    invalid={Boolean(errors.workArea)}
                                    onChange={(option) => {
                                        field.onChange(option?.value || '')
                                    }}
                                    value={workAreaOptions.find(option => option.value === field.value)}
                                />
                            )}
                        />
                        {errors.workArea && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.workArea.message}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* برای کاربر عادی پیام نمایش داده می‌شود */}
            {selectedRole === 'user' && (
                <div className="text-center py-8">
                    <p className="text-gray-600">
                        برای کاربران عادی، اطلاعات پایه کافی است.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        کاربران عادی دسترسی محدود به سیستم خواهند داشت.
                    </p>
                </div>
            )}
        </div>
    )
}

export default RoleSpecificFields