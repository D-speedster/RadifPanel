import { useMemo, useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useUserList from '../hooks/useUserList'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { TbPencil, TbTrash, TbWifiOff } from 'react-icons/tb'
import { FiUser } from 'react-icons/fi'
import { isOnline, getErrorMessage, addNetworkStatusListener } from '@/utils/networkUtils'
import { apiDeleteUser } from '@/services/UserService'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { User } from '../types'
import type { TableQueries } from '@/@types/common'

const UserColumn = ({ row }: { row: User }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                shape="round"
                size={60}
                {...(row.avatar ? { src: row.avatar } : { icon: <FiUser /> })}
            />
            <div>
                <div className="font-bold heading-text mb-1">{row.name}</div>
                <span>ایمیل: {row.email}</span>
            </div>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onDelete,
}: {
    onEdit: () => void
    onDelete: () => void
}) => {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                size="sm"
                className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1"
                onClick={onEdit}
            >
                <TbPencil className="w-4 h-4" />
                ویرایش
            </Button>
            <Button
                size="sm"
                className="px-3 py-1.5 text-xs border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1"
                onClick={onDelete}
            >
                <TbTrash className="w-4 h-4" />
                حذف
            </Button>
        </div>
    )
}

const UserListTable = () => {
    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('')
    const [networkStatus, setNetworkStatus] = useState(isOnline())
    const [isDeleting, setIsDeleting] = useState(false)

    // Network status monitoring
    useEffect(() => {
        const cleanup = addNetworkStatusListener(setNetworkStatus)
        return cleanup
    }, [])

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (user: User) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId(user.id)
    }

    const handleEdit = (user: User) => {
        navigate(`/concepts/users/user-edit/${user.id}`)
    }

    const handleConfirmDelete = async () => {
        setIsDeleting(true)
        try {
            const resp = await apiDeleteUser<{ success?: boolean; message?: string }>(toDeleteId)
            if (resp && (resp as any).success === false) {
                toast.push(
                    <Notification type="danger">
                        شما دسترسی حذف این کاربر را ندارید
                    </Notification>,
                    { placement: 'top-center' },
                )
                return
            }
            
            // Update local state after successful API call
            const newUserList = userList.filter((user) => {
                return !(toDeleteId === user.id)
            })
            setSelectAllUser([])
            mutate(
                {
                    list: newUserList,
                    total: userListTotal - 1,
                },
                false,
            )
            
            toast.push(
                <Notification type="success">کاربر با موفقیت حذف شد!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">خطا در حذف کاربر!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsDeleting(false)
            setDeleteConfirmationOpen(false)
            setToDeleteId('')
        }
    }

    const {
        userList,
        userListTotal,
        tableData,
        isLoading,
        error,
        setTableData,
        setSelectAllUser,
        setSelectedUser,
        selectedUser,
        mutate,
    } = useUserList()

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'کاربر',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <UserColumn row={row} />
                },
            },
            {
                header: 'ایمیل',
                accessorKey: 'email',
                cell: (props) => {
                    const { email } = props.row.original
                    return (
                        <span className="font-mono text-sm text-gray-600">
                            {email}
                        </span>
                    )
                },
            },
            {
                header: 'نقش',
                accessorKey: 'role',
                cell: (props) => {
                    const { role } = props.row.original
                    return (
                        <span className="font-mono text-sm text-gray-600">
                            {role}
                        </span>
                    )
                },
            },
            {
                header: 'تاریخ ایجاد',
                accessorKey: 'created_at',
                cell: (props) => {
                    const { created_at } = props.row.original
                    const date = new Date(created_at)
                    return (
                        <span className="text-sm">
                            {date.toLocaleDateString('fa-IR')}
                        </span>
                    )
                },
            },
            {
                header: 'آخرین بروزرسانی',
                accessorKey: 'updated_at',
                cell: (props) => {
                    const { updated_at } = props.row.original
                    const date = new Date(updated_at)
                    return (
                        <span className="text-sm">
                            {date.toLocaleDateString('fa-IR')}
                        </span>
                    )
                },
            },
              
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onDelete={() => handleDelete(props.row.original)}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedUser.length > 0) {
            setSelectAllUser([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: User) => {
        setSelectedUser(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<User>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllUser(originalRows)
        } else {
            setSelectAllUser([])
        }
    }

    return (
        <>
            {/* Network Status Indicator */}
            {!networkStatus && (
                <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-2 rounded mb-4 flex items-center gap-2">
                    <TbWifiOff className="text-lg" />
                    <span>اتصال اینترنت برقرار نیست</span>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>خطا در بارگذاری داده‌ها:</strong>
                    <p>{getErrorMessage(error)}</p>
                    
                    {error.message?.includes('timeout') && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-yellow-800 font-medium">⏱️ راهنمایی برای حل مشکل timeout:</p>
                            <ul className="text-sm mt-2 text-yellow-700 list-disc list-inside">
                                <li>سرور ممکن است کند باشد - سیستم خودکار تلاش مجدد می‌کند</li>
                                <li>اتصال اینترنت خود را بررسی کنید</li>
                                <li>از VPN استفاده می‌کنید؟ آن را خاموش کنید</li>
                                <li>چند دقیقه صبر کنید و مجدداً تلاش کنید</li>
                            </ul>
                        </div>
                    )}
                    
                    {!networkStatus && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                            <p className="text-red-800 font-medium">🌐 مشکل اتصال اینترنت:</p>
                            <p className="text-sm mt-2 text-red-700">لطفاً اتصال اینترنت خود را بررسی کنید</p>
                        </div>
                    )}
                    
                    <div className="mt-3 flex gap-2">
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            🔄 تلاش مجدد
                        </button>
                        
                        {error.response?.status === 401 && (
                            <button 
                                onClick={() => window.location.href = '/auth/sign-in'} 
                                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                            >
                                🔐 ورود مجدد
                            </button>
                        )}
                    </div>
                </div>
            )}
            <DataTable
                selectable
                columns={columns}
                data={userList}
                noData={!isLoading && userList.length === 0 && !error}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: userListTotal,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                checkboxChecked={(row) =>
                    selectedUser.some((selected) => selected.id === row.id)
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="حذف کاربر"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
                confirmButtonProps={{
                    loading: isDeleting,
                    disabled: isDeleting
                }}
            >
                <p>
                    {' '}
                    آیا مطمئن هستید که می خواهید این کاربر را حذف کنید؟ این
                    اقدام قابل بازگشت نیست.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserListTable