import Card from '@/components/ui/Card'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { useFormContext, Controller } from 'react-hook-form'
import type { WebsiteFormSchema } from './types'

const SettingsSection = () => {
    const { control } = useFormContext<WebsiteFormSchema>()

    return (
        <Card>
            <h4 className="mb-6">تنظیمات</h4>
            <div className="space-y-6">
                <FormItem label="وضعیت فعالیت">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">فعال/غیرفعال</p>
                            <p className="text-xs text-gray-500">
                                وضعیت فعالیت وب‌سایت را تعیین کنید
                            </p>
                        </div>
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                                <Switcher
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </FormItem>
            </div>
        </Card>
    )
}

export default SettingsSection