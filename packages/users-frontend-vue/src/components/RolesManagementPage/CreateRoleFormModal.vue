<template>
    <v-dialog
        @after-leave="$emit('after:leave')"
        max-width="800"
        v-model="dialog"
    >
        <v-card>
            <v-toolbar color="primary">
                <v-card-title class="d-flex flex-row align-center">
                    <v-icon start>mdi-security</v-icon>
                    Crear un rol
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="close"></v-btn>
            </v-toolbar>
            <v-form 
                v-model="formValue" ref="formComponent"
            >
                <v-card-text>
                    <v-text-field
                        v-model="form.name"
                        label="Nombre del rol"
                        prepend-inner-icon="mdi-security"
                        :rules="[requiredRule]"
                        :error-messages="props.rolesManagement.createRoleError?.field === 'name' ? props.rolesManagement.createRoleError.message : []"
                        @update:model-value="() => props.rolesManagement.cleanCreateRoleError()"
                    ></v-text-field>
                    <v-card-text class="d-flex flex-wrap align-center justify-center ga-2">
                        <v-chip 
                            v-for="permission of rolesManagement.permissions"
                            :key="permission.id"
                            :style="{ 
                                opacity: form.permissions.some(formPermission => formPermission === permission.id) ? 1 : 0.3
                            }"
                            :color="form.permissions.some(formPermission => formPermission === permission.id) ? 'primary' : 'default'"
                            :variant="form.permissions.some(formPermission => formPermission === permission.id) ? 'elevated' : 'flat'"
                            @click="() => form.permissions.some(formPermission => formPermission === permission.id) ?
                                form.permissions = form.permissions.filter(formPermission => formPermission !== permission.id) :
                                form.permissions = [...form.permissions, permission.id]"
                        >
                            {{ permission.name }}
                        </v-chip>
                    </v-card-text>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        class="mr-2" color="red" 
                        variant="text" @click="close"
                    >Cancelar</v-btn>
                    <v-btn 
                        color="primary" variant="elevated"
                        @click="rolesCreate"
                        :loading="props.rolesManagement.createRoleLoading"
                        :disabled="!formValue || form.permissions.length === 0"
                    >Crear</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { requiredRule } from '@valexpress/common-frontend-core/src'
    import RolesManagement from '@valexpress/users-frontend-core/src/RolesManagement'
    import { ref, reactive } from 'vue';

    const formComponent = ref<HTMLFormElement | null>(null)

    const props = defineProps<{
        rolesManagement: RolesManagement
    }>()

    const emit = defineEmits<{
        (e: 'after:leave'): void
    }>()

    const dialog = ref(true)
    const formValue = ref(false)

    const form = reactive<{
        name: string,
        permissions: string[]
    }>({
        name: '',
        permissions: []
    })

    const close = () => {
        props.rolesManagement.cleanCreateRoleError()
        dialog.value = false
        form.name = ''
    }

    const rolesCreate = async () => {
        if(!formComponent.value?.validate()) return
        console.log({
            name: form.name,
            permissions: form.permissions
        })
        await props.rolesManagement.createRole(form.name, form.permissions)
        if(!props.rolesManagement.createRoleError.field && !props.rolesManagement.createRoleError.message) close()
    }
</script>

<style scoped>

</style>