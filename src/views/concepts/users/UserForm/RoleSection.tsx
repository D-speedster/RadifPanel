import { Select } from '@/components/ui'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type RoleSectionProps = FormSectionBaseProps & {
    selectedRole: string
}

const roleOptions = [
    { value: '', label: 'نقش را انتخاب کنید' },
    { value: 'admin', label: 'مدیر' },
    { value: 'seller', label: 'فروشنده' },
    { value: 'user', label: 'کاربر عادی' },
    { value: 'operator', label: 'اپراتور' },
]

const getStatusOptions = (role: string) => {
    const baseOptions = [
        { value: '', label: 'وضعیت را انتخاب کنید' },
        { value: 'active', label: 'فعال' },
        { value: 'inactive', label: 'غیرفعال' },
    ]

    // برای فروشنده، گزینه‌های خاص اضافه می‌شود
    if (role === 'seller') {
        return [
            { value: '', label: 'وضعیت را انتخاب کنید' },
            { value: 'active', label: 'فعال' },
            { value: 'inactive', label: 'غیرفعال' },
            { value: 'pending', label: 'در انتظار تایید' },
            { value: 'suspended', label: 'تعلیق شده' },
        ]
    }

    // برای مدیر
    if (role === 'admin') {
        return [
            { value: '', label: 'وضعیت را انتخاب کنید' },
            { value: 'active', label: 'فعال' },
            { value: 'inactive', label: 'غیرفعال' },
            { value: 'super_admin', label: 'مدیر ارشد' },
        ]
    }

    // برای اپراتور
    if (role === 'operator') {
        return [
            { value: '', label: 'وضعیت را انتخاب کنید' },
            { value: 'active', label: 'فعال' },
            { value: 'inactive', label: 'غیرفعال' },
            { value: 'limited', label: 'دسترسی محدود' },
        ]
    }

    return baseOptions
}

const RoleSection = ({ control, errors, selectedRole }: RoleSectionProps) => {
    const statusOptions = getStatusOptions(selectedRole)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    نقش کاربر <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder="نقش را انتخاب کنید"
                            options={roleOptions}
                            invalid={Boolean(errors.role)}
                            onChange={(option) => {
                                field.onChange(option?.value || '')
                            }}
                            value={roleOptions.find(option => option.value === field.value)}
                        />
                    )}
                />
                {errors.role && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.role.message}
                    </span>
                )}
                
                {/* راهنمای نقش‌ها */}
                <div className="mt-2 text-xs text-gray-500">
                    {selectedRole === 'admin' && (
                        <p>• مدیر: دسترسی کامل به تمام بخش‌های سیستم</p>
                    )}
                    {selectedRole === 'seller' && (
                        <p>• فروشنده: دسترسی به مدیریت محصولات و سفارشات</p>
                    )}
                    {selectedRole === 'user' && (
                        <p>• کاربر عادی: دسترسی محدود به مشاهده اطلاعات</p>
                    )}
                    {selectedRole === 'operator' && (
                        <p>• اپراتور: دسترسی به عملیات روزانه و گزارش‌گیری</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder="وضعیت را انتخاب کنید"
                            options={statusOptions}
                            invalid={Boolean(errors.status)}
                            disabled={!selectedRole}
                            onChange={(option) => {
                                field.onChange(option?.value || '')
                            }}
                            value={statusOptions.find(option => option.value === field.value)}
                        />
                    )}
                />
                {errors.status && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.status.message}
                    </span>
                )}
                
                {!selectedRole && (
                    <p className="mt-2 text-xs text-gray-500">
                        ابتدا نقش کاربر را انتخاب کنید
                    </p>
                )}
                
                {/* راهنمای وضعیت‌ها */}
                {selectedRole && (
                    <div className="mt-2 text-xs text-gray-500">
                        {selectedRole === 'seller' && (
                            <div>
                                <p>• فعال: می‌تواند محصولات خود را مدیریت کند</p>
                                <p>• غیرفعال: دسترسی موقتاً قطع شده</p>
                                <p>• در انتظار تایید: نیاز به تایید مدیر</p>
                                <p>• تعلیق شده: به دلیل نقض قوانین</p>
                            </div>
                        )}
                        {selectedRole === 'admin' && (
                            <div>
                                <p>• فعال: دسترسی کامل</p>
                                <p>• غیرفعال: دسترسی موقتاً قطع شده</p>
                                <p>• مدیر ارشد: بالاترین سطح دسترسی</p>
                            </div>
                        )}
                        {selectedRole === 'operator' && (
                            <div>
                                <p>• فعال: دسترسی کامل اپراتور</p>
                                <p>• غیرفعال: دسترسی موقتاً قطع شده</p>
                                <p>• دسترسی محدود: فقط عملیات خاص</p>
                            </div>
                        )}
                        {selectedRole === 'user' && (
                            <div>
                                <p>• فعال: می‌تواند از سیستم استفاده کند</p>
                                <p>• غیرفعال: دسترسی موقتاً قطع شده</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoleSection