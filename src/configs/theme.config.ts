import { THEME_ENUM } from '@/constants/theme.constant'
import { Direction, Mode, ControlSize, LayoutType } from '@/@types/theme'

export type ThemeConfig = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    controlSize: ControlSize
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
    themeSchema: 'default',
    direction: THEME_ENUM.DIR_RTL, // تغییر از RTL به LTR برای تست
    mode: THEME_ENUM.MODE_LIGHT, // تغییر از LIGHT به DARK برای تست
    panelExpand: true, // تغییر از false به true برای تست
    controlSize: 'lg', // تغییر از md به lg برای تست
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE, // تغییر چیدمان از collapsibleSide به topBarClassic
        sideNavCollapse: true, // تغییر از false به true
    },
}
