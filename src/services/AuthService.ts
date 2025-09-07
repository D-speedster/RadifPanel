import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import appConfig from '@/configs/app.config'
import cookiesStorage from '@/utils/cookiesStorage'
import type { SignInCredential, SignInResponse, User } from '@/@types/auth'

const AuthService = {
    signIn: async (values: SignInCredential) => {
        // Create FormData object for the API that only accepts form data
        const formData = new FormData();
        // The API expects 'email' instead of 'userName'
        formData.append('email', values.userName);
        formData.append('password', values.password);
        
        const response = await ApiService.fetchDataWithAxios({
            url: endpointConfig.signIn,
            method: 'post',
            data: formData,
        });

        // Transform API response to match the expected SignInResponse structure
        if (response && response.user) {
            const transformedResponse: SignInResponse = {
                token: response.token,
                user: {
                    userId: String(response.user.id),
                    userName: response.user.name,
                    email: response.user.email,
                    // Convert role to array of authorities
                    authority: [response.user.role],
                    // If avatar is missing, provide a default or empty string
                    avatar: response.user.avatar || ''
                }
            };
            return transformedResponse;
        }
        
        return response as SignInResponse;
    },

    signOut: async () => {
        return ApiService.fetchDataWithAxios({
            url: endpointConfig.signOut,
            method: 'post',
        })
    },

    getUser: async () => {
        return ApiService.fetchDataWithAxios<User>({
            url: '/user/profile',
            method: 'get',
        })
    },

    forgotPassword: async (data: { email: string }) => {
        return ApiService.fetchDataWithAxios({
            url: endpointConfig.forgotPassword,
            method: 'post',
            data,
        })
    },

    resetPassword: async (data: { token: string; password: string; password_confirmation: string }) => {
        return ApiService.fetchDataWithAxios({
            url: endpointConfig.resetPassword,
            method: 'post',
            data,
        })
    },

    setToken: (token: string) => {
        const storage = appConfig.accessTokenPersistStrategy
        if (storage === 'localStorage') {
            localStorage.setItem(TOKEN_NAME_IN_STORAGE, token)
        }
        if (storage === 'sessionStorage') {
            sessionStorage.setItem(TOKEN_NAME_IN_STORAGE, token)
        }
        if (storage === 'cookies') {
            cookiesStorage.setItem(TOKEN_NAME_IN_STORAGE, token)
        }
    },

    getToken: () => {
        const storage = appConfig.accessTokenPersistStrategy
        if (storage === 'localStorage') {
            return localStorage.getItem(TOKEN_NAME_IN_STORAGE)
        }
        if (storage === 'sessionStorage') {
            return sessionStorage.getItem(TOKEN_NAME_IN_STORAGE)
        }
        if (storage === 'cookies') {
            return cookiesStorage.getItem(TOKEN_NAME_IN_STORAGE)
        }
        return null
    },

    removeToken: () => {
        const storage = appConfig.accessTokenPersistStrategy
        if (storage === 'localStorage') {
            localStorage.removeItem(TOKEN_NAME_IN_STORAGE)
        }
        if (storage === 'sessionStorage') {
            sessionStorage.removeItem(TOKEN_NAME_IN_STORAGE)
        }
        if (storage === 'cookies') {
            cookiesStorage.removeItem(TOKEN_NAME_IN_STORAGE)
        }
    },
}

export const apiForgotPassword = AuthService.forgotPassword
export const apiResetPassword = AuthService.resetPassword

export default AuthService
