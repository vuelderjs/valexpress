<template>
    <v-alert
        v-if="dataUsersManagement.fetchUsersError || dataUsersManagement.updateUserError.message"
        type="error"
        closable
        @click:close="closeErrors"
        class="my-2"
    >
        {{ dataUsersManagement.fetchUsersError || dataUsersManagement.updateUserError.message }}
    </v-alert>
    <!-- @vue-ignore -->
    <v-data-table-server
        fixed-header
        :loading="dataUsersManagement.docsAreLoading"
        :items="items"
        :items-length="dataUsersManagement.total"
        :headers="headers"
        :items-per-page="dataUsersManagement.limit"
        :items-per-page-options="[10, 25, 50, 100]"
        :page="dataUsersManagement.page"
        :sort-by="[{ key: dataUsersManagement.sortBy, order: dataUsersManagement.sortDesc ? 'desc' : 'asc' }]"
        @update:items-per-page="(value: number) => dataUsersManagement.updateLimit(value)"
        @update:page="(value: number) => dataUsersManagement.updatePage(value)"
        @update:sortBy="tableUpdateSortByHandler"
    >
        <!-- @vue-skip -->
        <template v-for="header in headers" v-slot:[`item.${header.value}`]="{ item }">
            <template v-if="['name', 'surname'].includes(header.value)">
                <span v-if="!item[header.value]" style="opacity: 0.3;">
                    No hay datos
                </span>
                <span v-else>
                    {{ item[header.value] }}
                </span>
            </template>
            <template v-else-if="header.value === 'enable'">
                <v-card variant="text" class="text-center d-flex justify-center align-center">
                    <!-- @vue-ignore -->
                    <v-switch
                        style="width: 50px; height: 50px;"
                        color="success"
                        :model-value="item[header.value]"
                        @update:model-value="dataUsersManagement.updateUser(item.id, {enable: $event})"
                        :loading="dataUsersManagement.updateUserLoading"
                    ></v-switch>
                </v-card>
            </template>
            <template v-else-if="header.value === 'actions'">
                <!-- <v-btn size="small" icon="mdi-information" color="info" class="ma-1"></v-btn> -->
                <v-btn @click="item.modifyModalOpen = !item.modifyModalOpen" size="small" icon="mdi-pencil" color="purple" class="ma-1"></v-btn>
                <user-modify-form-modal-open 
                    v-if="item.modifyModalOpen"
                    :user="item" 
                    :dataUsersManagement="props.dataUsersManagement"
                    @after:leave="item.modifyModalOpen = false"
                    :roles="roles"
                ></user-modify-form-modal-open>
            </template>
            <template v-else>
                {{ item[header.value] }}
            </template>
        </template>
    </v-data-table-server>
</template>

<script setup lang="ts">
    import UserModifyFormModalOpen from './UserModifyFormModalOpen.vue';

    import { onMounted, ref, watchEffect } from 'vue';
    import DataUsersManagement from '@valexpress/users-frontend-core/src/DataUsersManagement';

    const props = defineProps<{
        dataUsersManagement: DataUsersManagement,
        roles: { id: string, name: string, permissions: { id: string, name: string }}[]
    }>()

    onMounted(async () => {
        await props.dataUsersManagement.fetchUsers()
    })

    const items = ref<{ id: string, email: string, role: string, name: string, surname: string, enable: boolean, modifyModalOpen: boolean }[]>([])
    
    watchEffect( () => {
        if(!props.dataUsersManagement.docsAreLoading){
            items.value = props.dataUsersManagement.docs.map(doc => ({...doc, role: doc.role.name, modifyModalOpen: false}))
        }
    })
    // id email role name surname enable

    const headers = [
        { title: 'Email', value: 'email', sortable: true },
        { title: 'Rol', value: 'role', sortable: true },
        { title: 'Nombre', value: 'name', sortable: true },
        { title: 'Apellido', value: 'surname', sortable: true },
        { title: 'Habilitar usuario', value: 'enable', align: 'center', sortable: true},
        { title: 'Acciones', value: 'actions', align: 'center' }
    ]

    const tableUpdateSortByHandler = async (value: { key: string, order: string }[]) => {
        if(value[0]){
            const [{ key, order }] = value
            props.dataUsersManagement.updateSortBy(key)
            console.log('order == desc: ', order == 'desc')
            props.dataUsersManagement.updateSortDesc(order == 'desc')
            await props.dataUsersManagement.fetchUsers()
        }else {
            props.dataUsersManagement.updateSortBy('')
            props.dataUsersManagement.updateSortDesc(false)
            await props.dataUsersManagement.fetchUsers()
        }
    }

    const closeErrors = () => {
        props.dataUsersManagement.closeFetchUsersError()
        props.dataUsersManagement.closeUpdateUserError()
    }
</script>

<style scoped>

</style>