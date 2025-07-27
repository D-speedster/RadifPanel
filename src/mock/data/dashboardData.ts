export const ecommerceDashboardData = {
    statisticData: [
        {
            key: 'sales',
            label: 'فروش',
            value: 2500000,
            growShrink: 17.2,
        },
        {
            key: 'orders',
            label: 'سفارشات',
            value: 356,
            growShrink: 5.2,
        },
        {
            key: 'customers',
            label: 'مشتریان',
            value: 1250,
            growShrink: 3.1,
        },
    ],
    salesTarget: {
        target: 10000000,
        current: 7500000,
    },
    topProduct: [
        {
            name: 'لپ تاپ ایسوس',
            sales: 5230000,
        },
        {
            name: 'گوشی سامسونگ',
            sales: 4320000,
        },
        {
            name: 'هدفون بلوتوث',
            sales: 3200000,
        },
        {
            name: 'ساعت هوشمند',
            sales: 2800000,
        },
        {
            name: 'تبلت اپل',
            sales: 2500000,
        },
    ],
    customerDemographic: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        data: [20, 40, 15, 15, 8, 2],
    },
    revenueByChannel: [
        {
            name: 'فروشگاه آنلاین',
            value: 45,
        },
        {
            name: 'فروشگاه فیزیکی',
            value: 30,
        },
        {
            name: 'اپلیکیشن موبایل',
            value: 25,
        },
    ],
    recentOrders: [
        {
            id: 'ORD-1001',
            date: '2023-06-12T09:30:00',
            customer: 'علی محمدی',
            status: 'تکمیل شده',
            paymentMethod: 'کارت بانکی',
            amount: 1250000,
        },
        {
            id: 'ORD-1002',
            date: '2023-06-11T14:20:00',
            customer: 'سارا احمدی',
            status: 'در حال پردازش',
            paymentMethod: 'کیف پول',
            amount: 850000,
        },
        {
            id: 'ORD-1003',
            date: '2023-06-11T10:15:00',
            customer: 'محمد رضایی',
            status: 'تکمیل شده',
            paymentMethod: 'کارت بانکی',
            amount: 2100000,
        },
        {
            id: 'ORD-1004',
            date: '2023-06-10T16:40:00',
            customer: 'فاطمه حسینی',
            status: 'ارسال شده',
            paymentMethod: 'کارت بانکی',
            amount: 1450000,
        },
        {
            id: 'ORD-1005',
            date: '2023-06-10T11:25:00',
            customer: 'رضا کریمی',
            status: 'تکمیل شده',
            paymentMethod: 'کیف پول',
            amount: 950000,
        },
    ],
}