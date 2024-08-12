import { reactive } from 'vue'
import DataUsersManagement from '@valexpress/users-frontend-core/src/DataUsersManagement'

export const useDataUsersManagement = () => reactive(new DataUsersManagement()) as DataUsersManagement