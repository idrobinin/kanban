<script setup>
import { useMainStore } from "../store/mainStore.js";
import { BarsArrowUpIcon } from "@heroicons/vue/24/solid";
import CreateCardForm from "./CreateCardForm.vue";
import Card from "./Card.vue";
import AddCardButton from "./AddCardButton.vue";
import draggable from "vuedraggable";
import { vAutoAnimate } from "@formkit/auto-animate";
const mainStore = useMainStore();
</script>

<template>
  <div class="flex flex-col bg-blue-600 min-h-screen">
    <main class="flex-1">
      <CreateCardForm />
      <div class="w-[20%] mx-auto mt-[15px]">
        <AddCardButton />
      </div>
      <div class="flex flex-wrap px-4">
        <div
          v-for="column in mainStore.columns"
          :key="column.name"
          class="p-4 flex-1"
        >
          <div class="bg-gray-100 flex-col flex rounded-lg min-w-[200px]">
            <div class="flex items-center justify-between py-2 px-3">
              <h2 class="text-sm font-semibold text-gray-700">
                {{ column.name }} {{ column.cards.length }}
              </h2>
              <button
                class="hover:bg-gray-300 rounded-xl p-1"
                @click="mainStore.sortByRating(column.name)"
              >
                <BarsArrowUpIcon class="w-6 h-6" />
              </button>
            </div>
            <div class="pb-3 flex gap-2 flex-col">
              <div class="px-3 overflow-y-auto flex-1">
                <draggable
                  v-model="column.cards"
                  v-auto-animate
                  group="cards"
                  itemKey="name"
                >
                  <template #item="{ element }">
                    <Card :card="element" :card-list="column.name" />
                  </template>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
