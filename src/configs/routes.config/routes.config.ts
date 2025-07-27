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

    {
        key: 'products',
        path: '/productsList',
        component: lazy(() => import('@/views/concepts/products/ProductList/')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'userList',
        path: '/users',
        component: lazy(() => import('@/views/concepts/users/UserList')),
        authority: [],
    },
    {
        key: 'analyticSection',
        path: '/analytic',
        component: lazy(() => import('@/views/dashboards/AnalyticDashboard')),
        authority: [],
    },
    {
        key: 'status-websites',
        path: '/status-websites',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
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

    {
        key: 'reports-crawler',
        path: '/reports/crawler',
        component: lazy(
            () => import('@/views/concepts/Crawling'),
        ),
        authority: [],
    },
    {
        key: 'loginLogoutReport',
        path: '/reports/activity-login',
        component: lazy(
            () => import('@/views/concepts/reports/activity-login'),
        ),
        authority: [],
    },
    {
        key: 'systemErrorReport',
        path: '/reports/system-report',
        component: lazy(
            () => import('@/views/concepts/reports/system-report'),
        ),
        authority: [],
    },
    {
        key: 'crawlerSettings',
        path: '/crawler-setting',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    }, {
        key: 'webServiceSettings',
        path: '/api-setting',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    {
        key: 'adminSettings',
        path: '/admin-setting',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    {
        key: 'productsType',
        path: '/productsType',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    {
        key: 'https://api.radif.org/',
        path: '/https://api.radif.org/',
        component: lazy(
            () => import('@/views/concepts/products/ProductList'),
        ),
        authority: [],
    },
    ...othersRoute,
]
