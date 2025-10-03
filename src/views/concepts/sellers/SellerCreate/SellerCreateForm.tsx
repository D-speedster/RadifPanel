import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/Form'
import BottomStickyBar from '@/components/template/BottomStickyBar'
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
    storeType: z.enum(['online', 'physical', 'both']).optional(),
    websiteUrl: z.string().url('آدرس وب‌سایت معتبر نیست').optional().or(z.literal('')),
    storeLogo: z.string().optional(),
    
    // اطلاعات تماس و پشتیبانی
    phone: z.string().min(1, 'شماره تماس الزامی است'),
    supportEmail: z.string().email('ایمیل معتبر نیست'),
    address: z.string().min(1, 'آدرس الزامی است'),
    description: z.string().min(1, 'توضیحات الزامی است'),
    
    // اطلاعات مدیریتی
    status: z.enum(['active', 'inactive', 'pending']).optional(),
    registrationDate: z.string().optional().or(z.literal('')),
    responsibleAdmin: z.string().optional(),
    password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
    
    // موارد مالی
    bankAccountNumber: z.string().optional(),
    taxInfo: z.string().optional(),
    
    // تنظیمات نمایش
    productCategories: z.array(z.string()).optional().or(z.literal([]))
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
            description: '',
            status: 'pending',
            registrationDate: new Date().toISOString().split('T')[0],
            responsibleAdmin: '',
            password: '',
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
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold mb-2">ایجاد فروشنده جدید</h3>
                        <p className="text-gray-600">اطلاعات فروشنده جدید را وارد کنید</p>
                    </div>

                    <StoreInfoSection control={control} errors={errors} />
                    <ContactInfoSection control={control} errors={errors} />
                    <ManagementInfoSection control={control} errors={errors} />
                    <FinancialInfoSection control={control} errors={errors} />
                    <DisplaySettingsSection control={control} errors={errors} />
                </div>
            </Container>

            <BottomStickyBar>
                {children}
            </BottomStickyBar>
        </Form>
    )
}

export default SellerCreateForm