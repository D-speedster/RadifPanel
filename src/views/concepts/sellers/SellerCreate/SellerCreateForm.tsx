import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import StoreInfoSection from './components/StoreInfoSection'
import ContactInfoSection from './components/ContactInfoSection'
import ManagementInfoSection from './components/ManagementInfoSection'
import FinancialInfoSection from './components/FinancialInfoSection'
import DisplaySettingsSection from './components/DisplaySettingsSection'
import type { SellerCreateFormProps, SellerCreateFormSchema } from './types'

// Validation Schema
const validationSchema = z.object({
    // اطلاعات پایه فروشگاه
    storeName: z.string().min(1, 'نام فروشگاه الزامی است'),
    storeType: z.enum(['online', 'physical', 'both'], {
        required_error: 'نوع فروشگاه الزامی است'
    }),
    websiteUrl: z.string().url('آدرس وب‌سایت معتبر نیست').optional().or(z.literal('')),
    storeLogo: z.string().optional(),
    
    // اطلاعات تماس و پشتیبانی
    phone: z.string().min(1, 'شماره تماس الزامی است'),
    supportEmail: z.string().email('ایمیل معتبر نیست'),
    address: z.string().min(1, 'آدرس الزامی است'),
    
    // اطلاعات مدیریتی
    status: z.enum(['active', 'inactive', 'pending'], {
        required_error: 'وضعیت الزامی است'
    }),
    registrationDate: z.string().min(1, 'تاریخ ثبت الزامی است'),
    responsibleAdmin: z.string().optional(),
    
    // موارد مالی
    bankAccountNumber: z.string().optional(),
    taxInfo: z.string().optional(),
    
    // تنظیمات نمایش
    productCategories: z.array(z.string()).min(1, 'حداقل یک دسته‌بندی انتخاب کنید')
})

const SellerCreateForm = ({ onFormSubmit, children }: SellerCreateFormProps) => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<SellerCreateFormSchema>({
        defaultValues: {
            storeName: '',
            storeType: 'online',
            websiteUrl: '',
            storeLogo: '',
            phone: '',
            supportEmail: '',
            address: '',
            status: 'pending',
            registrationDate: new Date().toISOString().split('T')[0],
            responsibleAdmin: '',
            bankAccountNumber: '',
            taxInfo: '',
            productCategories: []
        },
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = (values: SellerCreateFormSchema) => {
        onFormSubmit(values)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h3 className="mb-2 text-xl font-bold">ایجاد فروشنده جدید</h3>
                        <p className="text-gray-600">اطلاعات فروشنده جدید را وارد کنید</p>
                    </div>
                    
                    <div className="space-y-8">
                        <StoreInfoSection control={control} errors={errors} />
                        <ContactInfoSection control={control} errors={errors} />
                        <ManagementInfoSection control={control} errors={errors} />
                        <FinancialInfoSection control={control} errors={errors} />
                        <DisplaySettingsSection control={control} errors={errors} />
                    </div>
                </div>
            </Container>
            {children}
        </Form>
    )
}

export default SellerCreateForm