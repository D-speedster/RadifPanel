import { THEME_ENUM } from '@/constants/theme.constant'
import type { ThemeConfig } from '@/configs/theme.config'

export type Role = 'user' | 'admin' | 'superadmin'

// Map requested layouts to available LayoutType constants in this project.
// "modern" layout is mapped to framelessSide for SuperAdmin.
export const roleThemes: Record<Role, ThemeConfig> = {
    user: {
        themeSchema: 'default',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: true,
        controlSize: 'md',
        layout: {
            type: THEME_ENUM.LAYOUT_TOP_BAR_CLASSIC,
            sideNavCollapse: false,
        },
    },
    admin: {
        themeSchema: 'default',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_DARK,
        panelExpand: true,
        controlSize: 'lg',
        layout: {
            type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
            sideNavCollapse: true,
        },
    },
    superadmin: {
        themeSchema: 'default',
        direction: THEME_ENUM.DIR_RTL,
        mode: THEME_ENUM.MODE_LIGHT,
        panelExpand: true,
        controlSize: 'lg',
        layout: {
            // Requested: modern -> Mapped to framelessSide
            type: THEME_ENUM.LAYOUT_FRAMELESS_SIDE,
            sideNavCollapse: false,
        },
    },
}