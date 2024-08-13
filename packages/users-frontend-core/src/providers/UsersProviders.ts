import userLoginGraphql from './graphql/userLoginGraphql'
import userFetchGraphql from './graphql/userFetchGraphql'
import userUpdateGraphql from './graphql/userUpdateGraphql'
import userCreateGraphql from './graphql/userCreateGraphql'
import userGetSession from './graphql/userGetSessionGraphql'
import { UserGetSession } from './schemas/User.schema'

class UsersProviders {

    public gqlc: any

    constructor(){
        this.gqlc = null
    }

    public setGqlc(gqlc: any) {
        this.gqlc = gqlc
    }

    public async userFetch(
        filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean},
        sortBy: string, sortDesc: boolean, limit: number = 10, page: number = 1
    ){
        return await this.gqlc.query({
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

    public async userUpdate(id: string, user: {email?: string, password?: string, role?: string, name?: string, surname?: string, enable?: boolean}) {
        return await this.gqlc.mutate({
            mutation: userUpdateGraphql,
            variables: {
                id,
                payload: { ...user }
            }
        })
    }

    public async userCreate(user: {email: string, password: string, role: string, name?: string, surname?: string, enable?: boolean}) {
        return await this.gqlc.mutate({
            mutation: userCreateGraphql,
            variables: {
                payload: { ...user }
            }
        })
    }

    public async userLogin(email: string, password: string) {
        return await this.gqlc.query({
            query: userLoginGraphql,
            variables: {
                payload: { email, password }
            }
        })
    }

    public async userGetSession(): Promise<UserGetSession> {
        return await this.gqlc.query({
            query: userGetSession
        })
    }
}

const usersProviders = new UsersProviders()
export default usersProviders