import type { Control, FieldErrors } from 'react-hook-form'

export type UserFormSchema = {
    fullName: string
    email?: string
    phone: string
    password: string
    role: string
    status: string
    // فیلدهای اختصاصی فروشنده
    shopName?: string
    businessLicense?: string
    bankAccount?: string
    // فیلدهای اختصاصی مدیر
    department?: string
    accessLevel?: string
    // فیلدهای اختصاصی اپراتور
    shift?: string
    workArea?: string
}

export type FormSectionBaseProps = {
    control: Control<UserFormSchema>
    errors: FieldErrors<UserFormSchema>
}