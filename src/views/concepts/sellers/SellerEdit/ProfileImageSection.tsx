import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { Controller } from 'react-hook-form'
import { HiOutlineUser } from 'react-icons/hi'
import { TbTrash } from 'react-icons/tb'
import type { FormSectionBaseProps } from './types'

type ProfileImageSectionProps = FormSectionBaseProps

const ProfileImageSection = ({ control }: ProfileImageSectionProps) => {
    const [avatarImg, setAvatarImg] = useState<string>('')

    const onSetFormFile = (
        form: {
            avatar: string
        },
        field: {
            onChange: (value: string) => void
            value: string
        },
        file: File[],
    ) => {
        if (file.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                const result = reader.result as string
                setAvatarImg(result)
                field.onChange(result)
            }
            reader.readAsDataURL(file[0])
        }
    }

    const onDeleteImg = (
        field: {
            onChange: (value: string) => void
            value: string
        },
    ) => {
        setAvatarImg('')
        field.onChange('')
    }

    return (
        <Card>
            <h5 className="mb-4">تصویر پروفایل</h5>
            <Controller
                name="avatar"
                control={control}
                render={({ field, form }) => {
                    const avatarProps = field.value
                        ? { src: field.value }
                        : { icon: <HiOutlineUser /> }
                    return (
                        <div className="flex justify-center">
                            <div className="flex flex-col items-center">
                                <Avatar
                                    className="mb-4"
                                    size={100}
                                    shape="circle"
                                    {...avatarProps}
                                />
                                <Upload
                                    draggable
                                    className="min-h-fit"
                                    showList={false}
                                    uploadLimit={1}
                                    onChange={(files) =>
                                        onSetFormFile(form, field, files)
                                    }
                                >
                                    <div className="text-center cursor-pointer">
                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            آپلود تصویر
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-600">
                                            فایل را اینجا بکشید یا کلیک کنید
                                        </p>
                                    </div>
                                </Upload>
                                {field.value && (
                                    <Button
                                        className="mt-4"
                                        variant="plain"
                                        size="sm"
                                        icon={<TbTrash />}
                                        type="button"
                                        onClick={() => onDeleteImg(field)}
                                    >
                                        حذف تصویر
                                    </Button>
                                )}
                            </div>
                        </div>
                    )
                }}
            />
        </Card>
    )
}

export default ProfileImageSection