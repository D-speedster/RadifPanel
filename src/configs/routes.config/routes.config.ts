import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, OPERATOR, SELLER, SUPER_ADMIN } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'dashboardHome',
        path: '/dashboard',
        component: lazy(() => import('@/views/dashboards/EcommerceDashboard/')),
        authority: [],
    },
    // دسته بندی ها
    {
        key: 'categories',
        path: '/categories',
        component: lazy(() => import('@/views/concepts/categories')),
        authority: [ADMIN, OPERATOR, SELLER],
    },
    {
        key: 'categoryDetails',
        path: '/categories/:id',
        component: lazy(() => import('@/views/concepts/categories/CategoryDetails')),
        authority: [ADMIN, OPERATOR, SELLER],
    },
    {
        key: 'categoryEdit',
        path: '/categories/:id/edit',
        component: lazy(() => import('@/views/concepts/categories/CategoryForm')),
        authority: [ADMIN, OPERATOR, SELLER],
    },
    {
        key: 'categoryCreate',
        path: '/categories/new',
        component: lazy(() => import('@/views/concepts/categories/CategoryForm')),
        authority: [ADMIN, OPERATOR, SELLER],
    },
    // لیست محصولات
    {
        key: 'productsList',
        path: '/products-list',
        component: lazy(() => import('@/views/concepts/products/ProductList/')),
        authority: [ADMIN, OPERATOR, SELLER],
    },
    {
        key: 'productsCreate',
        path: '/products-Create',
        component: lazy(() => import('@/views/concepts/products/ProductCreate/')),
        authority: [ADMIN, OPERATOR, SELLER],
    },

    // ویرایش محصولات
    {
        key: 'productsEdit',
        path: '/products-list/product/:id/edit',
        component: lazy(() => import('@/views/concepts/products/ProductEdit').then(module => ({ default: module.ProductEdit }))),
        authority: [ADMIN, OPERATOR, SELLER],
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
        authority: [ADMIN, OPERATOR],
    },
    // نمودار فروش اشتراک
    {
        key: 'subscriptionChart',
        path: '/stats/subscription-chart',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [ADMIN, OPERATOR],
    },
    // نمودار بازدید
    {
        key: 'visitChart',
        path: '/stats/visit-chart',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [ADMIN, OPERATOR],
    },
    // لیست کاربران
    {
        key: 'usersList',
        path: '/users-list',
        component: lazy(() => import('@/views/concepts/users/UserList')),
        authority: [ADMIN],
    },
    {
        key: 'newUser',
        path: '/users/newUser',
        component: lazy(() => import('@/views/concepts/users/UserCreate')),
        authority: [ADMIN],
    },
    {
        key: 'userEdit',
        path: '/concepts/users/user-edit/:id',
        component: lazy(() => import('@/views/concepts/users/UserEdit')),
        authority: [ADMIN],
    },
    {
        key: 'sellers',
        path: '/sellers',
        component: lazy(() => import('@/views/concepts/sellers/SellerList')),
        authority: [ADMIN, OPERATOR],
    },
    {
        key: 'sellersEdit',
        path: '/sellers/edit/:id',
        component: lazy(() => import('@/views/concepts/sellers/SellerEdit')),
        authority: [ADMIN, OPERATOR],
    },
    {
        key: 'seller-details',
        path: '/sellers/details/:id',
        component: lazy(
            () => import('@/views/concepts/sellers/SellerDetails/SellerDetails'),
        ),
        authority: [ADMIN, OPERATOR],
    },
    {
        key: 'manageSellers',
        path: '/sellers/management',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [ADMIN],
    },
    // سایت ها
    {
        key: 'websites',
        path: '/websites',
        component: lazy(() => import('@/views/concepts/websites/weblist')),
        authority: [ADMIN, OPERATOR],
    },
    {
        key: 'websiteEdit',
        path: '/websites/:id/edit',
        component: lazy(() => import('@/views/concepts/websites/WebsiteEdit')),
        authority: [ADMIN, OPERATOR],
    },

    // سرویس کرالر (مانیتورینگ)
    {
        key: 'crawlerService',
        path: '/monitoring/crawler-service',
        component: lazy(
            () => import('@/views/concepts/Crawling'),
        ),
        authority: [ADMIN, OPERATOR],
    },
    // تست سلامت (مانیتورینگ)
    {
        key: 'healthTest',
        path: '/monitoring/health-test',
        component: lazy(
            () => import('@/views/concepts/monitoring/HealthTest'),
        ),
        authority: [ADMIN, OPERATOR],
    },
    // تنظیمات کرالر
    {
        key: 'crawlerSettings',
        path: '/settings/crawler',
        component: lazy(
            () => import('@/views/settings/CrawlerSettings'),
        ),
        authority: [ADMIN, OPERATOR],
    },
    // تنظیمات سایت
    {
        key: 'websiteSettings',
        path: '/settings/website',
        component: lazy(
            () => import('@/views/settings/WebsiteSettings'),
        ),
        authority: [SUPER_ADMIN],
    },
    ...othersRoute,
]
