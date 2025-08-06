import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import OverviewSection from './OverviewSection'
import BusinessSection from './BusinessSection'
import ProfileImageSection from './ProfileImageSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { SellerFormSchema } from './types'

type SellerFormProps = {
    onFormSubmit: (values: SellerFormSchema) => void
    defaultValues?: SellerFormSchema
    newSeller?: boolean
} & CommonProps

const validationSchema: ZodType<SellerFormSchema> = z.object({
    name: z.string().min(1, { message: 'نام فروشنده لازم است' }),
    email: z
        .string()
        .min(1, { message: 'ایمیل لازم است' })
        .email({ message: 'ایمیل نامعتبر است' }),
    phone: z.string().min(1, { message: 'شماره تلفن لازم است' }),
    status: z.enum(['active', 'pending', 'inactive'], {
        message: 'وضعیت لازم است',
    }),
    role: z.enum(['premium', 'standard'], {
        message: 'نوع اکانت لازم است',
    }),
    product_count: z.number().min(0, { message: 'تعداد محصولات نمی‌تواند منفی باشد' }),
    avatar: z.string(),
})

const SellerForm = (props: SellerFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newSeller = false,
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<SellerFormSchema>({
        defaultValues: {
            status: 'active',
            role: 'standard',
            product_count: 0,
            avatar: '',
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: SellerFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <OverviewSection control={control} errors={errors} />
                        <BusinessSection control={control} errors={errors} />
                    </div>
                    <div className="lg:w-[370px] gap-4 flex flex-col">
                        <ProfileImageSection
                            control={control}
                            errors={errors}
                        />
                    </div>
                </div>
            </Container>
            {children}
        </Form>
    )
}

export default SellerForm