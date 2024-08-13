import { ApolloError } from '@apollo/client';
import { DocumentNode } from 'graphql/language/ast';

export default class UsersBaseProviders {
    public gqlc: any = null
    public unauthenticationUrlRedirect: string = '/logout'

    public setGqlc(gqlc: any) {
        this.gqlc = gqlc
    }

    public setUnauthenticationUrlRedirect(url: string) {
        this.unauthenticationUrlRedirect = url
    }

    public async createPetition(
        type: 'query' | 'mutation',
        graphql: DocumentNode,
        variables: any
    ){
        try {
            const gqlcJson = {
                [type]: graphql,
                variables
            }

            if(type === 'query') gqlcJson['fetchPolicy'] = 'network-only'

            return await this.gqlc[type === 'query' ? 'query' : 'mutate'](gqlcJson)
        } catch (error) {
            if(error instanceof ApolloError){
                let isUnauthenticated = false
                for(const errorInstance of error.graphQLErrors){
                    if(errorInstance.extensions?.code === 'UNAUTHENTICATED'){
                        window.location.href = this.unauthenticationUrlRedirect
                        isUnauthenticated = true
                    }
                }
                if(!isUnauthenticated) throw error
            }else{
                throw error
            }
        }
    }
}