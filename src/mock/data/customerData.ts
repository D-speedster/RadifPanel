import { avatarImg } from './commonData'

export const customersData = [
    {
        id: 1,
        name: 'علی محمدی',
        email: 'ali.mohammadi@example.com',
        phone: '09123456789',
        avatar: avatarImg,
        status: 'active',
        orders: 12,
        total_spent: 2500000,
        created_at: '2023-01-15T10:30:00',
        updated_at: '2023-05-20T14:45:00',
        address: {
            street: 'خیابان ولیعصر',
            city: 'تهران',
            state: 'تهران',
            zip: '1234567890',
            country: 'ایران'
        },
        billing: {
            payment_method: 'کارت بانکی',
            card_type: 'ملی',
            card_last_four: '1234'
        },
        activity: [
            {
                id: 1,
                type: 'order',
                date: '2023-05-15T09:30:00',
                description: 'سفارش جدید ثبت کرد',
                amount: 450000
            },
            {
                id: 2,
                type: 'review',
                date: '2023-05-10T14:20:00',
                description: 'نظر جدید ثبت کرد',
                rating: 4
            },
            {
                id: 3,
                type: 'return',
                date: '2023-04-25T11:45:00',
                description: 'درخواست مرجوعی داد',
                amount: 120000
            }
        ]
    },
    {
        id: 2,
        name: 'مریم حسینی',
        email: 'maryam.hosseini@example.com',
        phone: '09198765432',
        avatar: avatarImg,
        status: 'active',
        orders: 8,
        total_spent: 1800000,
        created_at: '2023-02-20T09:15:00',
        updated_at: '2023-05-18T16:30:00',
        address: {
            street: 'خیابان شریعتی',
            city: 'تهران',
            state: 'تهران',
            zip: '1987654321',
            country: 'ایران'
        },
        billing: {
            payment_method: 'کارت بانکی',
            card_type: 'صادرات',
            card_last_four: '5678'
        },
        activity: [
            {
                id: 1,
                type: 'order',
                date: '2023-05-18T10:15:00',
                description: 'سفارش جدید ثبت کرد',
                amount: 320000
            },
            {
                id: 2,
                type: 'wishlist',
                date: '2023-05-05T13:40:00',
                description: 'محصول به لیست علاقه‌مندی‌ها اضافه کرد'
            }
        ]
    },
    {
        id: 3,
        name: 'رضا کریمی',
        email: 'reza.karimi@example.com',
        phone: '09371234567',
        avatar: avatarImg,
        status: 'inactive',
        orders: 3,
        total_spent: 750000,
        created_at: '2023-03-10T14:20:00',
        updated_at: '2023-04-25T11:10:00',
        address: {
            street: 'خیابان انقلاب',
            city: 'تهران',
            state: 'تهران',
            zip: '1357924680',
            country: 'ایران'
        },
        billing: {
            payment_method: 'کارت بانکی',
            card_type: 'پارسیان',
            card_last_four: '9012'
        },
        activity: [
            {
                id: 1,
                type: 'order',
                date: '2023-04-20T15:30:00',
                description: 'سفارش جدید ثبت کرد',
                amount: 280000
            }
        ]
    },
    {
        id: 4,
        name: 'سارا احمدی',
        email: 'sara.ahmadi@example.com',
        phone: '09351234567',
        avatar: avatarImg,
        status: 'active',
        orders: 15,
        total_spent: 3200000,
        created_at: '2022-11-05T08:45:00',
        updated_at: '2023-05-22T09:30:00',
        address: {
            street: 'خیابان فرشته',
            city: 'تهران',
            state: 'تهران',
            zip: '2468013579',
            country: 'ایران'
        },
        billing: {
            payment_method: 'کارت بانکی',
            card_type: 'ملت',
            card_last_four: '3456'
        },
        activity: [
            {
                id: 1,
                type: 'order',
                date: '2023-05-22T09:30:00',
                description: 'سفارش جدید ثبت کرد',
                amount: 520000
            },
            {
                id: 2,
                type: 'review',
                date: '2023-05-15T16:20:00',
                description: 'نظر جدید ثبت کرد',
                rating: 5
            },
            {
                id: 3,
                type: 'order',
                date: '2023-05-01T11:15:00',
                description: 'سفارش جدید ثبت کرد',
                amount: 350000
            }
        ]
    }
]