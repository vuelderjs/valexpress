import roleFetchGraphql from './graphql/roleFetchGraphql'
import permissionsFetchGraphql from './graphql/permissionsFetchGraphql'
import roleUpdateGraphql from './graphql/roleUpdateGraphql'
import roleCreateGraphql from './graphql/roleCreateGraphql'
import roleDeleteGraphql from './graphql/roleDeleteGraphql'

class RolesProviders {
    public gqlc: any

    constructor(){
        this.gqlc = null
    }

    public setGqlc(gqlc: any) {
        this.gqlc = gqlc
    }

    public async roleFetch() {
        return await this.gqlc.query({
            query: roleFetchGraphql,
            fetchPolicy: 'network-only'
        })
    }

    public async permissionsFetch(){
        return await this.gqlc.query({
            query: permissionsFetchGraphql,
            fetchPolicy: 'network-only'
        })
    }

    public async roleUpdate(id: string, role: {name?: string, permissions?: string[]}) {
        return await this.gqlc.mutate({
            mutation: roleUpdateGraphql,
            variables: {
                id,
                payload: { ...role }
            }
        })
    }

    public async roleCreate(role: {name: string, permissions: string[]}) {
        return await this.gqlc.mutate({
            mutation: roleCreateGraphql,
            variables: {
                payload: { ...role }
            }
        })
    }

    public async roleDelete(id: string) {
        return await this.gqlc.mutate({
            mutation: roleDeleteGraphql,
            variables: { id }
        })
    }
}

const rolesProviders = new RolesProviders()

export default rolesProviders