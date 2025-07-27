import { useMemo, useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useProductList from '../hooks/useProductList'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { TbPencil, TbTrash, TbWifiOff } from 'react-icons/tb'
import { FiPackage } from 'react-icons/fi'
import { isOnline, getErrorMessage, addNetworkStatusListener } from '@/utils/networkUtils'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Product } from '../types'
import type { TableQueries } from '@/@types/common'

const ProductColumn = ({ row }: { row: Product }) => {
   
    return (
        <div className="flex items-center gap-2">
            <Avatar
                shape="round"
                size={60}
                {...(row.image ? { src: row.image } : { icon: <FiPackage /> })}
            />
            <div>
                <div className="font-bold heading-text mb-1">{row.title}</div>
                <span>شناسه: {row.slug}</span>
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
        <div className="flex items-center justify-end gap-3">
            <Tooltip title="ویرایش">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="حذف">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    )
}

const ProductListTable = () => {
    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('')
    const [networkStatus, setNetworkStatus] = useState(isOnline())

    // Network status monitoring
    useEffect(() => {
        const cleanup = addNetworkStatusListener(setNetworkStatus)
        return cleanup
    }, [])

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (product: Product) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId(product.id)
    }

    const handleEdit = (product: Product) => {
        navigate(`/concepts/products/product-edit/${product.id}`)
    }

    const handleConfirmDelete = () => {
        const newProductList = productList.filter((product) => {
            return !(toDeleteId === product.id)
        })
        setSelectAllProduct([])
        mutate(
            {
                list: newProductList,
                total: productListTotal - selectedProduct.length,
            },
            false,
        )
        setDeleteConfirmationOpen(false)
        setToDeleteId('')
    }

    const {
        productList,
        productListTotal,
        tableData,
        isLoading,
        error,
        setTableData,
        setSelectAllProduct,
        setSelectedProduct,
        selectedProduct,
        mutate,
    } = useProductList()

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: 'محصول',
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'شناسه',
                accessorKey: 'slug',
                cell: (props) => {
                    const { slug } = props.row.original
                    return (
                        <span className="font-mono text-sm text-gray-600">
                            {slug}
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
        if (selectedProduct.length > 0) {
            setSelectAllProduct([])
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

    const handleRowSelect = (checked: boolean, row: Product) => {
        setSelectedProduct(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Product>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllProduct(originalRows)
        } else {
            setSelectAllProduct([])
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
                data={productList}
                noData={!isLoading && productList.length === 0 && !error}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: productListTotal,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                checkboxChecked={(row) =>
                    selectedProduct.some((selected) => selected.id === row.id)
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
                title="حذف محصولات"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    آیا مطمئن هستید که می خواهید این محصول را حذف کنید؟ این
                    اقدام قابل بازگشت نیست.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}


export default ProductListTable
