<template>
    <v-card class="w-100 h-100 d-flex flex-column justify-center align-center">
        <CommonAnimatedCircles/>
        <v-card class="w-50" variant="elevated" elevation="10">
            <v-card style="position: absolute; top: 0; right: 0" variant="text" class="pa-4">
                <switch-dark-mode></switch-dark-mode>
            </v-card>
            <v-card-title class="text-center">
                <v-icon size="48">mdi-account-circle</v-icon>
            </v-card-title>
            <v-card-text>
                <v-alert v-if="loginIsError" type="error" class="mb-4">
                    {{ loginIsError }}
                </v-alert>
                <v-form v-model="formValue" @submit.prevent="() => login(form.email, form.password)">
                    <v-text-field 
                        class="pb-4"
                        v-model="form.email"
                        prepend-inner-icon="mdi-email"
                        label="Email" hint="Ingrese su email"
                        :rules="[requiredRule, emailRule]"
                    ></v-text-field>
                    <v-text-field 
                        class="pb-4"
                        v-model="form.password"
                        prepend-inner-icon="mdi-lock"
                        :append-inner-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                        :type="!showPassword ? 'password' : 'text'"
                        label="Contraseña" hint="Ingrese su contraseña"
                        :rules="[requiredRule]"
                    ></v-text-field>
                    <v-btn 
                        type="submit"
                        block color="primary" 
                        :loading="loginIsLoading" 
                        :disabled="!formValue"
                    >
                        Iniciar Sesión
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
    import { SwitchDarkMode, CommonAnimatedCircles } from '@valexpress/common-frontend-vue/src';

    import { ref, reactive } from 'vue';
    import { requiredRule, emailRule } from '@valexpress/common-frontend-core/src'

    const showPassword = ref(false)
    const formValue = ref(false)
    const form = reactive<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

    import { useSession } from '../composables/useSession'
    console.log('este es desde user-frontend / login')
    const { loginIsLoading, login, loginIsError } = useSession()
</script>

<style scoped>
    
</style>