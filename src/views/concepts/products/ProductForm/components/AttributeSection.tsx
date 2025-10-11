import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'
import { FormItem } from '@/components/ui/Form'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import HierarchicalCategorySelect from './HierarchicalCategorySelect'
import type { FormSectionBaseProps } from '../types'

type AttributeSectionProps = FormSectionBaseProps

type Options = {
    label: string
    value: string
}[]

const tags: Options = [
    { label: 'مد روز', value: 'trend' },
    { label: 'مردانه و زنانه', value: 'unisex' },
]

const AttributeSection = ({ control, errors }: AttributeSectionProps) => {

    return (
        <Card>
            <h4 className="mb-6">ویژگی‌ها</h4>
            <Controller
                name="parent_id"
                control={control}
                render={({ field }) => (
                    <HierarchicalCategorySelect
                        control={control}
                        errors={errors}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <FormItem
                label="برچسب‌ها"
                extra={
                    <Tooltip
                        title="می‌توانید به تعداد دلخواه برچسب برای یک محصول اضافه کنید"
                        className="text-center"
                    >
                        <HiOutlineQuestionMarkCircle className="text-base mx-1" />
                    </Tooltip>
                }
            >
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isMulti
                            isClearable
                            value={field.value}
                            placeholder="برچسب‌ها را برای محصول اضافه کنید..."
                            componentAs={CreatableSelect}
                            options={tags}
                            onChange={(option) => field.onChange(option)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="برند"
                invalid={Boolean(errors.brand)}
                errorMessage={errors.brand?.message}
            >
                <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="برند محصول"
                            {...field}
                        />
                    )}
                />
            </FormItem>
        </Card>

    )
}

export default AttributeSection
