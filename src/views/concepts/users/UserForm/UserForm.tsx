import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import BasicInfoSection from './BasicInfoSection'
import RoleSection from './RoleSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { UserFormSchema } from './types'

type UserFormProps = {
    onFormSubmit: (values: UserFormSchema) => void
    defaultValues?: UserFormSchema
    newUser?: boolean
    serverErrors?: Record<string, string[]>
} & CommonProps

const createValidationSchema = (isEdit: boolean = false) => {
    return z.object({
        name: z.string().min(1, { message: 'نام الزامی است' }),
        email: z.string().email({ message: 'ایمیل نامعتبر است' }),
        mobile: z.string().min(1, { message: 'موبایل الزامی است' }),
        password: isEdit
            ? z.string().optional().or(z.literal(''))
            : z.string().min(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' }),
        role: z.string().min(1, { message: 'انتخاب نقش الزامی است' }),
    })
}

const UserForm = (props: UserFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newUser = false,
        children,
    } = props

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
        setError,
    } = useForm<UserFormSchema>({
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            password: '',
            role: '',
            ...defaultValues,
        },
        resolver: zodResolver(createValidationSchema(!newUser)),
    })

    const selectedRole = useWatch({
        control,
        name: 'role',
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    // حذف اعتبارسنجی وابسته به نقش

    // نمایش ارورهای سمت سرور زیر فیلدها
    useEffect(() => {
        if (!props.serverErrors) return
        const entries = Object.entries(props.serverErrors)
        entries.forEach(([key, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
                const field = key as keyof UserFormSchema
                setError(field, { type: 'server', message: messages[0] })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(props.serverErrors)])


    const onSubmit = async (values: UserFormSchema) => {
        onFormSubmit?.(values)
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
                        <h3 className="text-lg font-semibold mb-4">اطلاعات پایه</h3>
                        <BasicInfoSection control={control} errors={errors} />
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold mb-4">نقش و دسترسی</h3>
                        <RoleSection 
                            control={control} 
                            errors={errors} 
                            selectedRole={selectedRole}
                        />
                    </div>
                    
                    {/* فیلدهای نقش‌محور حذف شدند */}
                </div>
            </Container>
            
            <BottomStickyBar>
                {children}
            </BottomStickyBar>
        </Form>
    )
}

export default UserForm