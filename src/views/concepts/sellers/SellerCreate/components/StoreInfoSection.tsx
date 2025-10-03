import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import FormItem from '@/components/ui/Form/FormItem'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

const StoreInfoSection = ({ control, errors }: FormSectionBaseProps) => {
    const storeTypeOptions = [
        { value: 'online', label: 'آنلاین' },
        { value: 'physical', label: 'حضوری' },
        { value: 'both', label: 'ترکیبی (آنلاین و حضوری)' }
    ]

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true
        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'لطفاً فقط فایل‌های JPG و PNG آپلود کنید!'
                }
            }
        }
        return valid
    }

    const onUpload = (files: File[], fileList: File[]) => {
        if (fileList.length > 0) {
            return URL.createObjectURL(fileList[0])
        }
        return ''
    }

    return (
        <Card className="mb-6">
            <div className="p-6">
                <h4 className="mb-6 text-lg font-semibold text-gray-900">
                    اطلاعات پایه فروشگاه
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem
                        label="نام فروشگاه"
                        invalid={Boolean(errors.storeName)}
                        errorMessage={errors.storeName?.message}
                        asterisk
                    >
                        <Controller
                            name="storeName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="نام فروشگاه را وارد کنید"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="نوع فروشگاه"
                        invalid={Boolean(errors.storeType)}
                        errorMessage={errors.storeType?.message}
                        asterisk
                    >
                        <Controller
                            name="storeType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="نوع فروشگاه را انتخاب کنید"
                                    options={storeTypeOptions}
                                    value={storeTypeOptions.find(option => option.value === field.value) || null}
                                    onChange={(selectedOption) => {
                                        const value = (selectedOption as any)?.value || ''
                                        field.onChange(value)
                                    }}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="دامنه وب‌سایت"
                        invalid={Boolean(errors.websiteUrl)}
                        errorMessage={errors.websiteUrl?.message}
                    >
                        <Controller
                            name="websiteUrl"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="لوگو فروشگاه"
                        invalid={Boolean(errors.storeLogo)}
                        errorMessage={errors.storeLogo?.message}
                    >
                        <Controller
                            name="storeLogo"
                            control={control}
                            render={({ field }) => (
                                <Upload
                                    className="cursor-pointer"
                                    showList={false}
                                    uploadLimit={1}
                                    beforeUpload={beforeUpload}
                                    onChange={(files, fileList) => {
                                        const url = onUpload(files, fileList)
                                        field.onChange(url)
                                    }}
                                >
                                    <div className="my-16 text-center">
                                        <div className="text-6xl mb-4 flex justify-center">
                                            <svg
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth="0"
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                ></path>
                                            </svg>
                                        </div>
                                        <p className="font-semibold">
                                            <span className="text-gray-800 dark:text-white">
                                                برای آپلود کلیک کنید
                                            </span>
                                            <span className="text-gray-500"> یا فایل را بکشید</span>
                                        </p>
                                        <p className="mt-1 opacity-60 dark:text-white">
                                            فرمت‌های مجاز: JPG, PNG
                                        </p>
                                    </div>
                                </Upload>
                            )}
                        />
                    </FormItem>
                </div>
            </div>
        </Card>
    )
}

export default StoreInfoSection