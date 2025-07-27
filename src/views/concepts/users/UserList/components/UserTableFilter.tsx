import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Checkbox from '@/components/ui/Checkbox'
import Badge from '@/components/ui/Badge'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { components } from 'react-select'
import { Form, FormItem } from '@/components/ui/Form'
import useUserList from '../hooks/useUserList'
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { ControlProps, OptionProps } from 'react-select'
import classNames from '@/utils/classNames'

type FormSchema = {
    userStatus: string
    userRole: Array<string>
}

type Option = {
    value: string
    label: string
    className: string
}

const { Control } = components

const userStatusOption: Option[] = [
    { value: 'active', label: 'فعال', className: 'bg-emerald-500' },
    { value: 'inactive', label: 'غیرفعال', className: 'bg-red-500' },
    { value: 'pending', label: 'در انتظار تایید', className: 'bg-amber-500' },
    { value: 'suspended', label: 'مسدود شده', className: 'bg-gray-400' },
]

const userRoleList = ['ادمین', 'کاربر', 'مدیر', 'ناظر', 'مهمان']

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
                <Badge className={classNames('mr-4', selected.className)} />
            )}
            {children}
        </Control>
    )
}

const validationSchema: ZodType<FormSchema> = z.object({
    userStatus: z.string(),
    userRole: z.array(z.string()),
})

const UserTableFilter = () => {
    const [filterIsOpen, setFilterIsOpen] = useState(false)

    const { filterData, setFilterData } = useUserList()

    const { handleSubmit, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setFilterData(values)
        setFilterIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => setFilterIsOpen(true)}>
                فیلتر
            </Button>
            <Drawer
                title="فیلتر کاربران"
                isOpen={filterIsOpen}
                onClose={() => setFilterIsOpen(false)}
                onRequestClose={() => setFilterIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <FormItem label="وضعیت کاربر">
                            <Controller
                                name="userStatus"
                                control={control}
                                render={({ field }) => (
                                    <Select<Option>
                                        options={userStatusOption}
                                        {...field}
                                        value={userStatusOption.filter(
                                            (option) => option.value === field.value
                                        )}
                                        components={{
                                            Option: CustomSelectOption,
                                            Control: CustomControl,
                                        }}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem label="نقش کاربر">
                            <div className="mt-4">
                                <Controller
                                    name="userRole"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox.Group
                                            vertical
                                            className="flex"
                                            {...field}
                                        >
                                            {userRoleList.map((role, index) => (
                                                <Checkbox
                                                    key={role + index}
                                                    name={field.name}
                                                    value={role}
                                                    className="justify-between flex-row-reverse heading-text"
                                                >
                                                    {role}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    )}
                                />
                            </div>
                        </FormItem>
                    </div>
                    <Button variant="solid" type="submit">
                        جستجو
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}

export default UserTableFilter