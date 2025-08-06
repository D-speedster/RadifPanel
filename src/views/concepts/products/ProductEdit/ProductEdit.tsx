import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import { apiGetProduct, apiUpdateProduct, apiDeleteProduct } from '@/services/ProductService'
import sleep from '@/utils/sleep'
import ProductForm from './ProductForm'
import { useState } from 'react'
import type { ProductFormSchema } from './types'
import type { Product } from '../ProductList/types'

const ProductEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const formRef = useRef<HTMLFormElement>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

    const { data: productData, mutate } = useSWR(
        id ? [`/api/products/${id}`, { id }] : null,
        ([, params]) => apiGetProduct<Product>(params),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    const onFormSubmit = async (values: ProductFormSchema) => {
        if (!id) return

        try {
            await sleep(800)
            await apiUpdateProduct(id, values)
            mutate()
            toast.push(
                <Notification
                    title="محصول با موفقیت به‌روزرسانی شد"
                    type="success"
                />,
                {
                    placement: 'top-center',
                },
            )
        } catch (error) {
            console.error('Error updating product:', error)
            toast.push(
                <Notification
                    title="خطا در به‌روزرسانی محصول"
                    type="danger"
                />,
                {
                    placement: 'top-center',
                },
            )
        }
    }

    const handleConfirmDelete = async () => {
        if (!id) return

        try {
            await apiDeleteProduct(id)
            toast.push(
                <Notification
                    title="محصول با موفقیت حذف شد"
                    type="success"
                />,
                {
                    placement: 'top-center',
                },
            )
            navigate('/products-list')
        } catch (error) {
            console.error('Error deleting product:', error)
            toast.push(
                <Notification
                    title="خطا در حذف محصول"
                    type="danger"
                />,
                {
                    placement: 'top-center',
                },
            )
        }
        setConfirmDialogOpen(false)
    }

    const handleDelete = () => {
        setConfirmDialogOpen(true)
    }

    const handleCancel = () => {
        setConfirmDialogOpen(false)
    }

    const handleDiscard = () => {
        navigate('/products-list')
    }

    const handleFormSubmit = () => {
        formRef.current?.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true }),
        )
    }

    return (
        <>
            <Container className="h-full">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">
                            {productData ? `ویرایش محصول: ${productData.name}` : 'ویرایش محصول'}
                        </h3>
                    </div>
                    <div className="flex-1">
                        {productData && (
                            <ProductForm
                                ref={formRef}
                                defaultValues={{
                                    name: productData.name || '',
                                    productCode: productData.productCode || '',
                                    category: productData.category || '',
                                    price: productData.price || 0,
                                    stock: productData.stock || 0,
                                    status: productData.status || 1,
                                    img: productData.img || '',
                                }}
                                onFormSubmit={onFormSubmit}
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                className="ltr:mr-2 rtl:ml-2"
                                type="button"
                                onClick={handleDiscard}
                            >
                                بازگشت
                            </Button>
                            <Button
                                size="sm"
                                variant="solid"
                                color="red-600"
                                type="button"
                                onClick={handleDelete}
                            >
                                حذف محصول
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            variant="solid"
                            type="button"
                            onClick={handleFormSubmit}
                        >
                            ذخیره تغییرات
                        </Button>
                    </div>
                </div>
            </Container>
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                type="danger"
                title="حذف محصول"
                confirmButtonColor="red-600"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟ این عمل قابل بازگشت نیست.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ProductEdit