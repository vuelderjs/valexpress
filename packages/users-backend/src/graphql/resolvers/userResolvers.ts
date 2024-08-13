import AuthenticationContext from "../../context/AuthenticationContext"
import UserService from "../../services/UserService"

import {
    ROLE_ASSIGN,
    USER_CREATE,
    USER_READ,
    USER_UPDATE
} from '../../permissions'

export default {
    Query: {
        userLogin: (_, { payload }, { req }) => {
            return UserService.login(payload.email, payload.password)
        },

        userFetch: async (_, { filters, sortBy, sortDesc, limit, page }, { token }) => {
            await AuthenticationContext.rbac(token, [USER_READ])
            return await UserService.paginateUsersByFilters(filters, sortBy, sortDesc, limit, page)
        },

        userGetSession: async (_, __, { token }) => {
            await AuthenticationContext.rbac(token)
            return UserService.userGetSession(token)
        }
    },
    Mutation: {
        userCreate: async (_, { payload }, { token }) => {
            const user = await AuthenticationContext.rbac(token, [USER_CREATE])
            return UserService.createUser({
                createdBy: user._id,
                email: payload.email,
                password: payload.password,
                role: payload.role
            })
        },

        userUpdate: async (_, { id, payload }, { token }) => {
            const user = await AuthenticationContext.rbac(token)
            if(payload.enable == false && user._id == id){
                throw new Error('Cannot disable yourself')
            }
            if(payload.password){
                if(user._id != id) throw new Error('Unauthorized')
            }
            if(user._id != id) await AuthenticationContext.hasPermissions(user, [USER_UPDATE])
            if(payload.role){
                await AuthenticationContext.hasPermissions(user, [ROLE_ASSIGN])
            }
            return UserService.updateUser(id, payload)
        }
    }
}