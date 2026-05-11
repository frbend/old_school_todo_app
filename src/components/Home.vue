<template>
  <div class="max-w-2xl mx-auto mt-6 px-4 pb-10">
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 min-h-45 max-h-[60vh] overflow-y-auto">
      <div class="text-zinc-500 text-center py-12" v-if="!currentList.length">The list is empty</div>
      <template v-else v-for="item in currentList" :key="item.id">
        <Item :item="item" @delete="onDeleteItem" />
      </template>
    </div>
    <div class="flex mt-3 gap-2">
      <input
        class="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#42b883] focus:border-transparent transition-all"
        v-model="newItem"
        type="text"
        placeholder="New todo item..."
        @keyup.enter.prevent="onAddItem"
      />
      <button
        class="bg-[#42b883] text-zinc-900 font-semibold px-4 py-2 rounded-md cursor-pointer hover:brightness-90 transition-all"
        @click.prevent="onAddItem"
      >Add item</button>
    </div>
    <span v-if="errorMessage" class="text-red-400 text-sm mt-2 block">Item name cannot be empty</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Item from './Item.vue'
import { useSessionStorage } from '@vueuse/core'
import type { TodoItem } from '../types/global'


const newItem = ref('');
const currentList = useSessionStorage<TodoItem[]>('todo-list', []);
const errorMessage = ref<boolean>(false)

function onAddItem(): void{
  if(!newItem.value.trim()){
    errorMessage.value = true
    return
  }
  const item: TodoItem = {
    id: crypto.randomUUID(),
    name: newItem.value,
    completed: false,
    createdAt: new Date(),
    updatedAt: null
  }
  currentList.value.push(item)
  newItem.value = '';
  errorMessage.value = false
}

function onDeleteItem(item: TodoItem): void{
  currentList.value = currentList.value.filter( (itemInList) => itemInList.id !== item.id)
}
</script>