import { apiGetSellerList } from '@/services/SellerService'
import useSWR from 'swr'
import { useSellerListStore } from '../store/sellerListStore'
import type { GetSellerListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

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
        ['/api/sellers/all', { ...tableData, ...filterData }],
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

    const sellerList = data?.list || []
    const sellerListTotal = data?.total || 0

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