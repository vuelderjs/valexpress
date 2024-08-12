<template>
    <v-card class="w-100 h-100 d-flex flex-column justify-center align-center">
        <CommonAnimatedCircles/>
        <v-card  class="w-50" variant="elevated" :loading="session.syncronizeSessionLoading">
            <v-toolbar class="px-4" color="primary">
                <v-icon size="36" start>mdi-account</v-icon>
                <v-card-title>Información de usuario</v-card-title>
                <v-spacer></v-spacer>
                <v-card variant="text">
                    <v-icon start>mdi-security</v-icon>
                    {{ session.session?.role?.name }}
                </v-card>
            </v-toolbar>
            <v-alert 
                class="my-2" type="error" 
                v-if="dataUsersManagement.updateUserError?.message"
                closable
                @click:close="dataUsersManagement.closeUpdateUserError()"
            >
                {{ dataUsersManagement.updateUserError }}
            </v-alert>
            <v-form ref="formComponent" v-model="formValue" @submit.prevent>
                <v-card-text>
                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        label="Nombre"
                        v-model="form.name"
                        @update:model-value="userFormIsSaved = false"
                    ></v-text-field>
                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        label="Apellido"
                        v-model="form.surname"
                        @update:model-value="userFormIsSaved = false"
                    ></v-text-field>
                    <v-text-field
                        prepend-inner-icon="mdi-email"
                        label="Email"
                        v-model="form.email"
                        :rules="[requiredRule, emailRule]"
                        @update:model-value="userFormIsSaved = false"
                    ></v-text-field>
                    <v-text-field
                        prepend-inner-icon="mdi-lock"
                        label="Nueva contraseña"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                        v-model="form.password"
                        :rules="[(value: string) => passwordValidator(value) || 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial (@$!%*?&)']"
                        @update:model-value="userFormIsSaved = false"
                    ></v-text-field>
                    <v-text-field
                        prepend-inner-icon="mdi-lock"
                        label="Confirmar contraseña"
                        :type="showPasswordConfirm ? 'text' : 'password'"
                        :append-inner-icon="!showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
                        v-model="form.confirmPassword"
                        :rules="[(v: string) => v === form.password || 'Las contraseñas no coinciden']"
                        @update:model-value="userFormIsSaved = false"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        variant="elevated" type="submit"
                        :color="userFormIsSaved ? 'success' : 'primary'" 
                        @click="saveChanges" :disabled="!formValue"
                        :loading="dataUsersManagement.updateUserLoading"
                        :prepend-icon="userFormIsSaved ? 'mdi-check-circle' : 'mdi-content-save'"
                    >
                        {{userFormIsSaved ? 'Guardado' : 'Guardar cambios'}}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
    import { CommonAnimatedCircles } from '@valexpress/common-frontend-vue/src';

    import { ref, reactive, watchEffect } from 'vue';
    import { requiredRule, emailRule } from '@valexpress/common-frontend-core/src'
    import { useSession } from '../composables/useSession'
    import { useDataUsersManagement } from '../composables/useDataUsersManagement';
    const { session } = useSession()
    const dataUsersManagement = useDataUsersManagement()

    const form = reactive({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const passwordValidator = (password: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        return regex.test(password)   
    }

    watchEffect( () => {
        if(!session.syncronizeSessionLoading){
            cancelChanges()
        }
    })

    const userFormIsSaved = ref(false)
    const showPassword = ref(false)
    const showPasswordConfirm = ref(false)
    const formValue = ref(false)
    const formComponent = ref<HTMLFormElement | null>(null)

    const cancelChanges = () => {
        form.name = session.session?.name || ''
        form.surname = session.session?.surname || ''
        form.email = session.session?.email || ''
    }

    const saveChanges = async () => {
        if(!formComponent.value?.validate()) return
        if(!session.session?.id) return
        const { confirmPassword, ...user } = form
        await dataUsersManagement.updateUser(session.session?.id, user)
        if(!dataUsersManagement.updateUserError?.message){
            userFormIsSaved.value = true
        }
    }
</script>

<style scoped>

</style>