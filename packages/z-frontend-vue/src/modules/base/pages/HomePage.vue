<template>
    <v-card class="w-100 h-100 pa-4 d-flex flex-column justify-center align-center">
        <CommonAnimatedCircles />
        <v-tabs
            v-model="tab"
        >
            <template v-for="group of menu" :key="group.group">
                <v-tab v-if="group.items.some(item => item.dashboard && permissions.includes(item.permission))" :value="group.group">
                    <v-icon start>{{ group.icon }}</v-icon>{{ group.group }}
                </v-tab>
            </template>
        </v-tabs>
        <v-card-text class="w-100" style="height: calc(100vh - 145px); overflow-y: auto">
            <v-tabs-window v-model="tab">
                <template v-for="group of menu" :key="group.group">
                    <v-tabs-window-item v-if="group.items.some(item => item.dashboard && permissions.includes(item.permission))" :value="group.group">
                        <v-card class="w-100 d-flex flex-row flex-wrap" style="padding-left: 1%; gap: 1%" variant="text">
                            <template v-for="item of group.items" :key="item.title">
                                <v-card style="width: 24%" v-if="item.dashboard && permissions.includes(item.permission)" class="mb-4">
                                    <HomeCard :title="item.title" :icon="item.icon" :hint="item.hint" :link="item.link"></HomeCard>
                                </v-card>
                            </template>
                        </v-card>
                    </v-tabs-window-item>
                </template>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { CommonAnimatedCircles } from '@valexpress/common-frontend-vue/src'

    import { computed, ref } from 'vue';
    import HomeCard from '../components/HomeCard.vue';
    import { useSession } from '@valexpress/users-frontend-vue/src';
    const { session } = useSession()

    
    const permissions = computed<string[]>(() => {
        return session.session?.role.permissions.map(permission => permission.name) || []
    })
        
    import menu from '../menu'
    
    const tab = ref(menu[0].group)

</script>

<style scoped>

</style>