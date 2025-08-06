import { Controller } from 'react-hook-form'
import Select from '@/components/ui/Select'
import FormItem from '@/components/ui/Form/FormItem'
import FormContainer from '@/components/ui/Form/FormContainer'
import type { FormSectionBaseProps } from './types'

type StatusSectionProps = FormSectionBaseProps

const statusOptions = [
    { value: 1, label: 'فعال' },
    { value: 0, label: 'غیرفعال' },
]

const StatusSection = ({ control, errors }: StatusSectionProps) => {
    return (
        <FormContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormItem
                    label="وضعیت محصول"
                    invalid={Boolean(errors.status)}
                    errorMessage={errors.status?.message}
                >
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="وضعیت محصول را انتخاب کنید"
                                options={statusOptions}
                                value={statusOptions.find(option => option.value === field.value)}
                                onChange={(option) => field.onChange(option?.value)}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </FormContainer>
    )
}

export default StatusSection