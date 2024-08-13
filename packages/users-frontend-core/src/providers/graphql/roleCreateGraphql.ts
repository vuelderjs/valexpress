import gql from "graphql-tag"

export default gql`
    mutation roleCreate($payload: RoleCreateInput!){
        roleCreate(payload: $payload){
            id
            name
            permissions{
                id
                name
            }
            createdBy
        }
    }
`