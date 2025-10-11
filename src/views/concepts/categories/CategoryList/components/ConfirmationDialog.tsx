import { Button } from '@/components/ui'
import { HiOutlineExclamation } from 'react-icons/hi'

interface ConfirmationDialogProps {
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmationDialog = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmationDialogProps) => {
    if (!isOpen) return null

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div 
                className="bg-white w-full max-w-sm mx-4"
                style={{
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
                }}
            >
                {/* محتوای دیالوگ */}
                <div className="p-6 text-center">
                    {/* آیکون هشدار */}
                    <div 
                        className="mx-auto flex items-center justify-center mb-4"
                        style={{
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(248, 113, 113, 0.1)'
                        }}
                    >
                        <HiOutlineExclamation 
                            className="w-6 h-6" 
                            style={{ color: '#F87171' }}
                        />
                    </div>

                    {/* عنوان */}
                    <h3 
                        className="font-bold mb-2"
                        style={{
                            fontSize: '1.125rem',
                            color: '#1A202C'
                        }}
                    >
                        {title}
                    </h3>

                    {/* پیام */}
                    <p 
                        className="mb-6"
                        style={{
                            color: '#A0AEC0',
                            fontSize: '0.9rem',
                            lineHeight: '1.5'
                        }}
                    >
                        {message}
                    </p>

                    {/* دکمه‌های عملیات */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="solid"
                            onClick={onConfirm}
                            className="flex-1"
                            style={{
                                backgroundColor: '#F87171',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}
                        >
                            حذف
                        </Button>
                        <Button
                            variant="plain"
                            onClick={onCancel}
                            className="flex-1"
                            style={{
                                color: '#A0AEC0',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                border: '1px solid #E2E8F0'
                            }}
                        >
                            انصراف
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog