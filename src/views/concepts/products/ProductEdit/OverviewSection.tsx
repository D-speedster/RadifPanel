import { Controller } from 'react-hook-form'
import Input from '@/components/ui/Input'
import FormItem from '@/components/ui/Form/FormItem'
import FormContainer from '@/components/ui/Form/FormContainer'
import type { FormSectionBaseProps } from './types'

type OverviewSectionProps = FormSectionBaseProps

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    return (
        <FormContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormItem
                    label="نام محصول"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="نام محصول را وارد کنید"
                                invalid={Boolean(errors.name)}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="کد محصول"
                    invalid={Boolean(errors.productCode)}
                    errorMessage={errors.productCode?.message}
                >
                    <Controller
                        name="productCode"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="کد محصول را وارد کنید"
                                invalid={Boolean(errors.productCode)}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="دسته‌بندی"
                    invalid={Boolean(errors.category)}
                    errorMessage={errors.category?.message}
                >
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="دسته‌بندی محصول را وارد کنید"
                                invalid={Boolean(errors.category)}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="قیمت (تومان)"
                    invalid={Boolean(errors.price)}
                    errorMessage={errors.price?.message}
                >
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                placeholder="قیمت محصول را وارد کنید"
                                invalid={Boolean(errors.price)}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="موجودی"
                    invalid={Boolean(errors.stock)}
                    errorMessage={errors.stock?.message}
                >
                    <Controller
                        name="stock"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                placeholder="تعداد موجودی را وارد کنید"
                                invalid={Boolean(errors.stock)}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </FormContainer>
    )
}

export default OverviewSection