import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import WebsiteListActionTools from './components/WebsiteListActionTools'
import WebsiteListTableTools from './components/WebsiteListTableTools'
import WebsiteListTable from './components/WebsiteListTable'
import WebsiteListSelected from './components/WebsiteListSelected'

const WebsiteList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>وب‌سایت‌ها</h3>
                            <WebsiteListActionTools />
                        </div>
                        <WebsiteListTableTools />
                        <WebsiteListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <WebsiteListSelected />
        </>
    )
}

export default WebsiteList