import { apiGetSellerList } from '@/services/SellerService'
import useSWR from 'swr'
import { useSellerListStore } from '../store/sellerListStore'
import type { GetSellerListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import type { Seller } from '../types'

const useSellerList = () => {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedSeller,
        setSelectedSeller,
        setSelectAllSeller,
    } = useSellerListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        () => window.location.pathname.includes('/sellers') ? ['/api/sellers/all', { ...tableData, ...filterData }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => {
            return apiGetSellerList<GetSellerListResponse, TableQueries>(params)
        },
        {
            revalidateOnFocus: false,
            errorRetryCount: 3,
            errorRetryInterval: 2000,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Don't retry on 404 or 401
                if (error.status === 404 || error.status === 401) return
                // Retry after delay
                setTimeout(() => revalidate({ retryCount }), 2000)
            }
        },
    )

    // Client-side filtering fallback to ensure search & filter always work
    const baseList: Seller[] = Array.isArray((data as any)?.list)
        ? ((data as any).list as Seller[])
        : (Array.isArray((data as any)?.sellers) ? ((data as any).sellers as Seller[]) : [])

    let filtered: Seller[] = baseList

    const query = (tableData.query as string || '').toLowerCase().trim()
    if (query) {
        filtered = filtered.filter((s) => {
            const name = (s.name || '').toLowerCase()
            const email = (s.email || '').toLowerCase()
            const phone = (s.phone || '').toLowerCase()
            const role = (s.role || '').toLowerCase()
            return (
                name.includes(query) ||
                email.includes(query) ||
                phone.includes(query) ||
                role.includes(query)
            )
        })
    }

    if (filterData.sellerStatus) {
        filtered = filtered.filter((s) => s.status === filterData.sellerStatus)
    }

    if (Array.isArray(filterData.sellerRole) && filterData.sellerRole.length > 0) {
        const rolesLower = filterData.sellerRole.map((r) => r.toLowerCase())
        filtered = filtered.filter((s) => rolesLower.includes((s.role || '').toLowerCase()))
    }

    // Sorting
    if (tableData.sort && tableData.sort.key) {
        const { key, order } = tableData.sort
        filtered = [...filtered].sort((a: any, b: any) => {
            const av = a[key]
            const bv = b[key]
            if (av == null && bv == null) return 0
            if (av == null) return order === 'asc' ? -1 : 1
            if (bv == null) return order === 'asc' ? 1 : -1
            if (typeof av === 'string' && typeof bv === 'string') {
                return order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
            }
            return order === 'asc' ? (av > bv ? 1 : av < bv ? -1 : 0) : (bv > av ? 1 : bv < av ? -1 : 0)
        })
    }

    // Pagination
    const pageIndex = (tableData.pageIndex as number) || 1
    const pageSize = (tableData.pageSize as number) || 10
    const start = (pageIndex - 1) * pageSize
    const end = start + pageSize
    const paged = filtered.slice(start, end)

    const sellerList = paged
    const sellerListTotal = filtered.length

    return {
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        sellerList,
        sellerListTotal,
        setTableData,
        selectedSeller,
        setSelectedSeller,
        setSelectAllSeller,
        setFilterData,
    }
}

export default useSellerList