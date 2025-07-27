import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import { apiGetSeller } from '@/services/SellerService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { Seller } from '../SellerList/types'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import {
    FaXTwitter,
    FaFacebookF,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import moment from 'jalali-moment'

const { TabNav, TabList, TabContent } = Tabs

type SellerInfoFieldProps = {
    title?: string
    value?: string
}

const SellerInfoField = ({ title, value }: SellerInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const ProfileSection = ({ data = {} }: { data: Partial<Seller> }) => {
    const navigate = useNavigate()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = () => {
        setDialogOpen(false)
        navigate('/sellers')
        toast.push(
            <Notification title={'حذف با موفقیت انجام شد'} type="success">
                فروشنده با موفقیت حذف شد
            </Notification>
        )
    }

    const handleSendMessage = () => {
        navigate('/concepts/chat')
    }

    const handleEdit = () => {
        navigate(`/sellers/Edit/${data.id}`)
    }

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="ویرایش فروشنده">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar size={90} shape="circle" src={data.avatar} />
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <SellerInfoField title="ایمیل" value={data.email} />
                    <SellerInfoField
                        title="تلفن"
                        value={data.phone || 'ثبت نشده'}
                    />
                    <SellerInfoField
                        title="نقش"
                        value={data.role || 'تعیین نشده'}
                    />
                    <SellerInfoField
                        title="وضعیت"
                        value={data.status === 'active' ? 'فعال' : data.status === 'inactive' ? 'غیرفعال' : 'در انتظار تایید'}
                    />
                    <SellerInfoField
                        title="تاریخ ثبت نام"
                        value={moment(data.created_at).locale('fa').format('YYYY/MM/DD')}
                    />
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    <Button block variant="solid" onClick={handleSendMessage}>
                        ارسال پیام
                    </Button>
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        onClick={handleDialogOpen}
                    >
                        حذف
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="حذف فروشنده"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        آیا از حذف این فروشنده اطمینان دارید؟ تمامی سوابق مربوط به این
                        فروشنده نیز حذف خواهد شد. این عمل قابل بازگشت نیست.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

const ActivitySection = ({ id }: { id: string }) => {
    return (
        <div className="p-4">
            <div className="text-center p-8">
                <h4 className="mb-2 text-lg font-semibold">تاریخچه فعالیت‌ها</h4>
                <p className="text-gray-500">در حال حاضر فعالیتی برای این فروشنده ثبت نشده است.</p>
            </div>
        </div>
    )
}

const ProductsSection = ({ id }: { id: string }) => {
    return (
        <div className="p-4">
            <div className="text-center p-8">
                <h4 className="mb-2 text-lg font-semibold">محصولات فروشنده</h4>
                <p className="text-gray-500">در حال حاضر محصولی برای این فروشنده ثبت نشده است.</p>
            </div>
        </div>
    )
}

const SellerDetails = () => {
    const { id } = useParams()

    const { data, isLoading, error } = useSWR(
        id ? `/sellers/${id}` : null,
        () => apiGetSeller<Seller, { id: string }>({ id: id as string }),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: true,
            errorRetryCount: 3,
            errorRetryInterval: 2000,
        },
    )

    return (
        <Loading loading={isLoading}>
            {data ? (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="products">
                            <TabList>
                                   <TabNav value="products">اطلاعات پایه</TabNav>
                                <TabNav value="products2">محصولات</TabNav>
                                <TabNav value="activity">احراز هویت</TabNav>
                              <TabNav value="activity3">تنظیمات فروشنده</TabNav>
                             
                            </TabList>
                            <div className="p-4">
                                <TabContent value="products">
                                    <ProductsSection id={id as string} />
                                </TabContent>
                                <TabContent value="activity">
                                    <ActivitySection id={id as string} />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            ) : (
                !isLoading && (
                    <div className="text-center p-8">
                        <h4 className="mb-2 text-lg font-semibold">فروشنده یافت نشد</h4>
                        <p className="text-gray-500">فروشنده با شناسه {id} یافت نشد.</p>
                    </div>
                )
            )}
        </Loading>
    )
}

export default SellerDetails