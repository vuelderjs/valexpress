import { mergeResolvers } from '@graphql-tools/merge'

import { resolvers as userResolvers } from '@valexpress/users-backend'

export default mergeResolvers([userResolvers]) as any