import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { OPERATOR } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'dashboardHome',
        path: '/home',
        component: lazy(() => import('@/views/dashboards/EcommerceDashboard/')),
        authority: [],
    },

    // وبسایت ها
    {
        key: 'websites',
        path: '/websites',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [],
    },
    // دسته بندی ها
    {
        key: 'categories',
        path: '/categories',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [],
    },
    // لیست محصولات
    {
        key: 'productsList',
        path: '/products-list',
        component: lazy(() => import('@/views/concepts/products/ProductList/')),
        authority: [],
    },
    // دسته بندی محصولات
    {
        key: 'productsCategory',
        path: '/products-category',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [],
    },
    // نمودار ثبت نام
    {
        key: 'registrationChart',
        path: '/stats/registration-chart',
        component: lazy(() => import('@/views/dashboards/AnalyticDashboard')),
        authority: [],
    },
    // نمودار فروش اشتراک
    {
        key: 'subscriptionChart',
        path: '/stats/subscription-chart',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [],
    },
    // نمودار بازدید
    {
        key: 'visitChart',
        path: '/stats/visit-chart',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [],
    },
    // لیست کاربران
    {
        key: 'usersList',
        path: '/users-list',
        component: lazy(() => import('@/views/concepts/users/UserList')),
        authority: [],
    },
    {
        key: 'newUser',
        path: '/newUser',
        component: lazy(() => import('@/views/concepts/users/UserList')),
        authority: [],
    },
    {
        key: 'sellers',
        path: '/sellers',
        component: lazy(() => import('@/views/concepts/sellers/SellerList')),
        authority: [],
    },
    {
        key: 'sellersEdit',
        path: '/sellers/Edit',
        component: lazy(() => import('@/views/concepts/customers/CustomerEdit')),
        authority: [],
    },
    {
        key: 'seller-details',
        path: '/sellers/details/:id',
        component: lazy(
            () => import('@/views/concepts/sellers/SellerDetails/SellerDetails'),
        ),
        authority: [],
    },
    {
        key: 'manageSellers',
        path: '/sellers/management',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },

    // سرویس کرالر (مانیتورینگ)
    {
        key: 'crawlerService',
        path: '/monitoring/crawler-service',
        component: lazy(
            () => import('@/views/concepts/Crawling'),
        ),
        authority: [],
    },
    // تست سلامت (مانیتورینگ)
    {
        key: 'healthTest',
        path: '/monitoring/health-test',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    // تنظیمات کرالر
    {
        key: 'crawlerSettings',
        path: '/settings/crawler',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    // تنظیمات وبسایت
    {
        key: 'websiteSettings',
        path: '/settings/website',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...othersRoute,
]
