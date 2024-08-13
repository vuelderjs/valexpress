import roleFetchGraphql from './graphql/roleFetchGraphql'
import permissionsFetchGraphql from './graphql/permissionsFetchGraphql'
import roleUpdateGraphql from './graphql/roleUpdateGraphql'
import roleCreateGraphql from './graphql/roleCreateGraphql'
import roleDeleteGraphql from './graphql/roleDeleteGraphql'

export default class RolesProviders {

    private static _gqlc: any = null

    public static setGqlc(gqlc: any) {
        RolesProviders._gqlc = gqlc
    }

    public static async roleFetch() {
        return await RolesProviders._gqlc.query({
            query: roleFetchGraphql,
            fetchPolicy: 'network-only'
        })
    }

    public static async permissionsFetch(){
        return await RolesProviders._gqlc.query({
            query: permissionsFetchGraphql,
            fetchPolicy: 'network-only'
        })
    }

    public static async roleUpdate(id: string, role: {name?: string, permissions?: string[]}) {
        return await RolesProviders._gqlc.mutate({
            mutation: roleUpdateGraphql,
            variables: {
                id,
                payload: { ...role }
            }
        })
    }

    public static async roleCreate(role: {name: string, permissions: string[]}) {
        return await RolesProviders._gqlc.mutate({
            mutation: roleCreateGraphql,
            variables: {
                payload: { ...role }
            }
        })
    }

    public static async roleDelete(id: string) {
        return await RolesProviders._gqlc.mutate({
            mutation: roleDeleteGraphql,
            variables: { id }
        })
    }
}