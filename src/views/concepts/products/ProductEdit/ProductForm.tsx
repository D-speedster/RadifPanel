import { forwardRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Card from '@/components/ui/Card'
import OverviewSection from './OverviewSection'
import StatusSection from './StatusSection'
import ImageSection from './ImageSection'
import { ProductFormSchema } from './types'
import type { ProductFormSchema as ProductFormType } from './types'

type ProductFormProps = {
    defaultValues?: Partial<ProductFormType>
    onFormSubmit: (values: ProductFormType) => void
    newProduct?: boolean
}

const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
    ({ defaultValues = {}, onFormSubmit, newProduct = false }, ref) => {
        const {
            handleSubmit,
            formState: { errors },
            control,
        } = useForm<ProductFormType>({
            defaultValues: {
                name: '',
                productCode: '',
                category: '',
                price: 0,
                stock: 0,
                status: 1,
                img: '',
                ...defaultValues,
            },
            resolver: zodResolver(ProductFormSchema),
        })

        const onSubmit = (values: ProductFormType) => {
            onFormSubmit?.(values)
        }

        return (
            <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="mb-6">
                            <h5 className="text-lg font-semibold mb-2">
                                اطلاعات کلی محصول
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                اطلاعات اصلی محصول را وارد کنید
                            </p>
                        </div>
                        <OverviewSection control={control} errors={errors} />
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <div className="mb-6">
                            <h5 className="text-lg font-semibold mb-2">
                                وضعیت محصول
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                وضعیت فعلی محصول را تنظیم کنید
                            </p>
                        </div>
                        <StatusSection control={control} errors={errors} />
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <div className="mb-6">
                            <h5 className="text-lg font-semibold mb-2">
                                تصویر محصول
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                تصویر محصول را آپلود کنید
                            </p>
                        </div>
                        <ImageSection control={control} errors={errors} />
                    </div>
                </Card>
            </form>
        )
    },
)

ProductForm.displayName = 'ProductForm'

export default ProductForm