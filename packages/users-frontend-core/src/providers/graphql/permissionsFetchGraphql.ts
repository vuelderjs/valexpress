import gql from 'graphql-tag'

export default gql`
    query permissionsFetch{
        permissionsFetch{
            id
            name
        }
    }
`