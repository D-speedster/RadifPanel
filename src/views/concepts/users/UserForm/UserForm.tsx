import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import BasicInfoSection from './BasicInfoSection'
import RoleSection from './RoleSection'
import RoleSpecificFields from './RoleSpecificFields'
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
} & CommonProps

const createValidationSchema = (role: string) => {
    const baseSchema = {
        fullName: z.string().min(1, { message: 'نام کامل الزامی است' }),
        email: z.string().email({ message: 'ایمیل نامعتبر است' }).optional().or(z.literal('')),
        phone: z.string().min(1, { message: 'شماره تلفن الزامی است' }),
        password: z.string().min(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' }),
        role: z.string().min(1, { message: 'انتخاب نقش الزامی است' }),
        status: z.string().min(1, { message: 'انتخاب وضعیت الزامی است' }),
    }

    // فیلدهای اختصاصی بر اساس نقش
    if (role === 'seller') {
        return z.object({
            ...baseSchema,
            shopName: z.string().min(1, { message: 'نام فروشگاه الزامی است' }),
            businessLicense: z.string().optional(),
            bankAccount: z.string().optional(),
            department: z.string().optional(),
            accessLevel: z.string().optional(),
            shift: z.string().optional(),
            workArea: z.string().optional(),
        })
    }

    if (role === 'admin') {
        return z.object({
            ...baseSchema,
            shopName: z.string().optional(),
            businessLicense: z.string().optional(),
            bankAccount: z.string().optional(),
            department: z.string().min(1, { message: 'انتخاب بخش الزامی است' }),
            accessLevel: z.string().min(1, { message: 'انتخاب سطح دسترسی الزامی است' }),
            shift: z.string().optional(),
            workArea: z.string().optional(),
        })
    }

    if (role === 'operator') {
        return z.object({
            ...baseSchema,
            shopName: z.string().optional(),
            businessLicense: z.string().optional(),
            bankAccount: z.string().optional(),
            department: z.string().optional(),
            accessLevel: z.string().optional(),
            shift: z.string().min(1, { message: 'انتخاب شیفت الزامی است' }),
            workArea: z.string().min(1, { message: 'انتخاب حوزه کاری الزامی است' }),
        })
    }

    // برای کاربر عادی
    return z.object({
        ...baseSchema,
        shopName: z.string().optional(),
        businessLicense: z.string().optional(),
        bankAccount: z.string().optional(),
        department: z.string().optional(),
        accessLevel: z.string().optional(),
        shift: z.string().optional(),
        workArea: z.string().optional(),
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
    } = useForm<UserFormSchema>({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            role: '',
            status: 'active',
            shopName: '',
            businessLicense: '',
            bankAccount: '',
            department: '',
            accessLevel: '',
            shift: '',
            workArea: '',
            ...defaultValues,
        },
        resolver: zodResolver(createValidationSchema('')),
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

    useEffect(() => {
        if (selectedRole) {
            // Force re-validation when role changes
            trigger()
        }
    }, [selectedRole, trigger])



    const onSubmit = async (values: UserFormSchema) => {
        // Validate with current role schema before submitting
        const schema = createValidationSchema(selectedRole || '')
        try {
            const validatedValues = schema.parse(values)
            onFormSubmit?.(validatedValues)
        } catch (error) {
            console.error('Validation error:', error)
        }
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
                    
                    <RoleSpecificFields 
                        control={control} 
                        errors={errors} 
                        selectedRole={selectedRole}
                    />
                </div>
            </Container>
            
            <BottomStickyBar>
                {children}
            </BottomStickyBar>
        </Form>
    )
}

export default UserForm