import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import WebsiteListActionTools from './components/WebsiteListActionTools'
import WebsiteListTableTools from './components/WebsiteListTableTools'
import WebsiteListTable from './components/WebsiteListTable'
import WebsiteListSelected from './components/WebsiteListSelected'

const WebsiteList = () => {
    return (
        <Container className="h-full">
            <div className="flex flex-col gap-4 h-full">
                <WebsiteListActionTools />
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <WebsiteListTableTools />
                        <WebsiteListTable />
                        <WebsiteListSelected />
                    </div>
                </AdaptiveCard>
            </div>
        </Container>
    )
}

export default WebsiteList