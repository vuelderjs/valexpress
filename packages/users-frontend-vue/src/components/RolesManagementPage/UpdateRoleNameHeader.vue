<template>
    <v-form 
        ref="formComponent"
        v-model="formValue"
        class="text-truncate d-flex flex-row align-center justify-space-between pa-2" 
        style="height: 85px" @submit.prevent
    >
        <v-text-field
            v-model="form.name"
            label="Nombre del rol"
            prepend-inner-icon="mdi-security"
            :rules="[requiredRule]"
            variant="underlined"
            class="mr-2"
        ></v-text-field>
        <section class="d-flex flex-row align-center justify-end" style="height: 50px">
            <v-btn 
                color="red" variant="text" 
                size="small" icon="mdi-cancel"
                @click="$emit('click:cancel')"
            ></v-btn>
            <v-btn 
                color="success" variant="elevated" 
                size="small" icon="mdi-check"
                class="ml-2"
                type="submit"
                :disabled="!formValue"
                :loading="props.rolesManagement.updateRoleLoading"
                @click="roleUpdateClickHandler"
            ></v-btn>
        </section>
    </v-form>
</template>

<script setup lang="ts">
    import { requiredRule } from '@valexpress/common-frontend-core/src'
    import RolesManagement from '@valexpress/users-frontend-core/src/RolesManagement'
    import { reactive, ref } from 'vue';

    const props = defineProps<{
        role: {id: string, name: string, permissions: {id: string, name: string}[], createdBy: string, isInUpdateMode: boolean, isInDeleteMode: boolean},
        rolesManagement: RolesManagement
    }>()

    const $emit = defineEmits<{
        (e: 'click:cancel'): void,
        (e: 'update:completed'): void
    }>()

    const form = reactive({
        name: props.role.name
    })
    const formValue = ref(false)

    const formComponent = ref<HTMLFormElement | null>(null)

    const roleUpdateClickHandler = async () => {
        if(!formComponent.value?.validate()) return
        await props.rolesManagement.updateRole(props.role.id, form.name, props.role.permissions.map(permission => permission.id))
        $emit('update:completed')
    }

</script>

<style scoped>

</style>