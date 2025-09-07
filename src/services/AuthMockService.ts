// Mock service for authentication when API is not available
import type { SignInCredential, SignInResponse, User } from '@/@types/auth'

// Mock user data
const mockUser: User = {
    userId: '1',
    userName: 'admin',
    email: 'admin@radif.org',
    authority: ['admin'],
    avatar: ''
}

const AuthMockService = {
    signIn: async (values: SignInCredential): Promise<SignInResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simple mock authentication - accept any credentials
        // In a real scenario, you might want to check specific credentials
        if (values.userName && values.password) {
            return {
                token: 'mock-jwt-token-' + Date.now(),
                user: mockUser
            }
        }
        
        throw new Error('نام کاربری یا رمز عبور اشتباه است')
    },

    signOut: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return { message: 'خروج موفقیت‌آمیز' }
    },

    getUser: async (): Promise<User> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return mockUser
    },

    forgotPassword: async (data: { email: string }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        return { message: 'ایمیل بازیابی رمز عبور ارسال شد' }
    },

    resetPassword: async (data: { token: string; password: string; password_confirmation: string }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        return { message: 'رمز عبور با موفقیت تغییر کرد' }
    }
}

export default AuthMockService