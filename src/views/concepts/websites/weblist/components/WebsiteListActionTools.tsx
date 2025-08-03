import { useState } from 'react'
import Button from '@/components/ui/Button'
import { HiOutlinePlus } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const WebsiteListActionTools = () => {
    const navigate = useNavigate()

    const handleAddWebsite = () => {
        navigate('/websites/new')
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Button
                size="sm"
                variant="solid"
                icon={<HiOutlinePlus />}
                onClick={handleAddWebsite}
            >
                افزودن وب‌سایت
            </Button>
        </div>
    )
}

export default WebsiteListActionTools