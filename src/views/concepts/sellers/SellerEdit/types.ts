import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    name: string
    email: string
    phone: string
    avatar: string
}

export type BusinessFields = {
    status: 'active' | 'pending' | 'inactive'
    role: 'premium' | 'standard'
    product_count: number
}

export type ProfileImageFields = {
    avatar: string
}

export type SellerFormSchema = OverviewFields &
    BusinessFields &
    ProfileImageFields

export type FormSectionBaseProps = {
    control: Control<SellerFormSchema>
    errors: FieldErrors<SellerFormSchema>
}