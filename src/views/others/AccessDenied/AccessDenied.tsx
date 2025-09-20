import Container from '@/components/shared/Container'
import SpaceSignBoard from '@/assets/svg/SpaceSignBoard'

const AccessDenied = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <SpaceSignBoard height={240} width={240} />
                <div className="mt-8">
                    <h3 className="mb-2 text-2xl font-bold">Access Denied!</h3>
                    <p className="text-base text-gray-600 mb-6">
                        You have no permission to visit this page
                    </p>
                    <h4 className="mb-2 text-xl font-semibold">دسترسی غیرمجاز</h4>
                    <p className="text-gray-600 mb-8">
                        شما مجوز مشاهده این صفحه را ندارید. در صورت نیاز با مدیر سیستم تماس بگیرید.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                        بازگشت به داشبورد
                    </a>
                </div>
            </div>
        </Container>
    )
}

export default AccessDenied
