import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Checkbox from '@/components/ui/Checkbox'
import Badge from '@/components/ui/Badge'
import Select from '@/components/ui/Select'
import { Form, FormItem } from '@/components/ui/Form'
import useWebsiteList from '../store/websiteListStore'
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const websiteStatus = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

const crawlerStatus = [
    { label: 'موفق', value: 'success' },
    { label: 'خطا', value: 'error' },
    { label: 'در صف', value: 'pending' },
    { label: 'نامشخص', value: 'unknown' },
]

const validationSchema = z.object({
    status: z.string().optional(),
    crawlerStatus: z.array(z.string()).optional(),
})

type FormModel = z.infer<typeof validationSchema>

const CustomSelectOption = ({ innerProps, label, data, isSelected }: any) => {
    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <span className="ml-2">{label}</span>
            </div>
        </div>
    )
}

const CustomControl = ({ children, ...props }: any) => {
    const selected = props.getValue()
    return (
        <div className="min-h-[38px]">
            <div {...props.innerProps} className="flex flex-wrap gap-1 p-2">
                {selected.length > 0 ? (
                    selected.map((option: any) => (
                        <Badge key={option.value} className="mr-1">
                            {option.label}
                        </Badge>
                    ))
                ) : (
                    <span className="text-gray-400">انتخاب کنید...</span>
                )}
            </div>
            {children}
        </div>
    )
}

const WebsiteTableFilter = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { tableData, setTableData } = useWebsiteList()

    const {
        handleSubmit,
        control,
        reset,
        formState: { dirtyFields },
    } = useForm<FormModel>({
        defaultValues: {
            status: '',
            crawlerStatus: [],
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormModel) => {
        const { status, crawlerStatus } = values
        setTableData((prevData) => ({
            ...prevData,
            status: status || '',
            crawlerStatus: crawlerStatus || [],
        }))
        setIsOpen(false)
    }

    const handleReset = () => {
        reset()
        setTableData((prevData) => ({
            ...prevData,
            status: '',
            crawlerStatus: [],
        }))
    }

    const activeFiltersCount = Object.keys(dirtyFields).length

    return (
        <>
            <Button
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(true)}
            >
                <TbFilter />
                فیلتر
                {activeFiltersCount > 0 && (
                    <Badge className="bg-red-500 text-white">
                        {activeFiltersCount}
                    </Badge>
                )}
            </Button>
            <Drawer
                title="فیلتر وب‌سایت‌ها"
                isOpen={isOpen}
                placement="right"
                width={300}
                onClose={() => setIsOpen(false)}
                onRequestClose={() => setIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormItem label="وضعیت وب‌سایت">
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        placeholder="انتخاب کنید..."
                                        options={websiteStatus}
                                        value={websiteStatus.find(
                                            (option) => option.value === field.value
                                        )}
                                        onChange={(option) =>
                                            field.onChange(option?.value || '')
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem label="وضعیت کرالر">
                            <Controller
                                name="crawlerStatus"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox.Group
                                        vertical
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        {crawlerStatus.map((status) => (
                                            <Checkbox
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </Checkbox>
                                        ))}
                                    </Checkbox.Group>
                                )}
                            />
                        </FormItem>
                    </div>
                    <div className="flex gap-2 pt-4">
                        <Button
                            size="sm"
                            className="flex-1"
                            type="button"
                            onClick={handleReset}
                        >
                            بازنشانی
                        </Button>
                        <Button
                            size="sm"
                            variant="solid"
                            type="submit"
                            className="flex-1"
                        >
                            اعمال فیلتر
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    )
}

export default WebsiteTableFilter