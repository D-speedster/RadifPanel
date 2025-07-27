import SellerListSearch from './SellerListSearch'
import SellerTableFilter from './SellerTableFilter'
import useSellerList from '../hooks/useSellerList'
import cloneDeep from 'lodash/cloneDeep'

const SellerListTableTools = () => {
    const { tableData, setTableData } = useSellerList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <SellerListSearch onInputChange={handleInputChange} />
            <SellerTableFilter />
        </div>
    )
}

export default SellerListTableTools