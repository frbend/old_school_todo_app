<template>
    <div
        class="flex items-stretch border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800 transition-colors duration-150 border-l-4"
        :class="props.item.completed ? 'border-l-[#42b883]' : 'border-l-slate-600'"
    >
        <span class="flex-1 flex items-center px-4 py-3 text-zinc-100 truncate">{{ props.item.name }}</span>
        <div class="flex items-center justify-center px-4 border-l border-zinc-800 shrink-0 w-32">
            <span v-if="!props.item.completed" class="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400">Pending</span>
            <span v-else class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-[#42b883]/20 text-[#42b883]">
                Completed
                <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </div>
        <div class="hidden sm:flex items-center px-4 border-l border-zinc-800 shrink-0 w-44">
            <span class="text-xs text-zinc-500">{{ props.item.updatedAt ? props.item.updatedAt.toLocaleString() : 'Never updated' }}</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-3 border-l border-zinc-800 shrink-0">
            <button
                class="border border-[#42b883] text-[#42b883] text-sm px-3 py-1 rounded cursor-pointer hover:bg-[#42b883] hover:text-zinc-900 transition-colors duration-150"
                @click.prevent="onEdit"
            >Edit</button>
            <button
                class="border border-red-500 text-red-500 text-sm px-3 py-1 rounded cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-150"
                @click.prevent="onDelete"
            >Delete</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '../types/global'
import { useRouter } from 'vue-router'

const $router = useRouter()
const props = defineProps<{
    item: TodoItem
}>()

const emit = defineEmits<{
    (e: 'delete', item: TodoItem): void
}>()

function onEdit(): void {
   void $router.push({name: 'itemDetail', params: { id: props.item.id }})
}

function onDelete(): void {
    emit('delete', props.item)
}


</script>