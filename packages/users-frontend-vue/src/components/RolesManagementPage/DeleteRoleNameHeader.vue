<template>
    <v-dialog 
        v-model="dialog"
        max-width="800"
        @after-leave="$emit('after:leave')"
    >
        <v-card>
            <v-toolbar color="primary">
                <v-card-title class="d-flex flex-row justify-center align-center">
                    <v-icon start>mdi-account-circle</v-icon>
                    Crear un usuario
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </v-toolbar>
            <v-card-title>
                ¿Está seguro de eliminar el rol?
            </v-card-title>
            <v-card-text>
                <v-card
                    prepend-icon="mdi-security"
                    class="d-flex flex-row align-center"
                    variant="outlined"
                >
                    <span style="font-size: 1.2em; font-weight: bold">{{ props.role.name }}</span>
                </v-card>
                <v-card
                    prepend-icon="mdi-key-change"
                    class="mt-4"
                    title="Permisos habilitados"
                    variant="outlined"
                >
                    <v-card-text>
                        <v-chip
                            v-for="permission in props.role.permissions"
                            color="primary"
                        >
                            {{ permission.name }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="red"
                        variant="text"
                        width="100"
                        @click="dialog = false"
                        class="mr-2"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        type="submit"
                        color="red"
                        variant="elevated"
                        width="100"
                        :loading="props.rolesManagement.deleteRoleLoading"
                        @click="deleteRoleClickHandler"
                    >
                        Eliminar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import RolesManagement from '@valexpress/users-frontend-core/src/RolesManagement'
    import { ref } from 'vue'

    const dialog = ref(true)

    const props = defineProps<{
        role: {id: string, name: string, permissions: {id: string, name: string}[], createdBy: string, isInUpdateMode: boolean, isInDeleteMode: boolean},
        rolesManagement: RolesManagement
    }>()

    const $emit = defineEmits<{
        (e: 'after:leave'): void
    }>()

    const deleteRoleClickHandler = async () => {
        await props.rolesManagement.deleteRole(props.role.id)
        dialog.value = false
    }

</script>

<style scoped>

</style>