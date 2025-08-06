import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import SettingsSection from './SettingsSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { WebsiteFormSchema } from './types'

type WebsiteFormProps = {
    onFormSubmit: (values: WebsiteFormSchema) => void
    defaultValues?: WebsiteFormSchema
    newWebsite?: boolean
} & CommonProps

const validationSchema: ZodType<WebsiteFormSchema> = z.object({
    name: z.string().min(1, { message: 'نام وب‌سایت لازم است' }),
    url: z
        .string()
        .min(1, { message: 'آدرس وب‌سایت لازم است' })
        .url({ message: 'آدرس وب‌سایت نامعتبر است' }),
    isActive: z.boolean(),
})

const WebsiteForm = (props: WebsiteFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newWebsite = false,
        children,
    } = props

    const form = useForm<WebsiteFormSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    const { handleSubmit, reset } = form

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: WebsiteFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <h3 className="mb-2">
                                {newWebsite ? 'افزودن وب‌سایت جدید' : 'ویرایش وب‌سایت'}
                            </h3>
                            <p className="text-base">
                                {newWebsite
                                    ? 'وب‌سایت جدید خود را اضافه کنید'
                                    : 'اطلاعات وب‌سایت را ویرایش کنید'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <OverviewSection />
                            </div>
                            <div className="lg:col-span-1">
                                <SettingsSection />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </form>
        </FormProvider>
    )
}

export default WebsiteForm