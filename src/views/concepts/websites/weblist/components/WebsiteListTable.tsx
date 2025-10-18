import { useState, useMemo, useEffect } from 'react'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Swal from 'sweetalert2'
import {
    TbPencil,
    TbTrash,
    TbRefresh,
    TbExternalLink,
    TbCheck,
    TbX,
    TbClock,
    TbQuestionMark,
    TbWorld,
    TbCalendar,
    TbPackage,
    TbCircleCheck,
    TbCircleX,
} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { apiGetWebsitesList } from '@/services/WebsiteService'
import useWebsiteList from '../store/websiteListStore'
import type { Website } from '../types'
import type { ColumnDef } from '@/components/shared/DataTable'



const WebsiteColumn = ({ row }: { row: Website }) => {
    return (
        <div className="flex items-center gap-3 py-2">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <TbWorld className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate mb-1">
                    {row.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <TbExternalLink className="w-3 h-3" />
                    <span className="truncate max-w-[200px]">{row.url}</span>
                </div>
            </div>
        </div>
    )
}

const getCrawlerStatusBadge = (status: Website['crawlerStatus']) => {
    const statusConfig = {
        success: {
            color: 'text-emerald-600 dark:text-emerald-400',
            icon: <TbCheck className="w-4 h-4" />,
            label: 'موفق'
        },
        error: {
            color: 'text-red-600 dark:text-red-400',
            icon: <TbX className="w-4 h-4" />,
            label: 'خطا'
        },
        pending: {
            color: 'text-amber-600 dark:text-amber-400',
            icon: <TbClock className="w-4 h-4" />,
            label: 'در صف'
        },
        unknown: {
            color: 'text-gray-600 dark:text-gray-400',
            icon: <TbQuestionMark className="w-4 h-4" />,
            label: 'نامشخص'
        }
    }

    const config = statusConfig[status] || statusConfig.unknown
    return (
        <div className={`flex items-center gap-2 ${config.color}`}>
            {config.icon}
            <span className="font-medium text-sm">{config.label}</span>
        </div>
    )
}

const ActionColumn = ({
    row,
    onEdit,
    onDelete,
    onCrawl,
    isCrawling,
}: {
    row: Website
    onEdit: () => void
    onDelete: () => void
    onCrawl: () => void
    isCrawling: boolean
}) => {

    const handleOpenWebsite = () => {
        window.open(row.url, '_blank')
    }

    const handleCrawlWithConfirm = async () => {
        const result = await Swal.fire({
            title: 'درخواست کرال',
            text: `آیا از درخواست کرال برای سایت "${row.name}" اطمینان دارید؟`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'بله، کرال کن',
            cancelButtonText: 'انصراف',
            reverseButtons: true
        })

        if (result.isConfirmed) {
            onCrawl()
            
            Swal.fire({
                title: 'موفق!',
                text: 'درخواست کرال با موفقیت ارسال شد.',
                icon: 'success',
                confirmButtonColor: '#10b981',
                confirmButtonText: 'باشه'
            })
        }
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                size="sm"
                variant="solid"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs"
                onClick={handleOpenWebsite}
            >
                باز کردن
            </Button>
            <Tooltip title={isCrawling ? "در حال انجام..." : "درخواست کرال"}>
                <Button
                    size="sm"
                    variant="plain"
                    icon={<TbRefresh className={`w-4 h-4 ${isCrawling ? 'animate-spin' : ''}`} />}
                    onClick={handleCrawlWithConfirm}
                    disabled={isCrawling || !row.isActive}
                    className={`p-1.5 ${isCrawling ? 'text-blue-500' : ''}`}
                />
            </Tooltip>
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

const WebsiteListTable = () => {
    const navigate = useNavigate()
    const [crawlingWebsites, setCrawlingWebsites] = useState<Set<number>>(new Set())
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)

    const {
        websiteList,
        websiteListTotal,
        tableData,
        // removed duplicate selectedWebsite from store to avoid name clash
        isLoading,
        error,
        setWebsiteList,
        setLoading,
        setWebsiteListTotal,
        setTableData,
        // removed unused alias setSelectedWebsite: setSelectedWebsiteStore
    } = useWebsiteList()

    // Client-side filtering for search
    const filteredWebsiteList = useMemo(() => {
        if (!tableData.query || tableData.query.trim() === '') {
            return websiteList
        }
        
        const searchTerm = tableData.query.toLowerCase().trim()
        return websiteList.filter(website => 
            website.name.toLowerCase().includes(searchTerm) ||
            website.url.toLowerCase().includes(searchTerm)
        )
    }, [websiteList, tableData.query])

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                setLoading(true)
                const response = await apiGetWebsitesList({
                    // Remove query from API call since backend doesn't support it
                    status: tableData.status,
                    crawlerStatus: tableData.crawlerStatus,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                })
                setWebsiteList(response.list || [])
                setWebsiteListTotal(response.total || 0)
            } catch (error) {
                console.error('Error fetching websites:', error)
                setWebsiteList([])
                setWebsiteListTotal(0)
            } finally {
                setLoading(false)
            }
        }

        fetchWebsites()
    }, [tableData.status, tableData.crawlerStatus, tableData.pageIndex, tableData.pageSize, setWebsiteList, setWebsiteListTotal, setLoading])

    const columns: ColumnDef<Website>[] = useMemo(
        () => [
            {
                header: 'اطلاعات وب‌سایت',
                accessorKey: 'name',
                enableSorting: true,
                cell: (props) => {
                    const row = props.row.original
                    return <WebsiteColumn row={row} />
                },
            },
            {
                header: 'وضعیت',
                accessorKey: 'isActive',
                enableSorting: true,
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.isActive ? (
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                    <TbCircleCheck className="w-5 h-5" />
                                    <span className="font-medium text-sm">فعال</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <TbCircleX className="w-5 h-5" />
                                    <span className="font-medium text-sm">غیرفعال</span>
                                </div>
                            )}
                        </div>
                    )
                },
            },
            {
                header: 'آخرین کرال',
                accessorKey: 'lastCrawlDate',
                enableSorting: true,
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2 text-sm">
                            <TbCalendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                                {row.lastCrawlDate || 'نامشخص'}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'وضعیت کرالر',
                accessorKey: 'crawlerStatus',
                enableSorting: true,
                cell: (props) => {
                    const row = props.row.original
                    return getCrawlerStatusBadge(row.crawlerStatus)
                },
            },
            {
                header: 'تعداد محصولات',
                accessorKey: 'productCount',
                enableSorting: true,
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2 text-sm">
                            <TbPackage className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">
                                {row.productCount.toLocaleString('fa-IR')} محصول
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'عملیات',
                id: 'action',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original
                    const isCrawling = crawlingWebsites.has(row.id)
                    return (
                        <ActionColumn
                            row={row}
                            onEdit={() => handleEdit(row)}
                            onDelete={() => handleDelete(row)}
                            onCrawl={() => handleCrawl(row)}
                            isCrawling={isCrawling}
                        />
                    )
                },
            },
        ],
        [crawlingWebsites],
    )

    const handleEdit = (website: Website) => {
        navigate(`/websites/${website.id}/edit`)
    }

    const handleDelete = (website: Website) => {
        setSelectedWebsite(website)
        setConfirmDialogOpen(true)
    }

    const handleConfirmDelete = () => {
        if (selectedWebsite) {
            console.log('Deleting website:', selectedWebsite.id)
            // TODO: Call API to delete website
        }
        setConfirmDialogOpen(false)
        setSelectedWebsite(null)
    }

    const handleCrawl = (website: Website) => {
        setCrawlingWebsites(prev => new Set(prev).add(website.id))
        
        // Simulate crawling process
        setTimeout(() => {
            setCrawlingWebsites(prev => {
                const newSet = new Set(prev)
                newSet.delete(website.id)
                return newSet
            })
        }, 3000)
        
        console.log('Start crawling:', website.id)
    }

    const onPaginationChange = (page: number) => {
        setTableData((prevData) => ({
            ...prevData,
            pageIndex: page,
        }))
    }

    const onSelectChange = (value: number) => {
        setTableData((prevData) => ({
            ...prevData,
            pageSize: value,
            pageIndex: 1,
        }))
    }

    return (
        <>
            <DataTable<Website>
                columns={columns}
                data={filteredWebsiteList}
                loading={isLoading}
                pagingData={{
                    total: filteredWebsiteList.length,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                selectable
                enableSorting
            />
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                type="danger"
                title="حذف وب‌سایت"
                confirmButtonColor="red-600"
                onClose={() => setConfirmDialogOpen(false)}
                onRequestClose={() => setConfirmDialogOpen(false)}
                onCancel={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    آیا مطمئن هستید که می‌خواهید وب‌سایت{' '}
                    <strong>{selectedWebsite?.name}</strong> را حذف کنید؟ این عمل
                    قابل بازگشت نیست.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default WebsiteListTable