import { forwardRef } from 'react'
import Input from '@/components/ui/Input'
import { TbSearch } from 'react-icons/tb'
import useDebounce from '@/utils/hooks/useDebounce'
import type { ChangeEvent } from 'react'

type UserListSearchProps = {
    onInputChange: (value: string) => void
}

const UserListSearch = forwardRef<HTMLInputElement, UserListSearchProps>(
    (props, ref) => {
        const { onInputChange } = props

        function handleDebounceFn(value: string) {
            onInputChange?.(value)
        }

        const debounceFn = useDebounce(handleDebounceFn, 500)

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            debounceFn(e.target.value)
        }

        return (
            <Input
                ref={ref}
                placeholder="جستجو کاربران"
                suffix={<TbSearch className="text-lg" />}
                onChange={handleInputChange}
            />
        )
    },
)

UserListSearch.displayName = 'UserListSearch'

export default UserListSearch