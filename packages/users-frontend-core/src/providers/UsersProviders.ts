import gql from 'graphql-tag'

import userLoginGraphql from './graphql/userLogin.graphql'
import userFetchGraphql from './graphql/userFetch.graphql'
import userUpdateGraphql from './graphql/userUpdate.graphql'
import userCreateGraphql from './graphql/userCreate.graphql'
import userGetSession from './graphql/userGetSession.graphql'
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
            query: gql`${userFetchGraphql}`,
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
            mutation: gql`${userUpdateGraphql}`,
            variables: {
                id,
                payload: { ...user }
            }
        })
    }

    public static async userCreate(user: {email: string, password: string, role: string, name?: string, surname?: string, enable?: boolean}) {
        return await UsersProviders._gqlc.mutate({
            mutation: gql`${userCreateGraphql}`,
            variables: {
                payload: { ...user }
            }
        })
    }

    public static async userLogin(email: string, password: string) {
        return await UsersProviders._gqlc.query({
            query: gql`${userLoginGraphql}`,
            variables: {
                payload: { email, password }
            }
        })
    }

    public static async userGetSession(): Promise<UserGetSession> {
        return await UsersProviders._gqlc.query({
            query: gql`${userGetSession}`
        })
    }
}