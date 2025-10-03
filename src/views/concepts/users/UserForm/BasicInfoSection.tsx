import { Card, FormItem } from '@/components/ui'
import Input from '@/components/ui/Input'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type BasicInfoSectionProps = FormSectionBaseProps

const BasicInfoSection = ({ control, errors }: BasicInfoSectionProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem
                asterisk
                label="نام"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message as string}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="نام کاربر را وارد کنید"
                        />
                    )}
                />
            </FormItem>

            <FormItem
                asterisk
                label="ایمیل"
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message as string}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            placeholder="example@domain.com"
                        />
                    )}
                />
            </FormItem>

            <FormItem
                asterisk
                label="موبایل"
                invalid={Boolean(errors.mobile)}
                errorMessage={errors.mobile?.message as string}
            >
                <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="09123456789"
                        />
                    )}
                />
            </FormItem>

            <FormItem
                asterisk
                label="رمز عبور"
                invalid={Boolean(errors.password)}
                errorMessage={errors.password?.message as string}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="password"
                            placeholder="حداقل ۶ کاراکتر"
                        />
                    )}
                />
            </FormItem>
        </div>
    )
}

export default BasicInfoSection