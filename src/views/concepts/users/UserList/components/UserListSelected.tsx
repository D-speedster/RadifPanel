import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useUserList from '../hooks/useUserList'
import { apiDeleteUser } from '@/services/UserService'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { TbChecks } from 'react-icons/tb'

const UserListSelected = () => {
    const {
        selectedUser,
        userList,
        mutate,
        userListTotal,
        setSelectAllUser,
    } = useUserList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        try {
            // Send individual delete requests for each selected user
            const deletePromises = selectedUser.map(async (userId) => {
                try {
                    await apiDeleteUser(userId)
                    return { success: true, userId }
                } catch (error) {
                    console.error(`Failed to delete user ${userId}:`, error)
                    return { success: false, userId, error }
                }
            })

            const results = await Promise.allSettled(deletePromises)
            
            // Count successful and failed deletions
            let successCount = 0
            let failedCount = 0
            
            results.forEach((result) => {
                if (result.status === 'fulfilled' && result.value.success) {
                    successCount++
                } else {
                    failedCount++
                }
            })

            // Show appropriate notifications
            if (successCount > 0) {
                toast.push(
                    <Notification
                        title="موفقیت"
                        type="success"
                        duration={2500}
                    >
                        {successCount} کاربر با موفقیت حذف شد
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }

            if (failedCount > 0) {
                toast.push(
                    <Notification
                        title="خطا"
                        type="danger"
                        duration={4000}
                    >
                        {failedCount} کاربر حذف نشد. لطفا دوباره تلاش کنید
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }

            // Refresh the user list from server
            mutate()
            
            // Clear selections
            setSelectAllUser([])
            setDeleteConfirmationOpen(false)
            
        } catch (error) {
            console.error('Bulk delete error:', error)
            toast.push(
                <Notification
                    title="خطا"
                    type="danger"
                    duration={4000}
                >
                    خطا در حذف کاربران. لطفا دوباره تلاش کنید
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            setDeleteConfirmationOpen(false)
        }
    }

    return (
        <>
            {selectedUser.length > 0 && (
                <StickyFooter
                    className="flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedUser.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedUser.length}{' '}
                                                کاربر
                                            </span>
                                            <span>انتخاب شده</span>
                                        </span>
                                    </span>
                                )}
                            </span>

                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                    }
                                    onClick={handleDelete}
                                >
                                    حذف
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="حذف کاربران"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    آیا مطمئن هستید که می خواهید این کاربران را حذف کنید؟ این اقدام
                    قابل لغو نیست.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserListSelected