import gql from "graphql-tag"

export default gql`
    query userGetSession{
        userGetSession{
            id
            email
            role {
                id
                name
                permissions {
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