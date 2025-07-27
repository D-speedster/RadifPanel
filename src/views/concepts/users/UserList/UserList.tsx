import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import UserListActionTools from './components/UserListActionTools'
import UserListTableTools from './components/UserListTableTools'
import UserListTable from './components/UserListTable'
import UserListSelected from './components/UserListSelected'

const UserList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>کاربران</h3>
                            <UserListActionTools />
                        </div>
                        <UserListTableTools />
                        <UserListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <UserListSelected />
        </>
    )
}

export default UserList