import userLoginGraphql from './graphql/userLoginGraphql'
import userFetchGraphql from './graphql/userFetchGraphql'
import userUpdateGraphql from './graphql/userUpdateGraphql'
import userCreateGraphql from './graphql/userCreateGraphql'
import userGetSession from './graphql/userGetSessionGraphql'
import { UserGetSession } from './schemas/User.schema'
import UsersBaseProviders from './UsersBaseProviders'

class UsersProviders extends UsersBaseProviders{

    constructor(){
        super()
    }

    public setGqlc(gqlc: any) {
        super.setGqlc(gqlc)
    }

    public setUnauthenticationUrlRedirect(url: string) {
        super.setUnauthenticationUrlRedirect(url)
    }

    public async userFetch(
        filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean},
        sortBy: string, sortDesc: boolean, limit: number = 10, page: number = 1
    ){
        return await super.createPetition('query', userFetchGraphql, {
            filters,
            sortBy,
            sortDesc,
            limit,
            page
        })
    }

    public async userUpdate(id: string, user: {email?: string, password?: string, role?: string, name?: string, surname?: string, enable?: boolean}) {
        return await super.createPetition('mutation', userUpdateGraphql, {
            id,
            payload: { ...user }
        })
    }

    public async userCreate(user: {email: string, password: string, role: string, name?: string, surname?: string, enable?: boolean}) {
        return await super.createPetition('mutation', userCreateGraphql, {
            payload: { ...user }
        })
    }

    public async userLogin(email: string, password: string) {
        return await super.createPetition('query', userLoginGraphql, {
            payload: { email, password }
        })
    }

    public async userGetSession(): Promise<UserGetSession> {
        return await super.createPetition('query', userGetSession, {})
    }
}

const usersProviders = new UsersProviders()
export default usersProviders