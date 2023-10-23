<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid/index.js";
import { useMainStore } from "../store/mainStore.js";
const mainStore = useMainStore();
</script>

<template>
  <div v-if="mainStore.dbConnected">
    <button
      @click.prevent="mainStore.isShowCardForm = true"
      class="flex w-full p-3 bg-white/10 hover:bg-white/20 rounded-md flex justify-center text-white items-center text-sm font-md"
    >
      <PlusIcon class="h-5 w-5" />
      <span class="ml-1 text-white font-bold text-sm">Add new card</span>
    </button>
  </div>
</template>
