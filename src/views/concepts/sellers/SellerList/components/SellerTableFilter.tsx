import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Checkbox from '@/components/ui/Checkbox'
import Badge from '@/components/ui/Badge'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { components } from 'react-select'
import { Form, FormItem } from '@/components/ui/Form'
import useSellerList from '../hooks/useSellerList'
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { ControlProps, OptionProps } from 'react-select'
import classNames from '@/utils/classNames'

type FormSchema = {
    sellerStatus: string
    sellerRole: Array<string>
}

type Option = {
    value: string
    label: string
    className: string
}

const { Control } = components

const sellerStatusOption: Option[] = [
    { value: 'active', label: 'فعال', className: 'bg-emerald-500' },
    { value: 'inactive', label: 'غیرفعال', className: 'bg-red-500' },
    { value: 'pending', label: 'در انتظار تایید', className: 'bg-amber-500' },
    { value: 'suspended', label: 'مسدود شده', className: 'bg-gray-400' },
]

const sellerRoleList = ['ادمین', 'فروشنده', 'مدیر', 'ناظر', 'مهمان']

const CustomSelectOption = (props: OptionProps<Option>) => {
    return (
        <DefaultOption<Option>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Badge className={data.className} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<Option>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Badge
                    className={classNames(
                        'ltr:ml-4 rtl:mr-4',
                        selected.className,
                    )}
                />
            )}
            {children}
        </Control>
    )
}

const validationSchema: ZodType<FormSchema> = z.object({
    sellerStatus: z.string(),
    sellerRole: z.array(z.string()),
})

const SellerTableFilter = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { filterData, setFilterData } = useSellerList()

    const { handleSubmit, control, reset } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setFilterData(values)
        setIsOpen(false)
    }

    const handleReset = () => {
        reset()
        setFilterData({
            sellerStatus: '',
            sellerRole: [],
        })
        setIsOpen(false)
    }

    return (
        <>
            <Button
                size="sm"
                icon={<TbFilter />}
                onClick={() => setIsOpen(true)}
            >
                فیلتر
            </Button>
            <Drawer
                title="فیلتر فروشندگان"
                isOpen={isOpen}
                placement="right"
                width={375}
                onClose={() => setIsOpen(false)}
                onRequestClose={() => setIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <FormItem label="وضعیت فروشنده">
                            <Controller
                                name="sellerStatus"
                                control={control}
                                render={({ field }) => (
                                    <Select<Option>
                                        {...field}
                                        isClearable
                                        options={sellerStatusOption}
                                        components={{
                                            Option: CustomSelectOption,
                                            Control: CustomControl,
                                        }}
                                        value={sellerStatusOption.filter(
                                            (option) =>
                                                option.value === field.value,
                                        )}
                                        onChange={(option) =>
                                            field.onChange(
                                                option?.value || '',
                                            )
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem label="نقش فروشنده">
                            <Controller
                                name="sellerRole"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox.Group
                                        {...field}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        {sellerRoleList.map((role) => (
                                            <Checkbox
                                                key={role}
                                                name={field.name}
                                                value={role}
                                            >
                                                {role}
                                            </Checkbox>
                                        ))}
                                    </Checkbox.Group>
                                )}
                            />
                        </FormItem>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className="ltr:mr-2 rtl:ml-2"
                            type="button"
                            onClick={handleReset}
                        >
                            بازنشانی
                        </Button>
                        <Button size="sm" variant="solid" type="submit">
                            اعمال فیلتر
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    )
}

export default SellerTableFilter