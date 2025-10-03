import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetSeller, apiUpdateSeller, apiDeleteSeller } from '@/services/SellerService'
import SellerForm from './SellerForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'
import type { SellerFormSchema } from './types'
import type { Seller } from '../SellerList/types'

const SellerEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/api/sellers/${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetSeller<Seller, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: SellerFormSchema) => {
        if (!id) return
        
        try {
            setIsSubmiting(true)
            // فقط فیلدهای موردنیاز API را ارسال می‌کنیم
            const payload = {
                name: values.name,
                email: values.email,
                mobile: values.phone,
                address: (data as any)?.address ?? '',
                description: (data as any)?.description ?? '',
            }
            await apiUpdateSeller(id, payload)
            toast.push(
                <Notification type="success">تغییرات فروشنده با موفقیت ذخیره شد!</Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/sellers')
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    خطا در ذخیره تغییرات: {error instanceof Error ? error.message : 'خطای نامشخص'}
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const getDefaultValues = (): SellerFormSchema => {
        if (data) {
            const { name, email, phone, status, role, product_count, avatar } = data

            return {
                name: name || '',
                email: email || '',
                phone: phone || '',
                status: status || 'active',
                role: role || 'standard',
                product_count: product_count || 0,
                avatar: avatar || '',
            }
        }

        return {
            name: '',
            email: '',
            phone: '',
            status: 'active',
            role: 'standard',
            product_count: 0,
            avatar: '',
        }
    }

    const handleConfirmDelete = async () => {
        if (!id) return
        
        try {
            await apiDeleteSeller(id)
            setDeleteConfirmationOpen(false)
            toast.push(
                <Notification type="success">فروشنده با موفقیت حذف شد!</Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/sellers')
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    خطا در حذف فروشنده: {error instanceof Error ? error.message : 'خطای نامشخص'}
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        }
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        navigate('/sellers')
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">فروشنده‌ای پیدا نشد!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <SellerForm
                        defaultValues={getDefaultValues()}
                        newSeller={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8 py-4">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    برگشت
                                </Button>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        حذف فروشنده
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        ذخیره تغییرات
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </SellerForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="حذف فروشنده"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            آیا مطمئنید که می‌خواهید این فروشنده را حذف کنید؟ این
                            عمل قابل برگشت نیست.
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default SellerEdit