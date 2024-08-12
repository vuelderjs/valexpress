export default [
    {
        group: 'Administración',
        icon: 'mdi-cog',
        items: [
            {
                title: 'Usuarios',
                icon: 'mdi-account-group',
                link: '/users-management',
                hint: 'Administrar Usuarios',
                permission: 'USER_READ',
                dashboard: true,
                navigation: true
            },
            {
                title: 'Roles',
                icon: 'mdi-security',
                link: '/roles-management',
                hint: 'Administrar Roles y permisos',
                permission: 'ROLE_READ',
                dashboard: true,
                navigation: true
            }
        ]
    }
]