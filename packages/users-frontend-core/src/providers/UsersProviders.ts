import userLoginGraphql from './graphql/userLoginGraphql'
import userFetchGraphql from './graphql/userFetchGraphql'
import userUpdateGraphql from './graphql/userUpdateGraphql'
import userCreateGraphql from './graphql/userCreateGraphql'
import userGetSession from './graphql/userGetSessionGraphql'
import { UserGetSession } from './schemas/User.schema'

export default class UsersProviders {

    private static _gqlc: any = null

    public static setGqlc(gqlc: any) {
        UsersProviders._gqlc = gqlc
    }

    public static async userFetch(
        filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean},
        sortBy: string, sortDesc: boolean, limit: number = 10, page: number = 1
    ){
        return await UsersProviders._gqlc.query({
            query: userFetchGraphql,
            variables: {
                filters,
                sortBy,
                sortDesc,
                limit,
                page
            },
            fetchPolicy: 'network-only'
        })
    }

    public static async userUpdate(id: string, user: {email?: string, password?: string, role?: string, name?: string, surname?: string, enable?: boolean}) {
        return await UsersProviders._gqlc.mutate({
            mutation: userUpdateGraphql,
            variables: {
                id,
                payload: { ...user }
            }
        })
    }

    public static async userCreate(user: {email: string, password: string, role: string, name?: string, surname?: string, enable?: boolean}) {
        return await UsersProviders._gqlc.mutate({
            mutation: userCreateGraphql,
            variables: {
                payload: { ...user }
            }
        })
    }

    public static async userLogin(email: string, password: string) {
        return await UsersProviders._gqlc.query({
            query: userLoginGraphql,
            variables: {
                payload: { email, password }
            }
        })
    }

    public static async userGetSession(): Promise<UserGetSession> {
        return await UsersProviders._gqlc.query({
            query: userGetSession
        })
    }
}