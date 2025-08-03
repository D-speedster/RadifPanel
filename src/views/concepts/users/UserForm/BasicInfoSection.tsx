import { Card } from '@/components/ui'
import Input from '@/components/ui/Input'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type BasicInfoSectionProps = FormSectionBaseProps

const BasicInfoSection = ({ control, errors }: BasicInfoSectionProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام کامل <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="نام و نام خانوادگی را وارد کنید"
                            invalid={Boolean(errors.fullName)}
                        />
                    )}
                />
                {errors.fullName && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    ایمیل (اختیاری)
                </label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            placeholder="example@domain.com"
                            invalid={Boolean(errors.email)}
                        />
                    )}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تلفن <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="09123456789"
                            invalid={Boolean(errors.phone)}
                        />
                    )}
                />
                {errors.phone && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز عبور <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="password"
                            placeholder="حداقل ۶ کاراکتر"
                            invalid={Boolean(errors.password)}
                        />
                    )}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </span>
                )}
            </div>
        </div>
    )
}

export default BasicInfoSection