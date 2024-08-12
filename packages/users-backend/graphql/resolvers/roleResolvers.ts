import AuthenticationContext from "../../context/AuthenticationContext"
import RoleService from "../../services/RoleService"

import {
    ROLE_CREATE,
    ROLE_DELETE,
    ROLE_UPDATE,
    ROLE_READ
} from '../../permissions'

export default {
    Query: {
        roleFetch: async (_, __, { token }) => {
            const user = await AuthenticationContext.rbac(token, [ROLE_READ])
            return RoleService.fetchAll()
        }
    },
    Mutation: {
        roleCreate: async (_, { payload }, { token }) => {
            const user = await AuthenticationContext.rbac(token, [ROLE_CREATE])
            return RoleService.createRole({...payload, createdBy: user._id})
        },

        roleUpdate: async (_, { id, payload }, { token }) => {
            const user = await AuthenticationContext.rbac(token, [ROLE_UPDATE])
            return RoleService.updateRole(id, payload)
        },

        roleDelete: async (_, { id }, { token }) => {
            const user = await AuthenticationContext.rbac(token, [ROLE_DELETE])
            return RoleService.deleteRole(id)
        }
    }
}