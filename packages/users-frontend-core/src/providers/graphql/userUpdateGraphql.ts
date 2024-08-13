import gql from "graphql-tag"

export default gql`
    mutation userUpdate($id: ID!, $payload: UserUpdateInput!){
        userUpdate(id: $id, payload: $payload){
            id
            email
            role{
                id
                name
                permissions{
                    id
                    name
                }
            }
            name
            surname
            enable
        }
    }
`