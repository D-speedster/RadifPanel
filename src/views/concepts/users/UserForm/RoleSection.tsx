import { Select, FormItem } from '@/components/ui'
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

const RoleSection = ({ control, errors, selectedRole }: RoleSectionProps) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <FormItem
                asterisk
                label="نقش کاربر"
                invalid={Boolean(errors.role)}
                errorMessage={errors.role?.message as string}
            >
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder="نقش را انتخاب کنید"
                            options={roleOptions}
                            onChange={(option) => {
                                field.onChange(option?.value || '')
                            }}
                            value={roleOptions.find(option => option.value === field.value)}
                        />
                    )}
                />
            </FormItem>

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
    )
}

export default RoleSection