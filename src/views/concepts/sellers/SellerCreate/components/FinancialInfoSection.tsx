import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import FormItem from '@/components/ui/Form/FormItem'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const FinancialInfoSection = ({ control, errors }: FormSectionBaseProps) => {
    return (
        <Card className="mb-6">
            <div className="p-6">
                <h4 className="mb-6 text-lg font-semibold text-gray-900">
                    موارد مالی
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem
                        label="شماره شبا یا حساب بانکی"
                        invalid={Boolean(errors.bankAccountNumber)}
                        errorMessage={errors.bankAccountNumber?.message}
                    >
                        <Controller
                            name="bankAccountNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="IR123456789012345678901234"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="اطلاعات فاکتور/مالیاتی"
                        invalid={Boolean(errors.taxInfo)}
                        errorMessage={errors.taxInfo?.message}
                    >
                        <Controller
                            name="taxInfo"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="شناسه ملی یا کد اقتصادی (اختیاری)"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                        <strong>توجه:</strong> اطلاعات مالی برای تسویه حساب و پرداخت کارمزد استفاده می‌شود. 
                        در صورت عدم وارد کردن این اطلاعات، امکان دریافت پرداخت وجود نخواهد داشت.
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default FinancialInfoSection