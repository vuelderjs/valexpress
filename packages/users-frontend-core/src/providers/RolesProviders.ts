import gql from 'graphql-tag'

import roleFetchGraphql from './graphql/roleFetch.graphql'
import permissionsFetchGraphql from './graphql/permissionsFetch.graphql'
import roleUpdateGraphql from './graphql/roleUpdate.graphql'
import roleCreateGraphql from './graphql/roleCreate.graphql'
import roleDeleteGraphql from './graphql/roleDelete.graphql'

export default class RolesProviders {

    private static _gqlc: any = null

    public static setGqlc(gqlc: any) {
        RolesProviders._gqlc = gqlc
    }

    public static async roleFetch() {
        return await RolesProviders._gqlc.query({
            query: gql`${roleFetchGraphql}`,
            fetchPolicy: 'network-only'
        })
    }

    public static async permissionsFetch(){
        return await RolesProviders._gqlc.query({
            query: gql`${permissionsFetchGraphql}`,
            fetchPolicy: 'network-only'
        })
    }

    public static async roleUpdate(id: string, role: {name?: string, permissions?: string[]}) {
        return await RolesProviders._gqlc.mutate({
            mutation: gql`${roleUpdateGraphql}`,
            variables: {
                id,
                payload: { ...role }
            }
        })
    }

    public static async roleCreate(role: {name: string, permissions: string[]}) {
        return await RolesProviders._gqlc.mutate({
            mutation: gql`${roleCreateGraphql}`,
            variables: {
                payload: { ...role }
            }
        })
    }

    public static async roleDelete(id: string) {
        return await RolesProviders._gqlc.mutate({
            mutation: gql`${roleDeleteGraphql}`,
            variables: { id }
        })
    }
}