import { useMemo, useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import useSellerList from '../hooks/useSellerList'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { TbPencil, TbTrash, TbWifiOff, TbPhone, TbPackage, TbDotsVertical } from 'react-icons/tb'
import { FiUser, FiMail } from 'react-icons/fi'
import { isOnline, getErrorMessage, addNetworkStatusListener } from '@/utils/networkUtils'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Seller } from '../types'
import type { TableQueries } from '@/@types/common'

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/20 dark:text-emerald-400'
        case 'inactive':
            return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
        case 'pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'active':
            return 'فعال'
        case 'inactive':
            return 'غیرفعال'
        case 'pending':
            return 'در انتظار'
        default:
            return 'نامشخص'
    }
}

const SellerColumn = ({ row }: { row: Seller }) => {
    return (
        <div className="flex items-center gap-3 py-2">
            <Avatar
                shape="round"
                size={50}
                {...(row.avatar ? { src: row.avatar } : { icon: <FiUser /> })}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {row.name}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                        {getStatusText(row.status)}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <FiMail className="w-3 h-3" />
                        <span className="truncate">{row.email}</span>
                    </div>
                    {row.phone && (
                        <div className="flex items-center gap-1">
                            <TbPhone className="w-3 h-3" />
                            <span>{row.phone}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const ActionColumn = ({
    onViewProfile,
    onEdit,
    onDelete,
}: {
    onViewProfile: () => void
    onEdit: () => void
    onDelete: () => void
}) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                size="sm"
                variant="solid"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs"
                onClick={onViewProfile}
            >
                مشاهده پروفایل
            </Button>
            <div className="relative">
                <Tooltip title="عملیات بیشتر">
                    <button
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <TbDotsVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                </Tooltip>
                {showMenu && (
                    <div className="absolute left-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                        <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            onClick={() => {
                                onEdit()
                                setShowMenu(false)
                            }}
                        >
                            <TbPencil className="w-4 h-4" />
                            ویرایش
                        </button>
                        <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600"
                            onClick={() => {
                                onDelete()
                                setShowMenu(false)
                            }}
                        >
                            <TbTrash className="w-4 h-4" />
                            حذف
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const SellerListTable = () => {
    const navigate = useNavigate()
    const [isOnlineStatus, setIsOnlineStatus] = useState(isOnline())
    const [networkError, setNetworkError] = useState('')
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null)

    const {
        sellerList,
        sellerListTotal,
        tableData,
        setTableData,
        setSelectedSeller: setSelectedSellerStore,
        isLoading,
        error,
        mutate,
    } = useSellerList()

    useEffect(() => {
        const removeListener = addNetworkStatusListener((online) => {
            setIsOnlineStatus(online)
            if (!online) {
                setNetworkError('اتصال اینترنت قطع شده است')
            } else {
                setNetworkError('')
                // Retry fetching data when back online
                mutate()
            }
        })

        return removeListener
    }, [mutate])

    useEffect(() => {
        if (error && !networkError) {
            setNetworkError(getErrorMessage(error))
        }
    }, [error, networkError])

    const columns: ColumnDef<Seller>[] = useMemo(
        () => [
            {
                header: 'اطلاعات فروشنده',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <SellerColumn row={row} />
                },
            },
            {
                header: 'تعداد محصولات',
                accessorKey: 'product_count',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2 text-sm">
                            <TbPackage className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">
                                {row.product_count || 0} محصول
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'تاریخ ثبت',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(row.created_at).toLocaleDateString('fa-IR')}
                        </div>
                    )
                },
            },
            {
                header: 'عملیات',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <ActionColumn
                            onViewProfile={() => handleViewProfile(row)}
                            onEdit={() => handleEdit(row)}
                            onDelete={() => handleDelete(row)}
                        />
                    )
                },
            },
        ],
        [],
    )

    const handleViewProfile = (seller: Seller) => {
        navigate(`/sellers/details/${seller.id}`)
    }

    const handleEdit = (seller: Seller) => {
        navigate(`/sellers/edit/${seller.id}`)
    }

    const handleDelete = (seller: Seller) => {
        setSelectedSeller(seller)
        setConfirmDialogOpen(true)
    }

    const handleConfirmDelete = () => {
        if (selectedSeller) {
            // Here you would typically call an API to delete the seller
            console.log('Deleting seller:', selectedSeller.id)
            // After successful deletion, you might want to refresh the data
            mutate()
        }
        setConfirmDialogOpen(false)
        setSelectedSeller(null)
    }

    const handlePaginationChange = (pageIndex: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = pageIndex
        setTableData(newTableData)
    }

    const handleSelectChange = (checked: boolean, row: Seller) => {
        setSelectedSellerStore(checked, row)
    }

    const handleSelectAllChange = (checked: boolean, rows: Row<Seller>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectedSellerStore(true, originalRows[0])
        } else {
            setSelectedSellerStore(false, rows[0]?.original)
        }
    }

    const handleSort = ({ order, key }: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = { order, key }
        setTableData(newTableData)
    }

    if (!isOnlineStatus) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <TbWifiOff className="text-6xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    اتصال اینترنت قطع شده
                </h3>
                <p className="text-gray-500 text-center">
                    لطفاً اتصال اینترنت خود را بررسی کنید
                </p>
            </div>
        )
    }

    if (networkError && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl text-red-400 mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    خطا در بارگذاری داده‌ها
                </h3>
                <p className="text-gray-500 text-center mb-4">{networkError}</p>
                <button
                    onClick={() => mutate()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    تلاش مجدد
                </button>
            </div>
        )
    }

    return (
        <>
            <DataTable<Seller>
                columns={columns}
                data={sellerList}
                loading={isLoading}
                pagingData={{
                    total: sellerListTotal,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={handlePaginationChange}
                onCheckBoxChange={handleSelectChange}
                onIndeterminateCheckBoxChange={handleSelectAllChange}
                onSort={handleSort}
                selectable
            />
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                type="danger"
                title="حذف فروشنده"
                confirmButtonColor="red-600"
                onClose={() => setConfirmDialogOpen(false)}
                onRequestClose={() => setConfirmDialogOpen(false)}
                onCancel={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    آیا مطمئن هستید که می‌خواهید فروشنده{' '}
                    <strong>{selectedSeller?.name}</strong> را حذف کنید؟ این عمل
                    قابل بازگشت نیست.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default SellerListTable