import type { Control, FieldErrors } from 'react-hook-form'

export type UserFormSchema = {
    name: string
    email: string
    mobile: string
    password: string
    role: string
}

export type FormSectionBaseProps = {
    control: Control<UserFormSchema>
    errors: FieldErrors<UserFormSchema>
}