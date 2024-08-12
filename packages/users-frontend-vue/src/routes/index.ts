import '../index.d'

import UserLoginPage from '../pages/UserLoginPage.vue'
import UsersManagementPage from '../pages/UsersManagementPage.vue'
import RolesManagementPage from '../pages/RolesManagementPage.vue'
import UserAccountPage from '../pages/UserAccountPage.vue'

export default [
    {
        path: '/login',
        name: 'login',
        component: () => UserLoginPage
    },
    {
        path: '/users-management',
        name: 'users-management',
        component: () => UsersManagementPage
    },
    {
        path: '/roles-management',
        name: 'roles-management',
        component: () => RolesManagementPage
    },
    {
        path: '/account',
        name: 'account',
        component: () => UserAccountPage
    }
]