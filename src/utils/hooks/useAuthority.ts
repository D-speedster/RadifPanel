import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import { ADMIN, OPERATOR, SELLER, USER, SUPER_ADMIN } from '@/constants/roles.constant'

function useAuthority(
    userAuthority: string[] = [],
    authority: string[] = [],
    emptyCheck = false,
) {
    const roleMatched = useMemo(() => {
        // Super Admin has access to everything
        if (userAuthority.includes(SUPER_ADMIN)) {
            return true
        }
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

    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck
    }

    return roleMatched
}

export default useAuthority
