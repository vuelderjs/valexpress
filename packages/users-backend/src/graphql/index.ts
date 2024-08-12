import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

//TYPES
const typesArray = loadFilesSync(path.join(__dirname, './types'), { extensions: ['graphql'] })
export const types =  mergeTypeDefs(typesArray);

//RESOLVERS
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'))
export const resolvers =  mergeResolvers(resolversArray);