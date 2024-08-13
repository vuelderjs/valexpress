import gql from "graphql-tag"

export default gql`
    mutation userCreate($payload: UserCreateInput!){
        userCreate(payload: $payload){
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