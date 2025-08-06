import { Controller } from 'react-hook-form'
import Upload from '@/components/ui/Upload'
import Avatar from '@/components/ui/Avatar'
import FormItem from '@/components/ui/Form/FormItem'
import FormContainer from '@/components/ui/Form/FormContainer'
import { FiPackage } from 'react-icons/fi'
import type { FormSectionBaseProps } from './types'

type ImageSectionProps = FormSectionBaseProps

const ImageSection = ({ control, errors }: ImageSectionProps) => {
    const onSetFormFile = (form: any, field: any, file: File[]) => {
        if (file.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                field.onChange(reader.result as string)
            }
            reader.readAsDataURL(file[0])
        }
    }

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png', 'image/gif']
        const maxFileSize = 500000

        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'لطفاً فقط فایل‌های تصویری (JPEG, PNG, GIF) آپلود کنید!'
                }

                if (file.size >= maxFileSize) {
                    valid = 'حجم فایل نباید بیشتر از 500KB باشد!'
                }
            }
        }

        return valid
    }

    return (
        <FormContainer>
            <FormItem
                label="تصویر محصول"
                invalid={Boolean(errors.img)}
                errorMessage={errors.img?.message}
            >
                <Controller
                    name="img"
                    control={control}
                    render={({ field }) => {
                        const avatarProps = field.value
                            ? { src: field.value }
                            : { icon: <FiPackage /> }

                        return (
                            <Upload
                                className="cursor-pointer"
                                showList={false}
                                uploadLimit={1}
                                beforeUpload={beforeUpload}
                                onChange={(files) => onSetFormFile(null, field, files)}
                            >
                                <Avatar
                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                    size={100}
                                    shape="round"
                                    {...avatarProps}
                                />
                            </Upload>
                        )
                    }}
                />
            </FormItem>
            <div className="mt-2">
                <Controller
                    name="img"
                    control={control}
                    render={({ field }) => (
                        field.value && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">تصویر انتخاب شده</span>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700 text-sm"
                                    onClick={() => field.onChange('')}
                                >
                                    حذف تصویر
                                </button>
                            </div>
                        )
                    )}
                />
            </div>
        </FormContainer>
    )
}

export default ImageSection