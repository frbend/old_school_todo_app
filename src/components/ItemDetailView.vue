<template>
    <div class="flex items-start justify-center pt-16 min-h-screen">
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-8 w-full max-w-md">
            <h2 class="text-[#42b883] font-semibold text-xl mb-6">Edit item</h2>
            <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-1.5">
                    <label for="item-name" class="text-zinc-400 text-sm">Item name</label>
                    <input
                        id="item-name"
                        class="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#42b883] focus:border-transparent transition-all"
                        v-model="input"
                    />
                </div>
                <div class="flex items-center gap-3">
                    <label for="item-completed" class="text-zinc-400 text-sm">Completed</label>
                    <input id="item-completed" type="checkbox" class="accent-[#42b883] w-4 h-4 cursor-pointer" v-model="completed">
                </div>
            </div>
            <div class="flex gap-3 mt-8">
                <button
                    class="flex-1 border border-[#42b883] text-[#42b883] py-2 rounded-md cursor-pointer hover:bg-[#42b883]/10 transition-colors duration-150"
                    @click.prevent="onGoBack"
                >Go back</button>
                <button
                    class="flex-1 bg-[#42b883] text-zinc-900 font-semibold py-2 rounded-md cursor-pointer hover:brightness-90 transition-all"
                    @click.prevent="onSave"
                >Save</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core'
import type { TodoItem } from '../types/global'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'


const storage = useSessionStorage<TodoItem[]>('todo-list', [])
const $router = useRouter()
const input = ref<string>('')
const completed = ref<boolean>(false)

const props = defineProps<{
    id: string
}>()

const currentItem = computed<TodoItem | null>(() => {
    if(!props.id) return null
    return storage.value.find((item: TodoItem) => item.id === props.id) ?? null
})

onMounted(() => {
    if(!props.id) return
    input.value = currentItem.value?.name ?? ''
    completed.value = currentItem.value?.completed ?? false
})

function onGoBack(): void {
    void $router.push({name: 'home'})
}

function onSave(): void {
    const item = currentItem.value
    if (!item) return
    if (input.value !== item.name || completed.value !== item.completed) {
        item.name = input.value
        item.completed = completed.value
        item.updatedAt = new Date()
    }
    void $router.push({name: 'home'})
}

</script>