import axios from "axios";
import { Cat } from "./cats.types";

/**
 * @function getRandomCat
 *
 * Gets a random cat image and returns a json object for it
 *
 * @returns Promise<Cat>
 */
export const getRandomCat = async (): Promise<Cat> => {
  const { data } = await axios.get("https://cataas.com/cat?json=true");
  return {
    ...data,
    full_url: `https://cataas.com${data.url}`,
  };
};
