import { apiGetUserList } from '@/services/UserService'
import useSWR from 'swr'
import { useUserListStore } from '../store/userListStore'
import type { GetUserListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

const useUserList = () => {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedUser,
        setSelectedUser,
        setSelectAllUser,
    } = useUserListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/users/all', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => {
            return apiGetUserList<GetUserListResponse, TableQueries>(params)
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

    const userList = data?.list || []

    const userListTotal = data?.total || 0

    return {
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        userList,
        userListTotal,
        setTableData,
        selectedUser,
        setSelectedUser,
        setSelectAllUser,
        setFilterData,
    }
}

export default useUserList