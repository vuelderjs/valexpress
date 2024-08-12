<template>
    <v-icon @click="theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'">
        {{ theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
    </v-icon>
</template>

<script setup lang="ts">
    import { useTheme } from 'vuetify'
    const theme = useTheme()
</script>

<style scoped>

</style>