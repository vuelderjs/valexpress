<template>
    <v-card variant="text">
        <v-card-title class="d-flex flex-row align-center" justify-start>
            <v-icon start>mdi-filter-outline</v-icon>Filtros
            <v-spacer></v-spacer>
        </v-card-title>
        <v-row class="ma-0 pa-0">
            <v-col cols="12" class="d-flex flex-row flex-wrap ga-4 py-0">
                <v-autocomplete
                    :items="props.roles.map(role => ({ title: role.name, value: role.id }))"
                    :modelValue="props.dataUsersManagement.filters.role"
                    @update:modelValue="props.dataUsersManagement.updateFilters({role: $event})"
                    style="width: auto; min-width: 200px;"
                    label="Rol"
                    prepend-inner-icon="mdi-security"
                ></v-autocomplete>
                <v-text-field
                    :modelValue="props.dataUsersManagement.filters.email"
                    @update:modelValue="props.dataUsersManagement.updateFilters({email: $event})"
                    style="width: auto; min-width: 200px;"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                ></v-text-field>
                <v-text-field
                    :modelValue="props.dataUsersManagement.filters.name"
                    @update:modelValue="props.dataUsersManagement.updateFilters({name: $event})"
                    style="width: auto; min-width: 200px;"
                    label="Nombre"
                    prepend-inner-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                    :modelValue="props.dataUsersManagement.filters.surname"
                    @update:modelValue="props.dataUsersManagement.updateFilters({surname: $event})"
                    style="width: auto; min-width: 200px;"
                    label="Apellido"
                    prepend-inner-icon="mdi-account"
                ></v-text-field>
                <!-- @vue-ignore -->
                <v-switch
                    :modelValue="props.dataUsersManagement.filters.enable"
                    @update:modelValue="props.dataUsersManagement.updateFilters({enable: $event})"
                    label="Mostrar solo usuarios habilitados"
                    color="success"
                ></v-switch>
            </v-col>
            <v-col cols="12" class="d-flex flex-row flex-wrap ga-4 justify-end py-4">
                <v-btn color="primary" variant="text" size="small" @click="() => props.dataUsersManagement.cleanFilters()">Limpiar Filtros</v-btn>
                <v-btn color="primary" variant="elevated" size="small" @click="() => props.dataUsersManagement.fetchUsers()">Aplicar Filtros</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
    import { DataUsersManagement } from '@valexpress/users-frontend-core/src';

    const props = defineProps<{
        roles: { id: string, name: string, permissions: { id: string, name: string }}[],
        dataUsersManagement: DataUsersManagement
    }>()
</script>

<style scoped>

</style>