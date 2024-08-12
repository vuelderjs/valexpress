<template>
    <v-card class="pb-4">
        <DeleteRoleNameHeader
            v-if="role.isInDeleteMode"
            :role="props.role"
            :rolesManagement="rolesManagement"
            @after:leave="role.isInDeleteMode = false"
        ></DeleteRoleNameHeader>
        <UpdateRoleNameHeader
            v-if="role.isInUpdateMode"
            :role="props.role"
            :rolesManagement="rolesManagement"
            @update:completed="role.isInUpdateMode = false"
            @click:cancel="role.isInUpdateMode = false"
        ></UpdateRoleNameHeader>
        <NormalRoleNameHeader
            v-else
            @click:update="role.isInUpdateMode = true"
            @click:delete="role.isInDeleteMode = true"
            :role="props.role"
            :RolesManagement="rolesManagement"
        ></NormalRoleNameHeader>
        
        <v-divider></v-divider>
        <v-card-text class="d-flex flex-wrap align-center justify-center ga-2">
            <v-chip 
                v-for="permission of rolesManagement.permissions"
                :key="permission.id"
                :style="{ 
                    opacity: role.permissions.some(rolePermission => rolePermission.id === permission.id) ? 1 : 0.3
                }"
                :color="role.permissions.some(rolePermission => rolePermission.id === permission.id) ? 'primary' : 'default'"
                :variant="role.permissions.some(rolePermission => rolePermission.id === permission.id) ? 'elevated' : 'flat'"
                @click="() => role.permissions.some(rolePermission => rolePermission.id === permission.id) ?
                    rolesManagement.updateRole(role.id, role.name, role.permissions.filter(rolePermission => rolePermission.id !== permission.id).map(rolePermission => rolePermission.id)) :
                    rolesManagement.updateRole(role.id, role.name, [...role.permissions, permission].map(rolePermission => rolePermission.id))"
            >
                {{ permission.name }}
            </v-chip>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import NormalRoleNameHeader from './NormalRoleNameHeader.vue'
    import UpdateRoleNameHeader from './UpdateRoleNameHeader.vue'
    import DeleteRoleNameHeader from './DeleteRoleNameHeader.vue'


    import RolesManagement from '@valexpress/users-frontend-core/src/RolesManagement'

    const props = defineProps<{
        role: { id: string, name: string, permissions: { id: string, name: string }[], createdBy: string, isInUpdateMode: boolean, isInDeleteMode: boolean},
        rolesManagement: RolesManagement
    }>()
</script>

<style scoped>

</style>