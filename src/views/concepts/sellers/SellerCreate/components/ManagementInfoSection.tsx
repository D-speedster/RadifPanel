import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import FormItem from '@/components/ui/Form/FormItem'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const ManagementInfoSection = ({ control, errors }: FormSectionBaseProps) => {
    const statusOptions = [
        { value: 'active', label: 'فعال' },
        { value: 'inactive', label: 'غیرفعال' },
        { value: 'pending', label: 'در حال بررسی' }
    ]

    return (
        <Card className="mb-6">
            <div className="p-6">
                <h4 className="mb-6 text-lg font-semibold text-gray-900">
                    اطلاعات مدیریتی
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem
                        label="وضعیت فروشنده"
                        invalid={Boolean(errors.status)}
                        errorMessage={errors.status?.message}
                        asterisk
                    >
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="وضعیت را انتخاب کنید"
                                    options={statusOptions}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="تاریخ ثبت"
                        invalid={Boolean(errors.registrationDate)}
                        errorMessage={errors.registrationDate?.message}
                        asterisk
                    >
                        <Controller
                            name="registrationDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="date"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <div className="md:col-span-2">
                        <FormItem
                            label="یوزر/ادمین مسئول فروشگاه"
                            invalid={Boolean(errors.responsibleAdmin)}
                            errorMessage={errors.responsibleAdmin?.message}
                        >
                            <Controller
                                name="responsibleAdmin"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="نام کاربری یا ایمیل ادمین مسئول (اختیاری)"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ManagementInfoSection