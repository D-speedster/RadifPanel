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
        ['/api/users/all', tableData, filterData],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, tableParams, filterParams]) => {
            // Combine table data and filter data properly
            const params: Record<string, any> = {
                // Search query
                search: tableParams.query || '',
                // Status filter
                status: filterParams.userStatus || '',
                // Pagination
                page: tableParams.pageIndex || 1,
                limit: tableParams.pageSize || 10,
                // Sorting
                sort: tableParams.sort || '',
            }

            // Do NOT send role when multiple roles selected; rely on client-side filter
            if (Array.isArray(filterParams.userRole) && filterParams.userRole.length === 1) {
                params.role = filterParams.userRole[0]
            }
            
            // Remove empty values
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null || params[key] === undefined) {
                    delete params[key]
                }
            })
            
            return apiGetUserList<GetUserListResponse, TableQueries>(params as any)
        },
        {
            revalidateOnFocus: false,
            errorRetryCount: 3,
            errorRetryInterval: 2000,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Don't retry on 404 or 401
                if ((error as any).status === 404 || (error as any).status === 401) return
                // Retry after delay
                setTimeout(() => revalidate({ retryCount }), 2000)
            }
        },
    )

    const rawUserList = data?.list || []

    // Client-side filtering as fallback
    const filteredUserList = rawUserList.filter((user) => {
        // Search filter
        const searchQuery = tableData.query?.toLowerCase() || ''
        const matchesSearch = !searchQuery || 
            user.name?.toLowerCase().includes(searchQuery) ||
            user.email?.toLowerCase().includes(searchQuery) ||
            user.role?.toLowerCase().includes(searchQuery)

        // Role filter
        const selectedRoles = filterData.userRole || []
        const matchesRole = selectedRoles.length === 0 || 
            selectedRoles.some(role => 
                user.role?.toLowerCase() === role.toLowerCase()
            )

        // Status filter (if needed)
        const selectedStatus = filterData.userStatus
        const matchesStatus = !selectedStatus || selectedStatus === 'active' || 
            user.status?.toString().toLowerCase() === selectedStatus.toLowerCase()

        return matchesSearch && matchesRole && matchesStatus
    })

    const userList = filteredUserList
    const userListTotal = filteredUserList.length

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