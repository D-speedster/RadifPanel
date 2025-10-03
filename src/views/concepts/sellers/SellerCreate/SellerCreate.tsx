import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import SellerCreateForm from './SellerCreateForm'
import sleep from '@/utils/sleep'
import { apiCreateSeller } from '@/services/SellerService'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import type { SellerCreateFormSchema } from './types'

const SellerCreate = () => {
    const navigate = useNavigate()
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: SellerCreateFormSchema) => {
        setIsSubmiting(true)
        try {
            // ساخت payload مطابق نیاز API
            const payload = {
                name: values.storeName,
                mobile: values.phone,
                email: values.supportEmail,
                password: values.password,
                address: values.address,
                description: values.description,
            }

            await apiCreateSeller<any, typeof payload>(payload)
            
            toast.push(
                <Notification
                    title="موفقیت"
                    type="success"
                    duration={2500}
                >
                    فروشنده جدید با موفقیت ایجاد شد
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            
            // بازگشت به لیست فروشندگان
            navigate('/sellers')
        } catch (error) {
            toast.push(
                <Notification
                    title="خطا"
                    type="danger"
                    duration={2500}
                >
                    خطا در ایجاد فروشنده. لطفاً دوباره تلاش کنید.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleBack = () => {
        navigate('/sellers')
    }

    return (
        <SellerCreateForm onFormSubmit={handleFormSubmit}>
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
                            type="submit"
                            variant="solid"
                            loading={isSubmiting}
                        >
                            ایجاد فروشنده
                        </Button>
                    </div>
                </div>
            </Container>
        </SellerCreateForm>
    )
}

export default SellerCreate