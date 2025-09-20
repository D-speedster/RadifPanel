import type { Control, FieldErrors } from 'react-hook-form'

// اطلاعات پایه فروشگاه
export type StoreInfoFields = {
    storeName: string
    storeType: 'online' | 'physical' | 'both'
    websiteUrl: string
    storeLogo: string
}

// اطلاعات تماس و پشتیبانی
export type ContactInfoFields = {
    phone: string
    supportEmail: string
    address: string
}

// اطلاعات مدیریتی
export type ManagementInfoFields = {
    status: 'active' | 'inactive' | 'pending'
    registrationDate: string
    responsibleAdmin: string
}

// موارد مالی
export type FinancialInfoFields = {
    bankAccountNumber: string
    taxInfo: string
}

// تنظیمات نمایش
export type DisplaySettingsFields = {
    productCategories: string[]
}

// ترکیب همه فیلدها
export type SellerCreateFormSchema = StoreInfoFields &
    ContactInfoFields &
    ManagementInfoFields &
    FinancialInfoFields &
    DisplaySettingsFields

// Props پایه برای بخش‌های فرم
export type FormSectionBaseProps = {
    control: Control<SellerCreateFormSchema>
    errors: FieldErrors<SellerCreateFormSchema>
}

// Props فرم اصلی
export type SellerCreateFormProps = {
    onFormSubmit: (values: SellerCreateFormSchema) => void
    children: React.ReactNode
}