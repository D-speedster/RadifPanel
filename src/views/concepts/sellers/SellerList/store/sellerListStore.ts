import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Seller, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    sellerStatus: 'active',
    sellerRole: ['admin', 'seller', 'moderator'],
}

export type SellersListState = {
    tableData: TableQueries
    filterData: Filter
    selectedSeller: Partial<Seller>[]
}

type SellersListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedSeller: (checked: boolean, seller: Seller) => void
    setSelectAllSeller: (seller: Seller[]) => void
}

const initialState: SellersListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedSeller: [],
}

export const useSellerListStore = create<
    SellersListState & SellersListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedSeller: (checked, row) =>
        set((state) => {
            const prevData = state.selectedSeller
            if (checked) {
                return { selectedSeller: [...prevData, ...[row]] }
            } else {
                const filteredData = prevData.filter(
                    (item) => item.id !== row.id,
                )
                return { selectedSeller: filteredData }
            }
        }),
    setSelectAllSeller: (seller) =>
        set(() => ({
            selectedSeller: seller,
        })),
}))