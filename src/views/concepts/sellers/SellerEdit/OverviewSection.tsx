import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type OverviewSectionProps = FormSectionBaseProps

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    return (
        <Card>
            <h5 className="mb-4">اطلاعات کلی</h5>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="نام فروشنده"
                                placeholder="نام فروشنده را وارد کنید"
                                invalid={Boolean(errors.name)}
                            />
                        )}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="email"
                                label="ایمیل"
                                placeholder="ایمیل را وارد کنید"
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
                <div className="md:col-span-2">
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="شماره تلفن"
                                placeholder="شماره تلفن را وارد کنید"
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
            </div>
        </Card>
    )
}

export default OverviewSection