import gql from "graphql-tag"

export default gql`
    query userFetch($filters: UserFetchFiltersInput, $sortBy: String, $sortDesc: Boolean, $limit: Int, $page: Int){
        userFetch(filters: $filters, sortBy: $sortBy, sortDesc: $sortDesc, limit: $limit, page: $page){
            docs{
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
                createdBy
                surname
                enable
            }
            page
            limit
            total
        }
    }
`