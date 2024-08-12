<template>
    <create-role-form-modal
        v-if="createRoleFormModalOpen"
        @after:leave="createRoleFormModalOpen = false"
        :rolesManagement="rolesManagement"
    ></create-role-form-modal>
    <v-card class="w-100 h-100">
        <v-toolbar>
            <v-btn 
                class="ml-2" icon="mdi-plus" 
                variant="elevated" color="primary"
                @click="createRoleFormModalOpen = true"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-card-title>
                <v-icon start>mdi-security</v-icon>
                Roles y Permisos
            </v-card-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-row
                style="height: calc(100vh - 140px); overflow-y: auto;"
            >
                <v-col 
                    cols="12" md="4" :key="role.id" 
                    v-for="role of roles" 
                >
                    <RoleCard
                        :role="role"
                        :rolesManagement="rolesManagement"
                    ></RoleCard>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import RoleCard from '../components/RolesManagementPage/RoleCard.vue'
    import CreateRoleFormModal from '../components/RolesManagementPage/CreateRoleFormModal.vue'

    import { useRolesManagement } from '../composables/useRolesManagement'
    import { onMounted, ref, watchEffect } from 'vue';
    import RolesManagement from '@valexpress/users-frontend-core/src/RolesManagement';

    const rolesManagement = useRolesManagement() as RolesManagement

    const createRoleFormModalOpen = ref(false)

    const roles = ref<{id: string, name: string, permissions: {id: string, name: string}[], createdBy: string, isInUpdateMode: boolean, isInDeleteMode: boolean}[]>([])

    watchEffect( () => {
        if(rolesManagement.roles) {
            console.log('hola')
            roles.value = rolesManagement.roles.map(role => ({ ...role, isInUpdateMode: false, isInDeleteMode: false }))
        }
    })
    
    onMounted(async () => {
        rolesManagement.fetchRoles()
        rolesManagement.fetchPermissions()
    })
</script>

<style scoped>

</style>