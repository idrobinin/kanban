<script setup>
import { ref } from "vue";
import { useMainStore } from "../store/mainStore.js";

const mainStore = useMainStore();

const { card } = defineProps({
  card: Object,
});

const title = ref(card.title);
const rating = ref(card.rating);

const confirmChangeCard = () => {
  if (title.value && rating.value) {
    card.title = title.value;
    card.rating = rating.value;
    card.isCardChanging = false;
  }
};
</script>

<template>
  <div v-if="card.isCardChanging === true">
    <form action="" class="max-w-[400px] p-5 bg-gray-300 rounded-md">
      <input
        v-focus
        v-model.trim="title"
        type="text"
        placeholder="Enter card name"
        class="w-full text-sm rounded-md shadow-sm p-2 mb-2 focus:border-0 focus:outline-none border-gray-300"
      />
      <input
        v-model.trim="rating"
        type="number"
        placeholder="Enter rating"
        class="w-full text-sm rounded-md shadow-sm p-2 mb-2 focus:border-0 focus:outline-none border-gray-300"
      />

      <div class="flex justify-between mt-3">
        <button
          type="button"
          @click="confirmChangeCard"
          class="shadow-sm bg-green-200 rounded-md px-4 py-2"
          :class="card.rating && card.title ? 'hover:bg-green-300' : ''"
          :disabled="!card.rating || !card.title"
        >
          Save
        </button>
        <button
          @click="card.isCardChanging = false"
          type="button"
          class="shadow-sm bg-green-100 text-gray-700 rounded-md px-4 py-2 hover:bg-green-200"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
