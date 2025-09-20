import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import FormItem from '@/components/ui/Form/FormItem'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const DisplaySettingsSection = ({ control, errors }: FormSectionBaseProps) => {
    const categoryOptions = [
        { value: 'electronics', label: 'الکترونیک' },
        { value: 'clothing', label: 'پوشاک' },
        { value: 'home-garden', label: 'خانه و باغ' },
        { value: 'books', label: 'کتاب' },
        { value: 'sports', label: 'ورزش' },
        { value: 'beauty', label: 'زیبایی و سلامت' },
        { value: 'automotive', label: 'خودرو' },
        { value: 'toys', label: 'اسباب بازی' },
        { value: 'food', label: 'مواد غذایی' },
        { value: 'jewelry', label: 'جواهرات' },
        { value: 'art', label: 'هنر و صنایع دستی' },
        { value: 'music', label: 'موسیقی' },
        { value: 'office', label: 'اداری' },
        { value: 'pet', label: 'حیوانات خانگی' },
        { value: 'travel', label: 'سفر' }
    ]

    return (
        <Card className="mb-6">
            <div className="p-6">
                <h4 className="mb-6 text-lg font-semibold text-gray-900">
                    تنظیمات نمایش در سایت
                </h4>
                
                <div className="grid grid-cols-1 gap-6">
                    <FormItem
                        label="دسته‌بندی کالاهایی که فروشنده پوشش می‌دهد"
                        invalid={Boolean(errors.productCategories)}
                        errorMessage={errors.productCategories?.message}
                        asterisk
                    >
                        <Controller
                            name="productCategories"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    isMulti
                                    placeholder="دسته‌بندی‌ها را انتخاب کنید"
                                    options={categoryOptions}
                                    value={categoryOptions.filter(option => 
                                        field.value?.includes(option.value)
                                    )}
                                    onChange={(selectedOptions) => {
                                        const values = selectedOptions 
                                            ? selectedOptions.map(option => option.value)
                                            : []
                                        field.onChange(values)
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                        <strong>راهنما:</strong> انتخاب دسته‌بندی‌های مناسب به بهتر نمایش داده شدن محصولات فروشنده 
                        و افزایش فروش کمک می‌کند. می‌توانید چندین دسته‌بندی انتخاب کنید.
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default DisplaySettingsSection