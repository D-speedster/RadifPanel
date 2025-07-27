import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useSellerList from '../hooks/useSellerList'
import { CSVLink } from 'react-csv'

const SellerListActionTools = () => {
    const navigate = useNavigate()

    const { sellerList } = useSellerList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink filename="seller-list.csv" data={sellerList}>
                <Button icon={<TbCloudDownload className="text-xl" />}>
                    صادر کردن
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => navigate('/concepts/sellers/seller-create')}
            >
                اضافه کردن فروشنده
            </Button>
        </div>
    )
}

export default SellerListActionTools