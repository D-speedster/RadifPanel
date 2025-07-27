import { useMemo } from 'react'
import { useSessionUser } from '@/store/authStore'
import { ADMIN, OPERATOR, SELLER, USER } from '@/constants/roles.constant'
import type { CommonProps } from '@/@types/common'

interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
}

const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority = [], authority = [], children } = props

    const roleMatched = useMemo(() => {
        // Admin has access to everything
        if (userAuthority.includes(ADMIN)) {
            return true
        }
        
        // Operator has access to most admin features, except user management
        if (userAuthority.includes(OPERATOR)) {
            // If the permitted role is specifically for user management, deny access
            if (authority.includes('user-management')) {
                return false
            }
            // Otherwise, allow access to most admin features
            return true
        }
        
        // Seller has limited access to content/product management
        if (userAuthority.includes(SELLER)) {
            // Allow access only to content/product management
            return authority.some(role => 
                role === SELLER || 
                role === 'content-management' || 
                role === 'product-management'
            )
        }
        
        // User has basic read-only access to public pages
        if (userAuthority.includes(USER)) {
            return authority.some(role => 
                role === USER || 
                role === 'public'
            )
        }
        
        // Fallback to the original check for any other cases
        return authority.some((role) => userAuthority.includes(role))
    }, [authority, userAuthority])

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
