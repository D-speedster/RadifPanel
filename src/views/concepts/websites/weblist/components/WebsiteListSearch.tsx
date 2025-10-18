import { useState, useRef, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import useWebsiteList from '../store/websiteListStore'

type WebsiteListSearchProps = {
    onInputChange?: (value: string) => void
}

const WebsiteListSearch = ({ onInputChange }: WebsiteListSearchProps) => {
    const [value, setValue] = useState('')
    const { setTableData } = useWebsiteList()

    const debouncedSearch = useRef(
        debounce((searchValue: string) => {
            setTableData((prevData) => ({
                ...prevData,
                query: searchValue,
            }))
            onInputChange?.(searchValue)
        }, 500)
    ).current

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    const handleInputChange = (val: string) => {
        setValue(val)
        debouncedSearch(val)
    }

    return (
        <Input
            ref={null}
            className="max-w-md"
            size="sm"
            placeholder="جستجو وب‌سایت..."
            prefix={<HiOutlineSearch className="text-lg" />}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
        />
    )
}

export default WebsiteListSearch