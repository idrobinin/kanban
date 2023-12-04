import { defineStore } from "pinia";
import { onBeforeMount, ref } from "vue";
import { GET_PRODUCTS } from "../services/getProducts.js";
import { getColumn } from "../hooks/getColumn.js";
import { filterColumn } from "../hooks/filterColumn.js";

export const useMainStore = defineStore("mainStore", () => {
  const isShowCardForm = ref(false);
  const cardId = ref(100);

  const columns = ref([
    {
      name: "unprocessed",
      cards: [],
    },
    {
      name: "inProgress",
      cards: ref([]),
    },
    {
      name: "done",
      cards: ref([]),
    },
  ]);

  const addCard = (title, rating) => {
    if (title && rating) {
      const id = ++cardId.value;
      columns.value[0].cards.push({
        title,
        rating,
        id: id,
        isTask: true,
        isCardChanging: false,
      });
      isShowCardForm.value = false;
    }
  };

  const deleteCard = (columnName, card) => {
    const column = getColumn(columnName);
    column.cards = filterColumn(column, card.id);
  };

  const sortByRating = (columnName) => {
    const column = getColumn(columnName);
    column.cards.sort((a, b) => b.rating - a.rating);
  };

  const move = (columnName, card, direction) => {
    const columnIndex = columns.value.findIndex((el) => el.name === columnName);
    deleteCard(columnName, card);

    if (direction === "left" && columnIndex > 0) {
      columns.value[columnIndex - 1].cards.push(card);
    } else if (
      direction === "right" &&
      columnIndex < columns.value.length - 1
    ) {
      columns.value[columnIndex + 1].cards.push(card);
    }
  };

  onBeforeMount(() => {
    GET_PRODUCTS();
  });

  return {
    addCard,
    move,
    deleteCard,
    sortByRating,
    columns,
    isShowCardForm,
  };
});
