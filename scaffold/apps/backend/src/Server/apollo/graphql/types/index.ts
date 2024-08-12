import { mergeTypeDefs } from '@graphql-tools/merge'

import { types as userTypes } from "@valexpress/users-backend";

export default mergeTypeDefs([userTypes]) as any