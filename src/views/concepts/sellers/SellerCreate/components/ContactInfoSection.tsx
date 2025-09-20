import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import FormItem from '@/components/ui/Form/FormItem'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const ContactInfoSection = ({ control, errors }: FormSectionBaseProps) => {
    return (
        <Card className="mb-6">
            <div className="p-6">
                <h4 className="mb-6 text-lg font-semibold text-gray-900">
                    اطلاعات تماس و پشتیبانی
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem
                        label="شماره تماس"
                        invalid={Boolean(errors.phone)}
                        errorMessage={errors.phone?.message}
                        asterisk
                    >
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="tel"
                                    placeholder="09123456789"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="ایمیل پشتیبانی"
                        invalid={Boolean(errors.supportEmail)}
                        errorMessage={errors.supportEmail?.message}
                        asterisk
                    >
                        <Controller
                            name="supportEmail"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="email"
                                    placeholder="support@example.com"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <div className="md:col-span-2">
                        <FormItem
                            label="آدرس"
                            invalid={Boolean(errors.address)}
                            errorMessage={errors.address?.message}
                            asterisk
                        >
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        textArea
                                        placeholder="آدرس کامل فروشگاه یا دفتر مرکزی را وارد کنید"
                                        rows={3}
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ContactInfoSection