import ConfigProvider from '@/components/ui/ConfigProvider'
import useDarkMode from '@/utils/hooks/useDarkMode'
import useThemeSchema from '@/utils/hooks/useThemeSchema'
import useLocale from '@/utils/hooks/useLocale'
import useDirection from '@/utils/hooks/useDirection'
import type { CommonProps } from '@/@types/common'
import { useTheme } from '@/theme/ThemeProvider'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

const Theme = (props: CommonProps) => {
    useThemeSchema()
    useDarkMode()
    useDirection()

    const { locale } = useLocale()
    const { theme } = useTheme()

    // Sync role-based theme into existing theme store so global hooks react correctly
    const setSchema = useThemeStore((s) => s.setSchema)
    const setMode = useThemeStore((s) => s.setMode)
    const setDirectionStore = useThemeStore((s) => s.setDirection)
    const setPanelExpand = useThemeStore((s) => s.setPanelExpand)
    const setLayout = useThemeStore((s) => s.setLayout)
    const setSideNavCollapse = useThemeStore((s) => s.setSideNavCollapse)

    useEffect(() => {
        if (!theme) return
        setSchema(theme.themeSchema)
        setMode(theme.mode)
        setDirectionStore(theme.direction)
        setPanelExpand(theme.panelExpand)
        setLayout(theme.layout.type)
        setSideNavCollapse(theme.layout.sideNavCollapse)
    }, [theme, setSchema, setMode, setDirectionStore, setPanelExpand, setLayout, setSideNavCollapse])

    return (
        <ConfigProvider
            value={{
                locale: locale,
                ...theme,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme
