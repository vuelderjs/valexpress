import gql from "graphql-tag"

export default gql`
    mutation roleDelete($id: ID!){
        roleDelete(id: $id){
            id
        }
    }
`