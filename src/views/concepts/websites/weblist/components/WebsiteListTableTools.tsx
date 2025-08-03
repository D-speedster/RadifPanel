import { useState, useRef } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi'
import type { WebsiteFilter } from '../types'

type Option = {
    value: string
    label: string
}

const statusOptions: Option[] = [
    { value: 'all', label: 'همه' },
    { value: 'active', label: 'فعال' },
    { value: 'inactive', label: 'غیرفعال' },
]

const crawlerStatusOptions: Option[] = [
    { value: 'all', label: 'همه' },
    { value: 'success', label: 'موفق' },
    { value: 'error', label: 'خطا' },
    { value: 'pending', label: 'در صف' },
    { value: 'unknown', label: 'نامشخص' },
]

const WebsiteListTableTools = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<WebsiteFilter>({
        status: 'all',
        crawlerStatus: 'all',
        dateRange: [],
    })

    const handleSearch = () => {
        // TODO: Implement search functionality
        console.log('Search:', searchTerm)
    }

    const handleFilterChange = (key: keyof WebsiteFilter, value: any) => {
        setFilter(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
                <Input
                    placeholder="جستجو در وب‌سایت‌ها..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    suffix={<HiOutlineSearch className="text-lg" />}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <Select
                    placeholder="وضعیت"
                    options={statusOptions}
                    value={statusOptions.find(option => option.value === filter.status)}
                    onChange={(option) => handleFilterChange('status', option?.value || 'all')}
                    className="min-w-[120px]"
                />
                <Select
                    placeholder="وضعیت کرالر"
                    options={crawlerStatusOptions}
                    value={crawlerStatusOptions.find(option => option.value === filter.crawlerStatus)}
                    onChange={(option) => handleFilterChange('crawlerStatus', option?.value || 'all')}
                    className="min-w-[140px]"
                />
                <Button
                    size="sm"
                    variant="solid"
                    icon={<HiOutlineSearch />}
                    onClick={handleSearch}
                >
                    جستجو
                </Button>
            </div>
        </div>
    )
}

export default WebsiteListTableTools