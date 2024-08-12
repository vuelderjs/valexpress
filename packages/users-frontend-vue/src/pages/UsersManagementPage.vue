<template>
    <v-card class="w-100 h-100" variant="text">
        <v-toolbar>
            <v-btn
                class="ml-2"
                icon="mdi-plus"
                color="primary"
                variant="elevated"
                @click="createUserFormModalOpen = true"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-card-title>
                <v-icon start>mdi-account-group</v-icon>
                Administración de usuarios
            </v-card-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text
            style="height: calc(100vh - 140px); overflow-y: auto;"
        >
            <users-table-filters
                :dataUsersManagement="dataUsersManagement"
                :roles="roles"
            ></users-table-filters>
            <v-divider class="mb-3"></v-divider>
            <users-table
                :dataUsersManagement="dataUsersManagement"
                :roles="roles"
            ></users-table>
        </v-card-text>
    </v-card>
    <!-- @vue-ignore -->
    <create-user-form-modal
        v-model="createUserFormModalOpen"
        :dataUsersManagement="dataUsersManagement"
        :roles="roles"
    ></create-user-form-modal>
</template>

<script setup lang="ts">
    //import components
    import CreateUserFormModal from '../components/UserManagementPage/CreateUserFormModal.vue';
    import UsersTable from '../components/UserManagementPage/UsersTable.vue'
    import UsersTableFilters from '../components/UserManagementPage/UsersTableFilters.vue'

    //Import composables
    import { onMounted, ref } from 'vue'
    import { useDataUsersManagement } from '../composables/useDataUsersManagement'
    import { RolesProviders } from '@valexpress/users-frontend-core/src'
    import DataUsersManagement from '@valexpress/users-frontend-core/src/DataUsersManagement'
    
    const dataUsersManagement = useDataUsersManagement() as DataUsersManagement

    const createUserFormModalOpen = ref(false)
    const roles = ref<{ id: string, name: string, permissions: { id: string, name: string }}[]>([])

    const roleFetch = async () => {
        try {
            const { data: { roleFetch } } = await RolesProviders.roleFetch()
            console.log('roleFetch', roleFetch)
            roles.value = roleFetch
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(() => {
        roleFetch()
    })
</script>

<style lang="scss" scoped>
</style>