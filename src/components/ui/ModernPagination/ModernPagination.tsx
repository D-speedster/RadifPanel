import { useMemo } from 'react'
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import classNames from 'classnames'

export interface ModernPaginationProps {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
    className?: string
    showPageSizeSelector?: boolean
    showTotalInfo?: boolean
    pageSizeOptions?: number[]
}

const ModernPagination = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    className,
    showPageSizeSelector = true,
    showTotalInfo = true,
    pageSizeOptions = [10, 20, 50, 100]
}: ModernPaginationProps) => {
    
    const pageSizeSelectOptions = useMemo(() => 
        pageSizeOptions.map(size => ({ value: size, label: `${size} آیتم` }))
    , [pageSizeOptions])

    const currentPageSizeOption = useMemo(() => 
        pageSizeSelectOptions.find(option => option.value === pageSize)
    , [pageSizeSelectOptions, pageSize])

    const getVisiblePages = useMemo(() => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta); 
             i <= Math.min(totalPages - 1, currentPage + delta); 
             i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...')
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages)
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }, [currentPage, totalPages])

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page)
        }
    }

    const handlePageSizeChange = (option: any) => {
        if (option?.value && option.value !== pageSize) {
            onPageSizeChange(option.value)
        }
    }

    if (totalPages <= 1 && !showTotalInfo && !showPageSizeSelector) {
        return null
    }

    return (
        <div className={classNames(
            'flex items-center justify-between gap-4 py-4 px-2',
            'border-t border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800',
            className
        )}>
            {/* Total Info */}
            {showTotalInfo && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>
                        نمایش {startItem.toLocaleString('fa-IR')} تا {endItem.toLocaleString('fa-IR')} از {totalItems.toLocaleString('fa-IR')} آیتم
                    </span>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center gap-1">
                    {/* First Page */}
                    <Button
                        size="sm"
                        variant="plain"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                        className="w-8 h-8 p-0 flex items-center justify-center disabled:opacity-50"
                        title="صفحه اول"
                    >
                        <TbChevronsRight className="w-4 h-4" />
                    </Button>

                    {/* Previous Page */}
                    <Button
                        size="sm"
                        variant="plain"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="w-8 h-8 p-0 flex items-center justify-center disabled:opacity-50"
                        title="صفحه قبل"
                    >
                        <TbChevronRight className="w-4 h-4" />
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 mx-2">
                        {getVisiblePages.map((page, index) => (
                            page === '...' ? (
                                <span key={`dots-${index}`} className="px-2 text-gray-400">
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={page}
                                    size="sm"
                                    variant={currentPage === page ? "solid" : "plain"}
                                    onClick={() => handlePageChange(page as number)}
                                    className={classNames(
                                        "w-8 h-8 p-0 flex items-center justify-center text-sm font-medium",
                                        currentPage === page 
                                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    )}
                                >
                                    {(page as number).toLocaleString('fa-IR')}
                                </Button>
                            )
                        ))}
                    </div>

                    {/* Next Page */}
                    <Button
                        size="sm"
                        variant="plain"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-8 h-8 p-0 flex items-center justify-center disabled:opacity-50"
                        title="صفحه بعد"
                    >
                        <TbChevronLeft className="w-4 h-4" />
                    </Button>

                    {/* Last Page */}
                    <Button
                        size="sm"
                        variant="plain"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className="w-8 h-8 p-0 flex items-center justify-center disabled:opacity-50"
                        title="صفحه آخر"
                    >
                        <TbChevronsLeft className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Page Size Selector */}
            {showPageSizeSelector && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        تعداد در صفحه:
                    </span>
                    <div className="min-w-[100px]">
                        <Select
                            size="sm"
                            isSearchable={false}
                            value={currentPageSizeOption}
                            options={pageSizeSelectOptions}
                            onChange={handlePageSizeChange}
                            className="modern-pagination-select"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModernPagination