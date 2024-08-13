import roleFetchGraphql from './graphql/roleFetchGraphql'
import permissionsFetchGraphql from './graphql/permissionsFetchGraphql'
import roleUpdateGraphql from './graphql/roleUpdateGraphql'
import roleCreateGraphql from './graphql/roleCreateGraphql'
import roleDeleteGraphql from './graphql/roleDeleteGraphql'
import UsersBaseProviders from './UsersBaseProviders'

class RolesProviders extends UsersBaseProviders{
    constructor(){
        super()
    }

    public setGqlc(gqlc: any) {
        super.setGqlc(gqlc)
    }

    public setUnauthenticationUrlRedirect(url: string) {
        super.setUnauthenticationUrlRedirect(url)
    }

    public async roleFetch() {
        return await super.createPetition('query', roleFetchGraphql, {})
    }

    public async permissionsFetch(){
        return await super.createPetition('query', permissionsFetchGraphql, {})
    }

    public async roleUpdate(id: string, role: {name?: string, permissions?: string[]}) {
        return await super.createPetition('mutation', roleUpdateGraphql, {
            id,
            payload: { ...role }
        })
    }

    public async roleCreate(role: {name: string, permissions: string[]}) {
        return await super.createPetition('mutation', roleCreateGraphql, {
            payload: { ...role }
        })
    }

    public async roleDelete(id: string) {
        return await super.createPetition('mutation', roleDeleteGraphql, {
            id
        })
    }
}

const rolesProviders = new RolesProviders()

export default rolesProviders