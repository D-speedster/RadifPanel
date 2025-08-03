import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN, OPERATOR, SELLER, USER } from '@/constants/roles.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'dashboardGroup',
        path: '',
        title: 'پنل ادمین',
        translateKey: 'nav.dashboardGroup.title',
        icon: 'groupMenu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN],
        subMenu: [
            {
                key: 'dashboardHome',
                path: '/Home',
                title: 'داشبورد',
                translateKey: 'nav.dashboardGroup.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
        ],
    },
    {
        key: 'websites',
        path: '/websites',
        title: 'وبسایت ها',
        translateKey: 'nav.websites.title',
        icon: 'seller',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'sellers',
        path: '/sellers',
        title: ' فروشندگان',
        translateKey: 'nav.sellers.title',
        icon: 'seller',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'categories',
        path: '/categories',
        title: 'دسته بندی ها',
        translateKey: 'nav.categories.title',
        icon: 'seller',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    {
        key: 'productsMenu',
        path: '',
        title: 'محصولات ',
        translateKey: 'nav.products.title',
        icon: 'product',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'productsList',
                path: '/products-list',
                title: 'لیست محصولات',
                translateKey: 'nav.products.list',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'productsCategory',
                path: '/products-category',
                title: 'دسته بندی',
                translateKey: 'nav.products.category',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },

        ],
    },


    {
        key: 'siteStats',
        path: '',
        title: 'آمار سایت',
        translateKey: 'nav.siteStats.title',
        icon: 'state',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'registrationChart',
                path: '/stats/registration-chart',
                title: 'نمودار ثبت نام',
                translateKey: 'nav.siteStats.registrationChart',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'subscriptionChart',
                path: '/stats/subscription-chart',
                title: 'نمودار فروش اشتراک',
                translateKey: 'nav.siteStats.subscriptionChart',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'visitChart',
                path: '/stats/visit-chart',
                title: 'نمودار بازدید',
                translateKey: 'nav.siteStats.visitChart',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'monitoring',
        path: '',
        title: 'مانیتورینگ',
        translateKey: 'nav.monitoring.title',
        icon: 'report',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'crawlerService',
                path: '/monitoring/crawler-service',
                title: 'سرویس کرالر',
                translateKey: 'nav.monitoring.crawlerService',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'healthTest',
                path: '/monitoring/health-test',
                title: 'تست سلامت ',
                translateKey: 'nav.monitoring.healthTest',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }

        ],
    },
    {
        key: 'users',
        path: '',
        title: 'کاربران',
        translateKey: 'nav.users.title',
        icon: 'users',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'usersList',
                path: '/users-list',
                title: 'لیست کاربران',
                translateKey: 'nav.users.usersList',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },

        ],
    },
    {
        key: 'settings',
        path: '',
        title: 'تنظیمات',
        translateKey: 'nav.settings.title',
        icon: 'setting',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'crawlerSettings',
                path: '/settings/crawler',
                title: 'تنظیمات کرالر',
                translateKey: 'nav.settings.crawler',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
           
            {
                key: 'websiteSettings',
                path: '/settings/website',
                title: 'تنظیمات وبسایت',
                translateKey: 'nav.settings.website',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
]


export default navigationConfig
