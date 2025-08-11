import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import UserForm from '../UserForm'
import { apiUpdateUser } from '@/services/UserService'
import useUserList from '../UserList/hooks/useUserList'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Spinner from '@/components/ui/Spinner'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import type { UserFormSchema } from '../UserForm'
import type { User } from '../UserList/types'

const UserEdit = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { userList, isLoading } = useUserList()
    const [user, setUser] = useState<User | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)

    useEffect(() => {
        if (id && userList.length > 0) {
            const foundUser = userList.find(u => u.id?.toString() === id)
            if (foundUser) {
                setUser(foundUser)
            } else {
                toast.push(
                    <Notification type="danger">
                        کاربر یافت نشد!
                    </Notification>,
                    { placement: 'top-center' }
                )
                navigate('/users-list')
            }
        }
    }, [id, userList, navigate])

    const handleFormSubmit = async (values: UserFormSchema) => {
        try {
            setSubmitting(true)
            
            // Transform form data to API format
            const transformedData = {
                name: values.fullName,
                email: values.email,
                mobile: values.phone,
                role: values.role,
                status: values.status,
                // Only include password if it's provided
                ...(values.password && values.password.trim() !== '' && {
                    password: values.password
                }),
                // Add role-specific fields if needed
                ...(values.role === 'seller' && {
                    shop_name: values.shopName,
                    business_license: values.businessLicense,
                    bank_account: values.bankAccount,
                }),
                ...(values.role === 'admin' && {
                    department: values.department,
                    access_level: values.accessLevel,
                    shift: values.shift,
                    work_area: values.workArea,
                })
            }

            await apiUpdateUser(id!, transformedData)
            
            toast.push(
                <Notification type="success">
                    کاربر با موفقیت به‌روزرسانی شد!
                </Notification>,
                { placement: 'top-center' }
            )
            
            navigate('/users-list')
        } catch (error) {
            toast.push(
                <Notification type="danger">
                    خطا در به‌روزرسانی کاربر!
                </Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        navigate('/users-list')
    }

    const handleCancelDiscard = () => {
        setDiscardConfirmationOpen(false)
    }

    // Convert user data to form format
    const getDefaultValues = (): UserFormSchema | undefined => {
        if (!user) return undefined
        
        return {
            fullName: user.name || '',
            email: user.email || '',
            phone: user.mobile || user.phone || '',
            password: '', // Don't populate password for security
            role: user.role || '',
            status: user.status || 'active',
            shopName: user.shop_name || '',
            businessLicense: user.business_license || '',
            bankAccount: user.bank_account || '',
            department: user.department || '',
            accessLevel: user.access_level || '',
            shift: user.shift || '',
            workArea: user.work_area || '',
        }
    }

    if (isLoading) {
        return (
            <Container>
                <div className="flex items-center justify-center h-96">
                    <Spinner size={40} />
                </div>
            </Container>
        )
    }

    if (!user) {
        return (
            <Container>
                <div className="text-center py-8">
                    <p>کاربر یافت نشد</p>
                </div>
            </Container>
        )
    }

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="mb-6">
                        <h3 className="mb-2">ویرایش کاربر</h3>
                        <p className="text-base">ویرایش اطلاعات کاربر {user.name}</p>
                    </div>
                    <UserForm
                        onFormSubmit={handleFormSubmit}
                        defaultValues={getDefaultValues()}
                        newUser={false}
                    >
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="btn btn-default"
                                onClick={handleDiscard}
                                disabled={submitting}
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                className="btn btn-solid"
                                disabled={submitting}
                            >
                                {submitting ? 'در حال به‌روزرسانی...' : 'به‌روزرسانی کاربر'}
                            </button>
                        </div>
                    </UserForm>
                </AdaptiveCard>
            </Container>
            
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="انصراف از ویرایش"
                onClose={handleCancelDiscard}
                onRequestClose={handleCancelDiscard}
                onCancel={handleCancelDiscard}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    آیا مطمئن هستید که می‌خواهید از ویرایش کاربر انصراف دهید؟
                    تغییرات ذخیره نشده از بین خواهد رفت.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserEdit