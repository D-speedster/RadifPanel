import Cookies from 'js-cookie'

interface StateStorage {
    getItem: (name: string) => string | null
    setItem: (name: string, value: string) => void
    removeItem: (name: string) => void
}

// Determine cookie security based on environment/host
const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')

const cookiesStorage: StateStorage = {
    getItem: (name) => Cookies.get(name) || null,
    setItem: (name, value) =>
        Cookies.set(name, value, {
            expires: 1, // 1 day
            secure: !isLocalhost,
            sameSite: 'Lax',
            path: '/',
        }),
    removeItem: (name) => Cookies.remove(name, { path: '/' }),
}

export default cookiesStorage
