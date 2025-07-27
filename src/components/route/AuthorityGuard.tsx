import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import useAuthority from '@/utils/hooks/useAuthority'

type AuthorityGuardProps = PropsWithChildren<{
    userAuthority?: string[]
    authority?: string[]
}>

const AuthorityGuard = (props: AuthorityGuardProps) => {
    const { userAuthority = [], authority = [], children } = props

    // Use the useAuthority hook to check if the user has the required authority
    const roleMatched = useAuthority(userAuthority, authority)

    return <>{roleMatched ? children : <Navigate to="/access-denied" />}</>
}

export default AuthorityGuard
