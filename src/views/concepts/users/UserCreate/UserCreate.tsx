import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import UserForm from '../UserForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { apiCreateUser } from '@/services/UserService'
import type { UserFormSchema } from '../UserForm'

const UserCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: UserFormSchema) => {
        setIsSubmiting(true)
        try {
            await apiCreateUser(values)
            toast.push(
                <Notification type="success">کاربر جدید ایجاد شد!</Notification>,
                { placement: 'top-center' },
            )
            navigate('/users-list')
        } catch (error) {
            toast.push(
                <Notification type="danger">خطا در ایجاد کاربر!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        toast.push(
            <Notification type="success">فرم کنار گذاشته شد!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/users-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <UserForm
                newUser
                defaultValues={{
                    fullName: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: '',
                    status: 'active',
                    shopName: '',
                    businessLicense: '',
                    bankAccount: '',
                    department: '',
                    accessLevel: '',
                    shift: '',
                    workArea: '',
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
                                لغو
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                ایجاد کاربر
                            </Button>
                        </div>
                    </div>
                </Container>
            </UserForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="لغو ایجاد کاربر"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    آیا مطمئنید که می‌خواهید این فرم را لغو کنید؟ تمام اطلاعات وارد شده از بین خواهد رفت.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserCreate