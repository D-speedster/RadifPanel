import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import SellerListActionTools from './components/SellerListActionTools'
import SellerListTableTools from './components/SellerListTableTools'
import SellerListTable from './components/SellerListTable'
import SellerListSelected from './components/SellerListSelected'

const SellerList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>فروشندگان</h3>
                            <SellerListActionTools />
                        </div>
                        <SellerListTableTools />
                        <SellerListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <SellerListSelected />
        </>
    )
}

export default SellerList