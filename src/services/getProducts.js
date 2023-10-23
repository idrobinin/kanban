import axios from "axios";
import { useMainStore } from "../store/mainStore.js";

export const GET_PRODUCTS = async () => {
  try {
    const mainStore = useMainStore();
    const response = await axios.get(
      "https://fakestoreapi.com/products?limit=4",
    );

    if (response.data) {
      const arr = response.data.map((el) => {
        return {
          ...el,
          rating: el.rating.rate,
          isCardChanging: false,
        };
      });

      mainStore.columns[0].cards = arr.slice(2);
      mainStore.columns[1].cards = [arr[0]];
      mainStore.columns[2].cards = [arr[1]];

      mainStore.dbConnected = true;
    }
  } catch (err) {
    if (err instanceof Error) throw err;
    else throw new Error(`${err}`);
  }
};
