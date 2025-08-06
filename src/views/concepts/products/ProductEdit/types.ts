import { z } from 'zod'

export type OverviewFields = {
    name: string
    productCode: string
    category: string
    price: number
    stock: number
}

export type StatusFields = {
    status: number
}

export type ImageFields = {
    img: string
}

export const ProductFormSchema = z.object({
    name: z.string().min(1, 'نام محصول الزامی است'),
    productCode: z.string().min(1, 'کد محصول الزامی است'),
    category: z.string().min(1, 'دسته‌بندی الزامی است'),
    price: z.number().min(0, 'قیمت باید مثبت باشد'),
    stock: z.number().min(0, 'موجودی باید مثبت باشد'),
    status: z.number(),
    img: z.string().optional(),
})

export type ProductFormSchema = z.infer<typeof ProductFormSchema>

export type FormSectionBaseProps = {
    control: any
    errors: any
}