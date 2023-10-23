<script setup>
import { ref } from "vue";
import { useMainStore } from "../store/mainStore.js";

const mainStore = useMainStore();

const title = ref("");
const rating = ref("");

const confirmCreateCard = () => {
  mainStore.addCard(title.value, rating.value);
  title.value = "";
  rating.value = "";
};
</script>

<template>
  <div class="modal-mask" v-if="mainStore.isShowCardForm === true">
    <div
      class="modal mt-4 flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <form action="" class="w-64 p-5 bg-gray-300 rounded-md">
        <input
          v-focus
          v-model.trim="title"
          type="text"
          placeholder="Enter card name"
          class="w-full text-sm rounded-md shadow-sm p-2 mb-2 focus:border-0 focus:outline-none border-gray-300"
        />
        <input
          v-model.trim.number="rating"
          type="number"
          placeholder="Enter rating"
          class="w-full text-sm rounded-md shadow-sm p-2 mb-2 focus:border-0 focus:outline-none border-gray-300"
        />

        <div class="flex justify-between mt-3">
          <button
            type="button"
            @click="confirmCreateCard()"
            class="shadow-sm bg-green-200 rounded-md px-4 py-2"
            :class="rating && title ? 'hover:bg-green-300' : ''"
            :disabled="!rating || !title"
          >
            Add card
          </button>
          <button
            type="button"
            @click="mainStore.isShowCardForm = false"
            class="shadow-sm bg-green-100 text-gray-700 rounded-md px-4 py-2 hover:bg-green-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
</style>
