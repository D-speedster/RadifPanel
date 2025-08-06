import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { useFormContext } from 'react-hook-form'
import type { WebsiteFormSchema } from './types'

const OverviewSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<WebsiteFormSchema>()

    return (
        <Card>
            <h4 className="mb-6">اطلاعات کلی</h4>
            <div className="grid md:grid-cols-1 gap-4">
                <FormItem
                    label="نام وب‌سایت"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="نام وب‌سایت را وارد کنید"
                        {...register('name')}
                    />
                </FormItem>
                <FormItem
                    label="آدرس وب‌سایت"
                    invalid={Boolean(errors.url)}
                    errorMessage={errors.url?.message}
                >
                    <Input
                        type="url"
                        autoComplete="off"
                        placeholder="https://example.com"
                        {...register('url')}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OverviewSection