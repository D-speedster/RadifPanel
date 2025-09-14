import React, { createContext, useContext, useMemo } from 'react'
import type { ThemeConfig } from '@/configs/theme.config'
import { roleThemes, type Role } from './roleThemes'

type ThemeContextValue = {
    theme: ThemeConfig
}

const RoleThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export default function RoleThemeProvider({
    role,
    children,
}: React.PropsWithChildren<{ role: Role }>) {
    const theme = useMemo(() => {
        return roleThemes[role]
    }, [role])

    const value = useMemo(() => ({ theme }), [theme])

    return (
        <RoleThemeContext.Provider value={value}>
            {children}
        </RoleThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(RoleThemeContext)
    if (!ctx) {
        throw new Error('useTheme must be used within RoleThemeProvider')
    }
    return ctx
}