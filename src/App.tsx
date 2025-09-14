import { BrowserRouter } from 'react-router'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import RoleThemeProvider from '@/theme/ThemeProvider'

// Mock API disabled

function App() {
    // Example: role retrieved from API/JWT
    const role: 'user' | 'admin' | 'superadmin' = 'admin'

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
