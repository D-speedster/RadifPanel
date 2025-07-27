import { useState, useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import FormItem from '@/components/ui/Form/FormItem'
import FormContainer from '@/components/ui/Form/FormContainer'

type CreditCardDialogProps = {
    title: string
    defaultValues: {
        cardHolderName: string
        ccNumber: string
        cardExpiry: string
        code: string
    }
    dialogOpen: boolean
    onDialogClose: () => void
    onSubmit: () => void
}

const CreditCardDialog = ({
    title,
    defaultValues,
    dialogOpen,
    onDialogClose,
    onSubmit,
}: CreditCardDialogProps) => {
    const [formData, setFormData] = useState(defaultValues)

    useEffect(() => {
        setFormData(defaultValues)
    }, [defaultValues])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = () => {
        onSubmit()
    }

    const handleClose = () => {
        setFormData(defaultValues)
        onDialogClose()
    }

    return (
        <Dialog
            isOpen={dialogOpen}
            onClose={handleClose}
            onRequestClose={handleClose}
        >
            <div className="p-6">
                <h4 className="mb-6">{title}</h4>
                <FormContainer>
                    <FormItem label="نام دارنده کارت">
                        <Input
                            value={formData.cardHolderName}
                            onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                            placeholder="نام دارنده کارت را وارد کنید"
                        />
                    </FormItem>
                    <FormItem label="شماره کارت">
                        <Input
                            value={formData.ccNumber}
                            onChange={(e) => handleInputChange('ccNumber', e.target.value)}
                            placeholder="شماره کارت را وارد کنید"
                            maxLength={19}
                        />
                    </FormItem>
                    <div className="grid grid-cols-2 gap-4">
                        <FormItem label="تاریخ انقضا">
                            <Input
                                value={formData.cardExpiry}
                                onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                                placeholder="MM/YY"
                                maxLength={5}
                            />
                        </FormItem>
                        <FormItem label="کد امنیتی">
                            <Input
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                                placeholder="CVV"
                                maxLength={4}
                            />
                        </FormItem>
                    </div>
                </FormContainer>
                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="plain" onClick={handleClose}>
                        لغو
                    </Button>
                    <Button variant="solid" onClick={handleSubmit}>
                        ذخیره
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default CreditCardDialog