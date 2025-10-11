import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ProductForm from '../ProductForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { apiCreateProduct } from '@/services/ProductService'
import type { ProductFormSchema } from '../ProductForm/types'

const ProductCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: ProductFormSchema) => {
        try {
            setIsSubmiting(true)
            
            // ساخت بادی درخواست مطابق نیاز API
            const payload: any = {
                title: values.name,
                slug: values.productCode,
                image: values.imgList?.[0]?.img || '',
              
            }
            
            // فقط در صورت وجود parent_id آن را اضافه کن
            if (values.parent_id && values.parent_id.trim() !== '') {
                payload.parent_id = values.parent_id
            }
            
            console.log('🚀 Payload being sent:', payload)
            console.log('🔍 Form values:', values)
            
            await apiCreateProduct(payload)
            
            toast.push(
                <Notification type="success">محصول با موفقیت ایجاد شد!</Notification>,
                { placement: 'top-center' },
            )
            navigate('/concepts/products/product-list')
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    خطا در ایجاد محصول: {error instanceof Error ? error.message : 'خطای نامشخص'}
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">محصول دور ریخته شد!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/products/product-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <ProductForm
                newProduct
                defaultValues={{
                    name: '',
                    description: '',
                    productCode: '',
                    taxRate: 0,
                    price: '',
                    bulkDiscountPrice: '',
                    costPerItem: '',
                    imgList: [],
                    parent_id: '',
                    tags: [],
                    brand: '',
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                دور انداختن
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                ایجاد کنید
                            </Button>
                        </div>
                    </div>
                </Container>
            </ProductForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="تغییرات را کنار بگذارید"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                آیا مطمئنید که می خواهید این را کنار بگذارید؟ این اقدام نمی تواند
                لغو شود.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ProductCreate
