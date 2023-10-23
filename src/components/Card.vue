<script setup>
import {
  PencilIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/solid";
import { useMainStore } from "../store/mainStore.js";
import ChangeCardForm from "./ChangeCardForm.vue";

const mainStore = useMainStore();

const { card, cardList } = defineProps({
  card: Object,
  cardList: String,
});
</script>

<template>
  <div>
    <div
      v-if="card.isCardChanging === false"
      :class="{
        'bg-white': cardList === 'unprocessed',
        'bg-orange-300': cardList === 'inProgress',
        'bg-[#ffc7c7]': cardList === 'done',
      }"
      id="card"
      class="group min-h-[120px] relative p-5 shadow-amber-50 border-b border-gray-300 rounded-md hover:bg-white-50 mb-2"
    >
      <h3 class="max-w-[90%] font-bold">{{ card.title }}</h3>
      <div class="text-sm" v-if="card.image">
        <img class="w-14" :src="card.image" :alt="card.title" />
      </div>
      <div v-if="!card.isTask" class="text-sm">
        Category: {{ card.category }}
      </div>
      <div
        v-if="!card.isTask"
        class="text-sm max-h-5 overflow-ellipsis overflow-hidden"
      >
        {{ card.description }}
      </div>
      <div v-if="!card.isTask" class="text-sm">Price: {{ card.price }} USD</div>
      <div class="text-sm">Rating: {{ card.rating }}</div>
      <button
        @click="card.isCardChanging = true"
        v-if="card.isTask"
        class="hidden absolute top-1 right-1 w-8 h-8 text-gray-600 rounded-xl group-hover:grid place-content-center hover:text-black hover:bg-gray-200"
      >
        <PencilIcon class="w-5 h-5" />
      </button>
      <button
        :class="!card.isTask ? 'top-1' : 'top-10'"
        class="hidden absolute right-1 w-8 h-8 text-gray-600 rounded-xl group-hover:grid place-content-center hover:text-black hover:bg-gray-200"
        @click="mainStore.deleteCard(cardList, card)"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>
      <div
        class="flex justify-center absolute bottom-1 right-1 max-w-[80px] h-8 text-gray-600 rounded-xl"
      >
        <button
          @click="mainStore.move(cardList, card, 'left')"
          class="w-8 h-8 mr-2"
          :class="{
            hidden: cardList === 'unprocessed',
          }"
        >
          <ArrowLeftIcon
            class="hidden group-hover:grid place-content-center hover:text-black hover:bg-gray-200 rounded-lg p-2"
          />
        </button>

        <button
          class="w-8 h-8 ml-2"
          :class="{
            hidden: cardList === 'done',
          }"
        >
          <ArrowRightIcon
            @click="mainStore.move(cardList, card, 'right')"
            class="hidden group-hover:grid place-content-center hover:text-black hover:bg-gray-200 rounded-lg p-2"
          />
        </button>
      </div>
    </div>
    <ChangeCardForm v-if="card.isCardChanging === true" :card="card" />
  </div>
</template>
