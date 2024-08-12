import AuthenticationContext from '../../context/AuthenticationContext'
import PermissionsService from '../../services/PermissionsService';
import {
    ROLE_READ
} from '../../permissions'

export default {
    Query: {
        permissionsFetch: async (_, __, { token }) => {
            const user = await AuthenticationContext.rbac(token, [ROLE_READ])
            return await PermissionsService.fetchPermissions()
        }
    }
}