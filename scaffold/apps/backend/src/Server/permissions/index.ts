import {
    permissions as userPermissions
} from '@valexpress/users-backend'

export const PERMISSIONS = [
    userPermissions.USER_CREATE,
    userPermissions.USER_READ,
    userPermissions.USER_UPDATE,
    userPermissions.USER_DELETE,

    userPermissions.ROLE_CREATE,
    userPermissions.ROLE_READ,
    userPermissions.ROLE_UPDATE,
    userPermissions.ROLE_DELETE,
    userPermissions.ROLE_ASSIGN,
]