<template>
    <v-app app>
        <app-bar v-if="router.currentRoute.value.path != '/login'"></app-bar>
        <app-body></app-body>
    </v-app>
</template>

<script setup lang="ts">
    import AppBar from './AppBar.vue'
    import AppBody from './AppBody.vue'
    import { useRouter } from 'vue-router';
    const router = useRouter()
</script>

<style scoped>

</style>