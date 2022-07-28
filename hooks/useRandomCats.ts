import { useCallback, useEffect, useState } from "react";
import { Cat } from "services/cats/cats.types";
import { getRandomCat } from "services/cats/getRandomCat";

/**
 * @hook useRandomCats
 *
 * This is a hook to get and refresh random cats
 */
export const useRandomCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  /** Get a list of 5 random cats and replace the current state */
  const getRandomCats = useCallback(async () => {
    const randomCats = await Promise.all(
      Array.from({ length: 5 }, getRandomCat)
    );
    setCats(randomCats);
  }, []);

  // Run getRandomCats function on mount
  useEffect(() => {
    getRandomCats();
  }, [getRandomCats]);

  /** Refresh an individual cat by its ID */
  const replaceCat = useCallback(
    async (id: string) => {
      const targetCatIndex = cats.findIndex((cat) => cat.id === id);
      const randomCat = await getRandomCat();

      setCats((curr) => {
        const replacedCats = [...curr];
        replacedCats[targetCatIndex] = randomCat;

        return replacedCats;
      });
    },
    [cats, setCats]
  );

  return {
    cats,
    getRandomCats,
    replaceCat,
  };
};
