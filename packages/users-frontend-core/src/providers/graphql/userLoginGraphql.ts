import gql from "graphql-tag"

export default gql`
    query userLogin($payload: UserLoginInput!){
        userLogin(payload: $payload)
    }
`