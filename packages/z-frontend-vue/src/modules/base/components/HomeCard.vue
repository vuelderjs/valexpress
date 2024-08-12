<template>
    <v-card
        class="pa-4 w-100 h-100"
        :to="props.link"
        variant="outlined"
    >
        <v-card-title class="text-center">{{ props.title }}</v-card-title>
        <v-card-text class="text-center">
            <v-icon size="100">{{ props.icon }}</v-icon>
        </v-card-text>
        <v-card-text class="text-center">
            {{ props.hint }}
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title: string
        icon: string
        hint: string
        link: string
    }>()
</script>

<style scoped>

</style>