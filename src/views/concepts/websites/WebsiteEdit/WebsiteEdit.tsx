import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetWebsite } from '@/services/WebsiteService'
import WebsiteForm from '../WebsiteForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'
import type { WebsiteFormSchema } from '../WebsiteForm'
import type { Website } from '../weblist/types'

const WebsiteEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        id ? `/api/websites/${id}` : null,
        () => apiGetWebsite(Number(id)),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: WebsiteFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        await sleep(800)
        setIsSubmiting(false)
        toast.push(<Notification type="success">تغییرات ذخیره شد!</Notification>, {
            placement: 'top-center',
        })
        navigate('/websites')
    }

    const getDefaultValues = () => {
        if (data) {
            const { name, url, isActive } = data

            return {
                name,
                url,
                isActive,
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(false)
        toast.push(
            <Notification type="success">وب‌سایت حذف شد!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/websites')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        navigate('/websites')
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">وب‌سایتی پیدا نشد!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <WebsiteForm
                        defaultValues={getDefaultValues() as WebsiteFormSchema}
                        newWebsite={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    برگشت
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        حذف کنید
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        ذخیره کنید
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </WebsiteForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="وب‌سایت را حذف کنید"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            آیا مطمئنید که می خواهید این وب‌سایت را حذف کنید؟ این
                            عمل را نمی توان واگرد کرد.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default WebsiteEdit