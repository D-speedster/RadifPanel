import { getFirestore } from 'firebase/firestore'
import FirebaseApp from './FirebaseApp'

// Only initialize Firestore if FirebaseApp is available
let FirebaseDB: any = null

if (FirebaseApp) {
    try {
        FirebaseDB = getFirestore(FirebaseApp)
    } catch (error) {
        console.warn('Firestore initialization failed:', error)
        FirebaseDB = null
    }
} else {
    console.warn('Firestore is disabled due to missing Firebase configuration.')
}

export default FirebaseDB
