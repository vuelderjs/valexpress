<template>
    <v-dialog
        persistent
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        max-width="800"
    >
        <v-card>
            <v-toolbar color="primary">
                <v-card-title class="d-flex flex-row justify-center align-center">
                    <v-icon start>mdi-account-circle</v-icon>
                    Crear un usuario
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="emit('update:modelValue', false)"></v-btn>
            </v-toolbar>
            <v-form ref="createUserForm" v-model="formValue" @submit.prevent type="submit">
                <v-card-text>
                    <v-autocomplete
                        v-model="form.role"
                        :items="props.roles.map(role => ({ title: role.name, value: role.id }))"
                        label="Rol"
                        prepend-inner-icon="mdi-security"
                        :rules="[requiredRule]"
                    ></v-autocomplete>
                    <v-text-field
                        v-model="form.email"
                        label="Email"
                        prepend-inner-icon="mdi-email"
                        :rules="[requiredRule, emailRule]"
                        :error-messages="emailErrorMessages"
                        @input="emailErrorMessages = []"
                    ></v-text-field>
                    <v-text-field
                        v-model="form.password"
                        label="Contraseña"
                        prepend-inner-icon="mdi-lock"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                        :rules="[requiredRule, (value: string) => passwordValidator(value) || 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial (@$!%*?&)']"
                    ></v-text-field>
                    <v-text-field
                        v-model="form.passwordConfirm"
                        label="Confirmar contraseña"
                        prepend-inner-icon="mdi-lock"
                        :type="showPasswordConfirm ? 'text' : 'password'"
                        :append-inner-icon="!showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
                        :rules="[
                            requiredRule,
                            (v: string) => v === form.password || 'Las contraseñas no coinciden'
                        ]"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="red"
                        variant="text"
                        width="100"
                        @click="close"
                        class="mr-2"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        type="submit"
                        color="primary"
                        variant="elevated"
                        width="100"
                        :disabled="!formValue"
                        :loading="createClickHandlerLoading"
                        @click="createClickHandler"
                    >
                        Crear
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { emailRule, requiredRule } from '@valexpress/common-frontend-core/src';
    import { reactive, ref } from 'vue';
    import DataUsersManagement from '@valexpress/users-frontend-core/src/DataUsersManagement';
    const createUserForm = ref<HTMLFormElement | null>(null)

    const props = defineProps<{
        modelValue: boolean,
        roles: { name: string, id: string, permissions: { id: string, name: string } }[],
        dataUsersManagement: DataUsersManagement
    }>()
    const emit = defineEmits<{
        (event: 'update:modelValue', value: boolean): void
    }>()

    const passwordValidator = (password: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        return regex.test(password)   
    }

    const formValue = ref(false)
    const form = reactive<{
        email: string
        password: string
        passwordConfirm: string
        role: string
    }>({
        email: '',
        password: '',
        passwordConfirm: '',
        role: ''
    })

    const emailErrorMessages = ref<string[]>([])

    const showPassword = ref(false)
    const showPasswordConfirm = ref(false)

    const close = () => {
        emit('update:modelValue', false)
        formValue.value = false
        form.email = ''
        form.password = ''
        form.passwordConfirm = ''
        form.role = ''
    }
    
    const createClickHandlerLoading = ref(false)
    const createClickHandlerError = ref('')
    const createClickHandler = async () => {
        if(createUserForm?.value?.validate()) {
            try {
                createClickHandlerLoading.value = true
                await props.dataUsersManagement.createUser({
                    email: form.email,
                    password: form.password,
                    role: form.role
                })
                close()
            } catch (error) {
                if(!(error instanceof Error)) return createClickHandlerError.value = 'Error desconocido'
                if(error.message.includes('E11000') && error.message.includes('index: email')){
                    emailErrorMessages.value.push('Este email ya se encuentra registrado')
                }
            } finally {
                createClickHandlerLoading.value = false
            }
        }
    }
</script>

<style scoped>

</style>