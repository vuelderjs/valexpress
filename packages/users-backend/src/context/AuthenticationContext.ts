import { JwtService, UnauthenticatedError, UnauthorizedError } from "@valexpress/common-backend/src"
import UserService from "../services/UserService"
import { IUser } from "../models/interfaces/IUser"

export default class AuthenticationContext {
    public static async rbac(token: string, permission?: string[]) : Promise<IUser> {
        if(!token) throw UnauthenticatedError

        const userPayload = JwtService.verifyToken(token)

        if(!userPayload) throw UnauthenticatedError

        const user = await UserService.findUserById(userPayload._id)

        if(!user) throw UnauthenticatedError

        if(!permission) return user
        
        const hasPermission = user?.role?.permissions?.some((_permission) => permission.includes(_permission.name))

        if(!hasPermission) {
            throw UnauthorizedError
        }

        return user
    }

    public static async hasPermissions(user: IUser, permission: string[]) : Promise<IUser> {
        if(!user) throw UnauthenticatedError

        if(!permission) throw UnauthorizedError

        const hasPermission = user?.role?.permissions?.some((_permission) => permission.includes(_permission.name))

        if(!hasPermission) throw UnauthorizedError

        return user
    }

    public static async hasPermissionsBoolean(user: IUser, permission: string[]) : Promise<boolean> {
        if(!user) return false

        if(!permission) return false

        const hasPermission = user?.role?.permissions?.some((_permission) => permission.includes(_permission.name))

        if(!hasPermission) return false

        return true
    }
    
    public static async getAllPermissions(user: IUser) : Promise<string[]> {
        if(!user) throw UnauthenticatedError

        return user?.role?.permissions?.map((_permission) => _permission.name) || []
    }
}