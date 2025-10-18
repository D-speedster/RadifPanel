import ProductListSearch from './ProductListSearch'
import ProductTableFilter from './ProductTableFilter'
import useProducList from '../hooks/useProductList'
import cloneDeep from 'lodash/cloneDeep'

const ProducListTableTools = () => {
    const { tableData, setTableData } = useProducList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        setTableData(newTableData)
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <ProductListSearch onInputChange={handleInputChange} />
            <ProductTableFilter />
        </div>
    )
}

export default ProducListTableTools
