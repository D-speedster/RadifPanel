import { THEME_ENUM } from '@/constants/theme.constant'
import type { ThemeConfig } from '@/configs/theme.config'

export type Role = 'user' | 'admin' | 'super_admin' | 'operator' | 'seller'

// Role-based theme configurations mapped to requested display settings
export const roleThemes: Record<Role, ThemeConfig> = {
    super_admin: {
        themeSchema: 'purple',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: false,
        controlSize: 'md',
        layout: {
            type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
            sideNavCollapse: false,
        },
    },
    admin: {
        themeSchema: 'purple',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: false,
        controlSize: 'md',
        layout: {
            type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
            sideNavCollapse: false,
        },
    },
    seller: {
        themeSchema: 'dark',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: false,
        controlSize: 'md',
        layout: {
            type: THEME_ENUM.LAYOUT_CONTENT_OVERLAY,
            sideNavCollapse: false,
        },
    },
    operator: {
        themeSchema: 'dark',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: false,
        controlSize: 'md',
        layout: {
            type: THEME_ENUM.LAYOUT_FRAMELESS_SIDE,
            sideNavCollapse: false,
        },
    },
    user: {
        themeSchema: 'dark',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: false,
        controlSize: 'md',
        layout: {
            type: THEME_ENUM.LAYOUT_TOP_BAR_CLASSIC,
            sideNavCollapse: false,
        },
    },
}