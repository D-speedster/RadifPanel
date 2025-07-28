import { signInWithFirebaseGoogle } from './firebase/FirebaseGoogleAuth'
import { signInWithFirebaseGithub } from './firebase/FirebaseGithubAuth'
import FirebaseApp from './firebase/FirebaseApp'

export async function apiGoogleOauthSignIn() {
    if (!FirebaseApp) {
        throw new Error('Firebase is not configured. OAuth sign-in is not available.')
    }
    return await signInWithFirebaseGoogle()
}

export async function apiGithubOauthSignIn() {
    if (!FirebaseApp) {
        throw new Error('Firebase is not configured. OAuth sign-in is not available.')
    }
    return await signInWithFirebaseGithub()
}
