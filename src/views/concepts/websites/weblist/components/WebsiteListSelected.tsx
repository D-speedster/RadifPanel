import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { HiOutlineTrash, HiOutlineRefresh } from 'react-icons/hi'

const WebsiteListSelected = () => {
    const [selectedWebsites, setSelectedWebsites] = useState<number[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleBulkDelete = () => {
        setDialogOpen(true)
    }

    const handleBulkCrawl = () => {
        // TODO: Implement bulk crawl functionality
        console.log('Bulk crawl websites:', selectedWebsites)
    }

    const confirmDelete = () => {
        // TODO: Implement bulk delete functionality
        console.log('Delete websites:', selectedWebsites)
        setSelectedWebsites([])
        setDialogOpen(false)
    }

    if (selectedWebsites.length === 0) {
        return null
    }

    return (
        <>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        {selectedWebsites.length} وب‌سایت انتخاب شده
                    </span>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="solid"
                            color="blue"
                            icon={<HiOutlineRefresh />}
                            onClick={handleBulkCrawl}
                        >
                            کرال گروهی
                        </Button>
                        <Button
                            size="sm"
                            variant="solid"
                            color="red"
                            icon={<HiOutlineTrash />}
                            onClick={handleBulkDelete}
                        >
                            حذف گروهی
                        </Button>
                    </div>
                    <Button
                        size="sm"
                        variant="plain"
                        onClick={() => setSelectedWebsites([])}
                    >
                        لغو انتخاب
                    </Button>
                </div>
            </div>

            <Dialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onRequestClose={() => setDialogOpen(false)}
            >
                <div className="p-6">
                    <h4 className="mb-4">تأیید حذف</h4>
                    <p className="mb-6 text-gray-600">
                        آیا از حذف {selectedWebsites.length} وب‌سایت انتخاب شده اطمینان دارید؟
                        این عمل قابل بازگشت نیست.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="plain"
                            onClick={() => setDialogOpen(false)}
                        >
                            لغو
                        </Button>
                        <Button
                            variant="solid"
                            color="red"
                            onClick={confirmDelete}
                        >
                            حذف
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default WebsiteListSelected