import { reactive } from 'vue'
import RolesManagement from '@valexpress/users-frontend-core/src/RolesManagement'

export const useRolesManagement = () => reactive(new RolesManagement())