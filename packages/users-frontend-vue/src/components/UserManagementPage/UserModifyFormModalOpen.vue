<template>
    <v-dialog
        persistent
        v-model="dialog"
        @after-leave="$emit('after:leave')"
        max-width="800"
    >
        <v-card>
            <v-toolbar color="primary">
                <v-card-title class="d-flex flex-row justify-center align-center">
                    <v-icon start>mdi-account-circle</v-icon>
                    Modificación de usuario
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </v-toolbar>
            <v-form v-model="formValue" ref="formComponent" @submit.prevent>
                <v-card-text>
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" class="my-0 py-0">
                            <v-text-field
                                v-if="props.user.createdBy == 'system'"
                                label="Rol"
                                :modelValue="props.user.role"
                                prepend-inner-icon="mdi-security"
                                disabled
                            ></v-text-field>
                            <v-autocomplete
                                v-else
                                v-model="updateForm.role"
                                :items="props.roles.map(role => ({ title: role.name, value: role.id }))"
                                label="Rol"
                                :rules="[requiredRule]"
                                prepend-inner-icon="mdi-security"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                            <v-text-field
                                v-model="updateForm.email"
                                label="Email"
                                prepend-inner-icon="mdi-email"
                                :error-messages="props.dataUsersManagement.updateUserError?.field === 'email' ? props.dataUsersManagement.updateUserError.message : []"
                                :rules="[requiredRule]"
                                @input="() => props.dataUsersManagement.closeUpdateUserError()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0 d-flex flex-row ga-4">
                            <v-text-field
                                v-model="updateForm.name"
                                label="Nombre"
                                prepend-inner-icon="mdi-account"
                            ></v-text-field>
                            <v-text-field
                                v-model="updateForm.surname"
                                label="Apellido"
                                prepend-inner-icon="mdi-account"
                            ></v-text-field>
                            <v-switch
                                style="width: 150px;"
                                v-model="updateForm.enable"
                                label="Habilitado"
                                color="success"
                            ></v-switch>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="red" 
                        class="mr-2" 
                        @click="dialog = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn 
                        type="submit"
                        variant="elevated" color="primary" 
                        @click="saveChanges"
                        :loading="props.dataUsersManagement.updateUserLoading"
                        :disabled="!formValue"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { requiredRule } from '@valexpress/common-frontend-core/src';
    import { reactive, ref } from 'vue'
    import DataUsersManagement from '@valexpress/users-frontend-core/src/DataUsersManagement';

    const dialog = ref(true)
    const formValue = ref(false)
    const formComponent = ref<HTMLFormElement | null>(null)

    type User = {id: string, createdBy: string, email: string, role: string, name: string, surname: string, enable: boolean}

    const props = defineProps<{
        user: User,
        dataUsersManagement: DataUsersManagement,
        roles: { id: string, name: string, permissions: { id: string, name: string } }[]
    }>()

    const emit = defineEmits<{
        (e: 'after:leave'): void
    }>()

    const updateForm = reactive<{
        role: string | undefined
        email: string
        name: string
        surname: string
        enable: boolean
    }>({
        role: props.user.createdBy != 'system' ? props.roles.find(role => role.name == props.user.role)?.id || undefined : undefined,
        email: props.user.email,
        name: props.user.name,
        surname: props.user.surname,
        enable: props.user.enable
    })

    const saveChanges = async () => {
        if(!formComponent.value?.validate()) return
        await props.dataUsersManagement.updateUser(props.user.id, updateForm)
        if(!props.dataUsersManagement.updateUserError) dialog.value = false
    }
</script>

<style scoped>

</style>