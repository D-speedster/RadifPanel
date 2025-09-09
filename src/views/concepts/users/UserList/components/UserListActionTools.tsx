import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useUserList from '../hooks/useUserList'
import { CSVLink } from 'react-csv'

const UserListActionTools = () => {
    const navigate = useNavigate()

    const { userList } = useUserList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink filename="user-list.csv" data={userList}>
                <Button icon={<TbCloudDownload className="text-xl" />}>
                    صادر کردن
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => navigate('/users/newUser')}
            >
                اضافه کردن کاربر
            </Button>
        </div>
    )
}

export default UserListActionTools