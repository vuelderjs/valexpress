<template>
    <v-navigation-drawer
        app
        v-model="navigationDrawerIsOpen"
        style="height: 100vh; border: 0px; fixed;"
    >
        <v-toolbar class="pl-4">
            <v-card variant="text" class="text-truncate d-flex flex-row justify-center align-center">
                <v-icon size="25" start>mdi-account</v-icon>
                {{ session.session?.role.name }}
            </v-card>
            <v-spacer></v-spacer>
            <v-btn icon @click="navigationDrawerIsOpen = false">
                <v-icon size="30">mdi-menu-left</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card
            variant="text" id="menu-container" class="menu-container"
        >
            <v-list 
                v-for="group of menu"
                :key="group.group"
            >
                <v-list-item
                    v-if="group.items.some(item => item.navigation && permissions.includes(item.permission))"
                    :prepend-icon="group.icon"
                    :title="group.group"
                ></v-list-item>
                <v-divider class="mb-2"></v-divider>
                <template v-for="item of group.items">
                    <v-list-item 
                        v-if="item.navigation && permissions.includes(item.permission)"
                        class="pl-8" 
                        :key="item.title"
                        :title="item.title"
                        :prepend-icon="item.icon"
                        :to="item.link"
                    ></v-list-item>
                </template>
            </v-list>
        </v-card>
        <v-card
            style="height: 150px"
            variant="text"
        >
            <v-divider></v-divider>
            <v-list>
                <v-list-item
                    title="Mi cuenta"
                    prepend-icon="mdi-account"
                    to="/account"
                ></v-list-item>
                <v-list-item
                title="Cerrar Sesión"
                @click="logoutClickHandled"
                prepend-icon="mdi-logout"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-information"
                    title="V 0.0.1"
                    disabled
                ></v-list-item>
            </v-list>
        </v-card>
    </v-navigation-drawer>
    <v-app-bar color="primary" app>
        <v-btn 
            v-if="!navigationDrawerIsOpen"
        icon="mdi-menu" @click="navigationDrawerIsOpen = true"></v-btn>
        <v-spacer></v-spacer>
        <v-card-title>Vuelder.js</v-card-title>
    </v-app-bar>
</template>

<script setup lang="ts">
    import { useSession } from '@valexpress/users-frontend-vue/src';
    import { ref } from 'vue';
    const navigationDrawerIsOpen = ref<boolean>(false)
    console.log('este es de AppBar')
    const { session, logout } = useSession()
    const permissions = computed<string[]>(() => {
        return session.session?.role.permissions.map(permission => permission.name) || []
    })
    const logoutClickHandled = () => {
        logout()
        navigationDrawerIsOpen.value = false
    }
    import menu from '@/modules/base/menu'
import { computed } from 'vue';
</script>

<style scoped>
    .menu-container {
        height: calc(100vh - 70px - 150px);
        overflow-y: auto;
    }

    .menu-container::-webkit-scrollbar {
        background-color: rgba(0, 0, 0, 0);
        width: 8px;
    }

    .menu-container::-webkit-scrollbar-thumb {
        display: block;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }
</style>