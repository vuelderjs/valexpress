<template>
    <v-card-title class="text-truncate d-flex flex-row align-center justify-space-between" style="height: 85px">
        {{ props.role.name }}
        <section class="d-flex flex-row align-center justify-end" style="height: 50px">
            <v-btn 
                :disabled="props.role.createdBy === 'system'"
                color="purple" variant="text" 
                size="small" icon="mdi-pencil"
                @click="$emit('click:update')"
            ></v-btn>
            <v-btn 
                :disabled="props.role.createdBy === 'system'"
                color="red" variant="text" 
                size="small" icon="mdi-delete"
                @click="$emit('click:delete')"
            ></v-btn>
        </section>
    </v-card-title>
</template>

<script setup lang="ts">
    const props = defineProps<{
        role: { id: string, name: string, permissions: { id: string, name: string }[], createdBy: string, isInUpdateMode: boolean, isInDeleteMode: boolean }
    }>()

    const emit = defineEmits<{
        (e: 'click:update'): void
        (e: 'click:delete'): void
    }>()
</script>

<style scoped>

</style>