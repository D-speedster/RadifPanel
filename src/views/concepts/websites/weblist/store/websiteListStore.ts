import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { TableQueries } from '@/@types/common'
import type { Website } from '../types'

export type WebsiteListState = {
    websiteList: Website[]
    websiteListTotal: number
    tableData: TableQueries & {
        query?: string
        status?: string
        crawlerStatus?: string[]
    }
    selectedWebsite: Website[]
    isLoading: boolean
    error: string | null
}

export type WebsiteListAction = {
    setWebsiteList: (websiteList: Website[]) => void
    setWebsiteListTotal: (total: number) => void
    setTableData: (data: Partial<WebsiteListState['tableData']> | ((prev: WebsiteListState['tableData']) => WebsiteListState['tableData'])) => void
    setSelectedWebsite: (selectedWebsite: Website[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
}

const initialTableData: WebsiteListState['tableData'] = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    status: '',
    crawlerStatus: [],
}

const initialState: WebsiteListState = {
    websiteList: [],
    websiteListTotal: 0,
    tableData: initialTableData,
    selectedWebsite: [],
    isLoading: false,
    error: null,
}

const useWebsiteList = create<WebsiteListState & WebsiteListAction>()(
    subscribeWithSelector((set) => ({
        ...initialState,
        setWebsiteList: (websiteList) => set({ websiteList }),
        setWebsiteListTotal: (websiteListTotal) => set({ websiteListTotal }),
        setTableData: (data) =>
            set((state) => ({
                tableData: typeof data === 'function' ? data(state.tableData) : { ...state.tableData, ...data },
            })),
        setSelectedWebsite: (selectedWebsite) => set({ selectedWebsite }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
    }))
)

export default useWebsiteList