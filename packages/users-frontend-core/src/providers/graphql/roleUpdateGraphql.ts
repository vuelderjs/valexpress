import gql from "graphql-tag"

export default gql`
    mutation roleUpdate($id: ID!, $payload: RoleUpdateInput!){
        roleUpdate(id: $id, payload: $payload){
            id
            name
            permissions{
                id
                name
            }
        }
    }
`