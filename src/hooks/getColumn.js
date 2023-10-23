import { useMainStore } from "../store/mainStore.js";

export const getColumn = (columnName) => {
  const mainStore = useMainStore();
  return mainStore.columns.find((el) => el.name == columnName);
};
