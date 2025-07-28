import { getAuth } from 'firebase/auth'
import FirebaseApp from './FirebaseApp'

// Only initialize Firebase Auth if FirebaseApp is available
let FirebaseAuth: any = null

if (FirebaseApp) {
    try {
        FirebaseAuth = getAuth(FirebaseApp)
    } catch (error) {
        console.warn('Firebase Auth initialization failed:', error)
        FirebaseAuth = null
    }
} else {
    console.warn('Firebase Auth is disabled due to missing Firebase configuration.')
}

export default FirebaseAuth
