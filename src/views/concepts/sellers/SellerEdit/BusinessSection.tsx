import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type BusinessSectionProps = FormSectionBaseProps

const statusOptions = [
    { value: 'active', label: 'فعال' },
    { value: 'pending', label: 'در انتظار تایید' },
    { value: 'inactive', label: 'غیرفعال' },
]

const roleOptions = [
    { value: 'premium', label: 'پریمیوم' },
    { value: 'standard', label: 'استاندارد' },
]

const BusinessSection = ({ control, errors }: BusinessSectionProps) => {
    return (
        <Card>
            <h5 className="mb-4">اطلاعات کسب و کار</h5>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="وضعیت"
                                placeholder="وضعیت را انتخاب کنید"
                                options={statusOptions}
                                value={statusOptions.find(option => option.value === field.value)}
                                onChange={(option) => field.onChange(option?.value)}
                                invalid={Boolean(errors.status)}
                            />
                        )}
                    />
                    {errors.status && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.status.message}
                        </span>
                    )}
                </div>
                <div>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="نوع اکانت"
                                placeholder="نوع اکانت را انتخاب کنید"
                                options={roleOptions}
                                value={roleOptions.find(option => option.value === field.value)}
                                onChange={(option) => field.onChange(option?.value)}
                                invalid={Boolean(errors.role)}
                            />
                        )}
                    />
                    {errors.role && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.role.message}
                        </span>
                    )}
                </div>
                <div className="md:col-span-2">
                    <Controller
                        name="product_count"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                label="تعداد محصولات"
                                placeholder="تعداد محصولات را وارد کنید"
                                invalid={Boolean(errors.product_count)}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                    {errors.product_count && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.product_count.message}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default BusinessSection