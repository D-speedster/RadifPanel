import { BrowserRouter } from 'react-router'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import RoleThemeProvider from '@/theme/ThemeProvider'
import { useSessionUser } from '@/store/authStore'
import { ADMIN, OPERATOR, SELLER, USER, SUPER_ADMIN } from '@/constants/roles.constant'

// Mock API disabled

function App() {
    // Determine role from authenticated user's authority
    const authority = useSessionUser((s) => s.user.authority || [])
    const role = authority.includes(SUPER_ADMIN)
        ? 'super_admin'
        : authority.includes(ADMIN)
        ? 'admin'
        : authority.includes(OPERATOR)
        ? 'operator'
        : authority.includes(SELLER)
        ? 'seller'
        : 'user'

    return (
        <RoleThemeProvider role={role}>
            <Theme>
                <BrowserRouter>
                    <AuthProvider>
                        <Layout>
                            <Views />
                        </Layout>
                    </AuthProvider>
                </BrowserRouter>
            </Theme>
        </RoleThemeProvider>
    )
}

export default App
