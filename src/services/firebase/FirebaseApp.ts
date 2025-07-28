import { initializeApp } from 'firebase/app'
import firebaseConfig from '@/configs/firebase.config'

// Check if Firebase configuration is valid
const isFirebaseConfigValid = () => {
    return firebaseConfig.apiKey && 
           firebaseConfig.apiKey !== '*****************' && 
           firebaseConfig.apiKey !== 'dummy-api-key' &&
           firebaseConfig.projectId && 
           firebaseConfig.projectId !== '*****************' &&
           firebaseConfig.projectId !== 'dummy-project' &&
           !firebaseConfig.apiKey.startsWith('dummy-') &&
           !firebaseConfig.projectId.startsWith('dummy-')
}

// Only initialize Firebase if configuration is valid
let FirebaseApp: any = null

if (isFirebaseConfigValid()) {
    try {
        FirebaseApp = initializeApp(firebaseConfig)
    } catch (error) {
        console.warn('Firebase initialization failed:', error)
        FirebaseApp = null
    }
} else {
    console.warn('Firebase configuration is invalid or missing. Firebase features will be disabled.')
}

export default FirebaseApp
