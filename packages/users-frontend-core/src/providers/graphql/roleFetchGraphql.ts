import gql from "graphql-tag"

export default gql`
    query roleFetch {
        roleFetch {
            id
            name
            permissions {
                id
                name
            }
            createdBy
        }
    }
`